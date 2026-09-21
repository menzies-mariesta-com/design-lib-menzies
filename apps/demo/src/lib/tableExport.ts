/**
 * Zero-dependency table export helpers for the data table template.
 * Generates CSV, Excel SpreadsheetML (.xls), and minimal ODS downloads.
 */

export type TableExportColumn = {
  key: string
  header: string
}

export type TableExportRow = Record<string, string | number>

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeCsvCell(value: string | number): string {
  const text = String(value)
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`
  }
  return text
}

export function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function rowsToCsv(
  columns: TableExportColumn[],
  rows: TableExportRow[],
): string {
  const header = columns.map((c) => escapeCsvCell(c.header)).join(',')
  const body = rows.map((row) =>
    columns.map((c) => escapeCsvCell(row[c.key] ?? '')).join(','),
  )
  return `\uFEFF${[header, ...body].join('\r\n')}`
}

export function rowsToExcelXml(
  columns: TableExportColumn[],
  rows: TableExportRow[],
  sheetName = 'Sheet1',
): string {
  const headerCells = columns
    .map(
      (c) =>
        `<Cell><Data ss:Type="String">${escapeXml(c.header)}</Data></Cell>`,
    )
    .join('')
  const dataRows = rows
    .map((row) => {
      const cells = columns
        .map((c) => {
          const raw = row[c.key] ?? ''
          if (typeof raw === 'number' && Number.isFinite(raw)) {
            return `<Cell><Data ss:Type="Number">${raw}</Data></Cell>`
          }
          return `<Cell><Data ss:Type="String">${escapeXml(String(raw))}</Data></Cell>`
        })
        .join('')
      return `<Row>${cells}</Row>`
    })
    .join('')

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="${escapeXml(sheetName)}">
  <Table>
   <Row>${headerCells}</Row>
   ${dataRows}
  </Table>
 </Worksheet>
</Workbook>`
}

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i]!
    for (let j = 0; j < 8; j++) {
      const mask = -(crc & 1)
      crc = (crc >>> 1) ^ (0xedb88320 & mask)
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

function u16(n: number): Uint8Array {
  const b = new Uint8Array(2)
  new DataView(b.buffer).setUint16(0, n, true)
  return b
}

function u32(n: number): Uint8Array {
  const b = new Uint8Array(4)
  new DataView(b.buffer).setUint32(0, n, true)
  return b
}

function concatBytes(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, p) => sum + p.length, 0)
  const out = new Uint8Array(total)
  let offset = 0
  for (const part of parts) {
    out.set(part, offset)
    offset += part.length
  }
  return out
}

/** Store-only ZIP (method 0). ODS requires uncompressed `mimetype` first. */
function zipStore(files: { name: string; data: Uint8Array }[]): Uint8Array {
  const encoder = new TextEncoder()
  const localParts: Uint8Array[] = []
  const centralParts: Uint8Array[] = []
  let offset = 0

  for (const file of files) {
    const nameBytes = encoder.encode(file.name)
    const crc = crc32(file.data)
    const localHeader = concatBytes([
      u32(0x04034b50),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(file.data.length),
      u32(file.data.length),
      u16(nameBytes.length),
      u16(0),
      nameBytes,
    ])
    localParts.push(localHeader, file.data)

    const centralHeader = concatBytes([
      u32(0x02014b50),
      u16(20),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(file.data.length),
      u32(file.data.length),
      u16(nameBytes.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      nameBytes,
    ])
    centralParts.push(centralHeader)
    offset += localHeader.length + file.data.length
  }

  const central = concatBytes(centralParts)
  const end = concatBytes([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(files.length),
    u16(files.length),
    u32(central.length),
    u32(offset),
    u16(0),
  ])

  return concatBytes([...localParts, central, end])
}

export function rowsToOds(
  columns: TableExportColumn[],
  rows: TableExportRow[],
): Uint8Array {
  const headerCells = columns
    .map(
      (c) =>
        `<table:table-cell office:value-type="string"><text:p>${escapeXml(c.header)}</text:p></table:table-cell>`,
    )
    .join('')

  const dataRows = rows
    .map((row) => {
      const cells = columns
        .map((c) => {
          const raw = row[c.key] ?? ''
          if (typeof raw === 'number' && Number.isFinite(raw)) {
            return `<table:table-cell office:value-type="float" office:value="${raw}"><text:p>${raw}</text:p></table:table-cell>`
          }
          return `<table:table-cell office:value-type="string"><text:p>${escapeXml(String(raw))}</text:p></table:table-cell>`
        })
        .join('')
      return `<table:table-row>${cells}</table:table-row>`
    })
    .join('')

  const contentXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content
 xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
 xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
 xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
 office:version="1.2">
 <office:body>
  <office:spreadsheet>
   <table:table table:name="Sheet1">
    <table:table-row>${headerCells}</table:table-row>
    ${dataRows}
   </table:table>
  </office:spreadsheet>
 </office:body>
</office:document-content>`

  const manifestXml = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
 <manifest:file-entry manifest:full-path="/" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
 <manifest:file-entry manifest:full-path="content.xml" manifest:media-type="text/xml"/>
</manifest:manifest>`

  const encoder = new TextEncoder()
  return zipStore([
    { name: 'mimetype', data: encoder.encode('application/vnd.oasis.opendocument.spreadsheet') },
    { name: 'content.xml', data: encoder.encode(contentXml) },
    { name: 'META-INF/manifest.xml', data: encoder.encode(manifestXml) },
  ])
}

export type TableExportFormat = 'excel' | 'csv' | 'ods'

export function exportTable(
  format: TableExportFormat,
  columns: TableExportColumn[],
  rows: TableExportRow[],
  basename: string,
): void {
  if (format === 'csv') {
    downloadBlob(
      `${basename}.csv`,
      new Blob([rowsToCsv(columns, rows)], {
        type: 'text/csv;charset=utf-8',
      }),
    )
    return
  }
  if (format === 'excel') {
    downloadBlob(
      `${basename}.xls`,
      new Blob([rowsToExcelXml(columns, rows)], {
        type: 'application/vnd.ms-excel',
      }),
    )
    return
  }
  const odsBytes = rowsToOds(columns, rows)
  const odsCopy = new Uint8Array(odsBytes.byteLength)
  odsCopy.set(odsBytes)
  downloadBlob(
    `${basename}.ods`,
    new Blob([odsCopy], {
      type: 'application/vnd.oasis.opendocument.spreadsheet',
    }),
  )
}
