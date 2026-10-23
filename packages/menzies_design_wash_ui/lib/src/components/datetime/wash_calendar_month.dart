import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../foundation/wash_icon.dart';
import '../../painting/wash_decorations.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import 'wash_date_time_inputs.dart';
import 'wash_date_time_util.dart';
import 'wash_time_clock_dial.dart';

int _daysInMonth(int year, int month) => DateTime(year, month + 1, 0).day;

enum WashCalendarMonthMode { single, range }

/// Month grid calendar (single or range), optional embedded time.
class WashCalendarMonth extends StatefulWidget {
  const WashCalendarMonth({
    this.mode = WashCalendarMonthMode.single,
    this.value = '',
    this.onChanged,
    this.includeTime = false,
    this.bordered = true,
    super.key,
  });

  final WashCalendarMonthMode mode;
  final String value;
  final ValueChanged<String>? onChanged;
  final bool includeTime;
  final bool bordered;

  @override
  State<WashCalendarMonth> createState() => _WashCalendarMonthState();
}

class _WashCalendarMonthState extends State<WashCalendarMonth> {
  late DateTime _view;
  String? _rangeStart;

  @override
  void initState() {
    super.initState();
    _view = _parseMonth(widget.value) ?? DateTime(2026, 3, 1);
    _rangeStart = widget.mode == WashCalendarMonthMode.range
        ? washParseDateRange(widget.value).start
        : null;
  }

  DateTime? _parseMonth(String v) {
    final iso = v.contains('T') ? v.split('T').first : v.split('/').first;
    final p = iso.split('-');
    if (p.length != 3) return null;
    final y = int.tryParse(p[0]);
    final m = int.tryParse(p[1]);
    if (y == null || m == null) return null;
    return DateTime(y, m, 1);
  }

  void _emit(String next) => widget.onChanged?.call(next);

  void _selectDay(int day) {
    final iso = washToIsoDate(DateTime(_view.year, _view.month, day));
    if (widget.mode == WashCalendarMonthMode.single) {
      if (widget.includeTime) {
        final time = widget.value.contains('T')
            ? widget.value.split('T')[1]
            : '09:00:00';
        _emit('${iso}T${washNormalizeTime(time)}');
      } else {
        _emit(iso);
      }
      return;
    }
    if (_rangeStart == null ||
        _rangeStart!.isNotEmpty &&
            washParseDateRange(widget.value).end.isNotEmpty) {
      _rangeStart = iso;
      _emit('$iso/');
      return;
    }
    final start = _rangeStart!;
    final end = iso;
    if (start.compareTo(end) <= 0) {
      _emit('$start/$end');
    } else {
      _emit('$end/$start');
    }
    _rangeStart = null;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final daysInMonth = _daysInMonth(_view.year, _view.month);
    final firstWeekday = DateTime(_view.year, _view.month, 1).weekday % 7;
    final selectedIso = widget.mode == WashCalendarMonthMode.single
        ? (widget.value.contains('T')
            ? widget.value.split('T').first
            : widget.value)
        : '';
    final range = widget.mode == WashCalendarMonthMode.range
        ? washParseDateRange(widget.value)
        : null;

    final Widget grid = Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        LayoutBuilder(
          builder: (context, constraints) {
            final compact = constraints.maxWidth < 300;
            void previous() => setState(
                () => _view = DateTime(_view.year, _view.month - 1, 1));
            void next() => setState(
                () => _view = DateTime(_view.year, _view.month + 1, 1));
            return Row(
              children: [
                if (compact)
                  WashButton(
                    size: WashButtonSize.xs,
                    variant: WashButtonVariant.ghost,
                    square: true,
                    onPressed: previous,
                    child: const WashIcon(WashIconGlyph.chevronLeft, size: 16),
                  )
                else
                  WashButton(
                    size: WashButtonSize.sm,
                    variant: WashButtonVariant.ghost,
                    label: 'Prev',
                    onPressed: previous,
                  ),
                Expanded(
                  child: Text(
                    '${_monthName(_view.month)} ${_view.year}',
                    textAlign: TextAlign.center,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: WashTypography.label(tokens.onSurface),
                  ),
                ),
                if (compact)
                  WashButton(
                    size: WashButtonSize.xs,
                    variant: WashButtonVariant.ghost,
                    square: true,
                    onPressed: next,
                    child: const WashIcon(WashIconGlyph.chevronRight, size: 16),
                  )
                else
                  WashButton(
                    size: WashButtonSize.sm,
                    variant: WashButtonVariant.ghost,
                    label: 'Next',
                    onPressed: next,
                  ),
              ],
            );
          },
        ),
        const SizedBox(height: 8),
        Row(
          children: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
              .map(
                (w) => Expanded(
                  child: Text(w,
                      textAlign: TextAlign.center,
                      style: WashTypography.label(tokens.inkMuted)),
                ),
              )
              .toList(),
        ),
        const SizedBox(height: 4),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 7,
            mainAxisSpacing: 4,
            crossAxisSpacing: 4,
          ),
          itemCount: firstWeekday + daysInMonth,
          itemBuilder: (context, index) {
            if (index < firstWeekday) return const SizedBox.shrink();
            final day = index - firstWeekday + 1;
            final iso = washToIsoDate(DateTime(_view.year, _view.month, day));
            var selected = iso == selectedIso;
            var inRange = false;
            if (range != null &&
                range.start.isNotEmpty &&
                range.end.isNotEmpty) {
              inRange = iso.compareTo(range.start) >= 0 &&
                  iso.compareTo(range.end) <= 0;
              selected = iso == range.start || iso == range.end;
            }
            return GestureDetector(
              onTap: () => setState(() => _selectDay(day)),
              child: Container(
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: selected
                      ? tokens.primary
                      : inRange
                          ? tokens.primary.withValues(alpha: 0.15)
                          : null,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                      color: tokens.inkBorder.withValues(alpha: 0.4)),
                ),
                child: Text(
                  '$day',
                  style: WashTypography.body(
                      selected ? tokens.onPrimary : tokens.onSurface),
                ),
              ),
            );
          },
        ),
        if (widget.includeTime) ...[
          const SizedBox(height: 12),
          Text('Time', style: WashTypography.label(tokens.inkMuted)),
          const SizedBox(height: 8),
          WashTimeClockDial(
            value: widget.value.contains('T')
                ? widget.value.split('T')[1]
                : '09:00:00',
            onChanged: (t) {
              final date = widget.value.contains('T')
                  ? widget.value.split('T').first
                  : washTodayIso();
              _emit('${date}T$t');
            },
            size: WashTimeClockDialSize.sm,
            ariaLabel: 'Calendar time',
          ),
        ],
      ],
    );

    if (!widget.bordered) return grid;
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: washInkBorderBox(tokens, radius: 12),
      child: grid,
    );
  }

  String _monthName(int m) {
    const names = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return names[(m - 1).clamp(0, 11)];
  }
}

/// Calendar inside a dropdown trigger (`details.dropdown + CalendarMonth`).
class WashCalendarDropdown extends StatefulWidget {
  const WashCalendarDropdown({
    required this.value,
    required this.onChanged,
    this.includeTime = false,
    this.placeholder = 'Pick a date',
    super.key,
  });

  final String value;
  final ValueChanged<String> onChanged;
  final bool includeTime;
  final String placeholder;

  @override
  State<WashCalendarDropdown> createState() => _WashCalendarDropdownState();
}

class _WashCalendarDropdownState extends State<WashCalendarDropdown> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final label = widget.value.isEmpty
        ? widget.placeholder
        : widget.includeTime
            ? washFormatDateTimeLocal(widget.value)
            : washFormatDisplayDate(
                widget.value.contains('T')
                    ? widget.value.split('T').first
                    : widget.value,
              );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        GestureDetector(
          onTap: () => setState(() => _open = !_open),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: washInkBorderBox(tokens),
            child: Row(
              children: [
                Expanded(
                    child: Text(label,
                        style: WashTypography.body(tokens.onSurface))),
                Text('Open', style: WashTypography.label(tokens.inkMuted)),
              ],
            ),
          ),
        ),
        if (_open) ...[
          const SizedBox(height: 8),
          WashCalendarMonth(
            mode: WashCalendarMonthMode.single,
            value: widget.value,
            includeTime: widget.includeTime,
            bordered: false,
            onChanged: (v) {
              widget.onChanged(v);
              if (!widget.includeTime) setState(() => _open = false);
            },
          ),
        ],
      ],
    );
  }
}

/// Legacy preview shell: time dial + date input row.
class WashDateTimeFields extends StatelessWidget {
  const WashDateTimeFields({super.key});

  @override
  Widget build(BuildContext context) {
    return const _DateTimeFieldsPreview();
  }
}

class _DateTimeFieldsPreview extends StatefulWidget {
  const _DateTimeFieldsPreview();

  @override
  State<_DateTimeFieldsPreview> createState() => _DateTimeFieldsPreviewState();
}

class _DateTimeFieldsPreviewState extends State<_DateTimeFieldsPreview> {
  String _date = washTodayIso(DateTime(2026, 9, 23));
  String _time = '09:30:00';

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashDateInput(
            value: _date,
            onChanged: (v) => setState(() => _date = v),
            ariaLabel: 'Date'),
        const SizedBox(height: 8),
        WashTimeClockDial(
            value: _time,
            onChanged: (v) => setState(() => _time = v),
            ariaLabel: 'Time'),
      ],
    );
  }
}
