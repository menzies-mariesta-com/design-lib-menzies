/// Shared ISO date/time helpers (mirrors web demo `dates.ts` / `DateTimeFieldsPage`).
String washTodayIso([DateTime? from]) {
  final d = from ?? DateTime.now();
  return washToIsoDate(d);
}

String washToIsoDate(DateTime d) {
  final y = d.year;
  final m = d.month.toString().padLeft(2, '0');
  final day = d.day.toString().padLeft(2, '0');
  return '$y-$m-$day';
}

String washShiftIsoDate(String iso, int days) {
  final parts = iso.split('-');
  if (parts.length != 3) return iso;
  final y = int.tryParse(parts[0]);
  final m = int.tryParse(parts[1]);
  final d = int.tryParse(parts[2]);
  if (y == null || m == null || d == null) return iso;
  final date = DateTime(y, m, d).add(Duration(days: days));
  return washToIsoDate(date);
}

String washFormatDisplayDate(String iso) {
  if (iso.isEmpty) return 'None';
  final parts = iso.split('-');
  if (parts.length != 3) return iso;
  final y = int.tryParse(parts[0]);
  final m = int.tryParse(parts[1]);
  final d = int.tryParse(parts[2]);
  if (y == null || m == null || d == null) return iso;
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  final month = months[(m - 1).clamp(0, 11)];
  return '$month $d, $y';
}

String washNormalizeTime(String? raw, {String fallback = '09:00:00'}) {
  if (raw == null || raw.isEmpty) return fallback;
  final parts = raw.split(':');
  if (parts.isEmpty) return fallback;
  final h = (int.tryParse(parts[0]) ?? 0).clamp(0, 23);
  final m = parts.length > 1 ? (int.tryParse(parts[1]) ?? 0).clamp(0, 59) : 0;
  final s = parts.length > 2 ? (int.tryParse(parts[2]) ?? 0).clamp(0, 59) : 0;
  return '${h.toString().padLeft(2, '0')}:${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
}

String washFormatTime12(String hhmmss) {
  if (hhmmss.isEmpty) return '(none)';
  final parts = hhmmss.split(':');
  final h = int.tryParse(parts[0]) ?? 0;
  final m = int.tryParse(parts.length > 1 ? parts[1] : '0') ?? 0;
  final sec = parts.length > 2 ? int.tryParse(parts[2]) : null;
  final period = h >= 12 ? 'PM' : 'AM';
  final hour12 = h % 12 == 0 ? 12 : h % 12;
  final base = '$hour12:${m.toString().padLeft(2, '0')}';
  if (sec != null) {
    return '$base:${sec.toString().padLeft(2, '0')} $period';
  }
  return '$base $period';
}

String washFormatDateTimeLocal(String value) {
  if (value.isEmpty) return '(none)';
  final split = value.split('T');
  if (split.length != 2) return value;
  return '${washFormatDisplayDate(split[0])} · ${washFormatTime12(split[1].length >= 5 ? split[1].substring(0, 5) : split[1])}';
}

({String start, String end}) washParseDateRange(String value) {
  final parts = value.split('/');
  return (start: parts.isNotEmpty ? parts[0] : '', end: parts.length > 1 ? parts[1] : '');
}

int washCompareTime(String a, String b) {
  if (a.isEmpty || b.isEmpty) return 0;
  return a.compareTo(b);
}
