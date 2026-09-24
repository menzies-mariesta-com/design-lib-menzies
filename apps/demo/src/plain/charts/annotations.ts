import type { ApexAnnotations } from 'apexcharts'
import { readWashChartTokens } from './theme'
import type { WashAnnotation, WashAnnotationTone } from './types'

function resolveToneColor(
  tone: WashAnnotationTone | undefined,
  tokens: ReturnType<typeof readWashChartTokens>,
): string {
  const palette: Record<WashAnnotationTone, string> = {
    primary: tokens.primary,
    secondary: tokens.secondary,
    warning: tokens.warning,
    success: tokens.success,
    error: tokens.error,
    info: tokens.info,
  }

  const key = tone ?? 'primary'
  return palette[key] || tokens.primary || '#276c8e'
}

function buildAnnotationLabel(
  text: string,
  color: string,
  tokens: ReturnType<typeof readWashChartTokens>,
  position: 'top' | 'bottom' | 'left' | 'right' = 'top',
) {
  return {
    text,
    borderColor: color,
    borderWidth: 0,
    borderRadius: 4,
    position,
    orientation: 'horizontal' as const,
    style: {
      background: color,
      color: tokens.base100 || '#ffffff',
      fontFamily: tokens.fontSans || 'inherit',
      fontWeight: 600,
      fontSize: '11px',
      padding: {
        left: 8,
        right: 8,
        top: 4,
        bottom: 4,
      },
    },
  }
}

/** Convert typed Wash annotations into ApexCharts annotation options with pigment colors. */
export function buildWashAnnotations(annotations: WashAnnotation[] = []): ApexAnnotations {
  const tokens = readWashChartTokens()
  const apex: ApexAnnotations = {
    xaxis: [],
    yaxis: [],
    points: [],
    texts: [],
  }

  for (const annotation of annotations) {
    const color = resolveToneColor(annotation.tone, tokens)

    switch (annotation.type) {
      case 'x':
        apex.xaxis!.push({
          x: annotation.value,
          borderColor: color,
          borderWidth: 2,
          strokeDashArray: annotation.strokeDashArray ?? 4,
          opacity: 0.9,
          label: annotation.label
            ? buildAnnotationLabel(annotation.label, color, tokens, annotation.labelPosition ?? 'top')
            : undefined,
        })
        break

      case 'y':
        apex.yaxis!.push({
          y: annotation.value,
          borderColor: color,
          borderWidth: 2,
          strokeDashArray: annotation.strokeDashArray ?? 6,
          opacity: 0.9,
          label: annotation.label
            ? buildAnnotationLabel(annotation.label, color, tokens, annotation.labelPosition ?? 'right')
            : undefined,
        })
        break

      case 'point':
        apex.points!.push({
          x: annotation.x,
          y: annotation.y,
          seriesIndex: annotation.seriesIndex,
          marker: {
            size: annotation.markerSize ?? 6,
            fillColor: color,
            strokeColor: tokens.base100 || '#ffffff',
            strokeWidth: 2,
          },
          label: annotation.label
            ? buildAnnotationLabel(annotation.label, color, tokens, annotation.labelPosition ?? 'top')
            : undefined,
        })
        break

      case 'text':
        apex.texts!.push({
          x: annotation.x,
          y: annotation.y,
          text: annotation.text,
          foreColor: color,
          fontFamily: tokens.fontSans || 'inherit',
          fontWeight: 600,
          fontSize: annotation.fontSize ?? '12px',
          backgroundColor: tokens.base200 || 'transparent',
          borderColor: tokens.inkBorder || color,
          borderWidth: 1,
          borderRadius: 4,
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 4,
          paddingBottom: 4,
        })
        break
    }
  }

  return apex
}
