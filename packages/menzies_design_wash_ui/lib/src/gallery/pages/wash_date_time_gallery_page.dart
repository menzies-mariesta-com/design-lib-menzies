import 'package:flutter/widgets.dart';

import '../../components/button/wash_button.dart';
import '../../components/datetime/wash_calendar_month.dart';
import '../../components/datetime/wash_date_time_inputs.dart';
import '../../components/datetime/wash_date_time_util.dart';
import '../../components/datetime/wash_time_clock_dial.dart';
import '../../components/layout/wash_aspect_ratio.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashDateTimeGalleryPage extends StatefulWidget {
  const WashDateTimeGalleryPage({super.key});

  @override
  State<WashDateTimeGalleryPage> createState() =>
      _WashDateTimeGalleryPageState();
}

class _WashDateTimeGalleryPageState extends State<WashDateTimeGalleryPage> {
  static final _pasteToday = washTodayIso(DateTime(2026, 9, 23));

  String _timeValue = '09:30:00';
  String _timeColorDemo = '14:00:00';
  String _timeSizeDemo = '11:15:00';
  String _nativeDate = _pasteToday;
  String _washDate = _pasteToday;
  String _datetimeLocal = '${_pasteToday}T10:00';
  String _composedDate = _pasteToday;
  String _composedTime = '10:00:00';
  String _sessionStart = '09:00:00';
  String _sessionEnd = '12:00:00';
  String _dateRange = '$_pasteToday/${washShiftIsoDate(_pasteToday, 4)}';
  String _rangeStartDate = _pasteToday;
  String _rangeStartTime = '09:00:00';
  String _rangeEndDate = _pasteToday;
  String _rangeEndTime = '17:00:00';
  String _dryStartDate = _pasteToday;
  String _dryStartTime = '10:00:00';
  String _dryEndDate = washShiftIsoDate(_pasteToday, 1);
  String _dryEndTime = '14:00:00';
  String _critiqueValue = '${washShiftIsoDate(_pasteToday, 2)}T15:30:00';
  String _requiredDate = '';
  String _requiredTime = '';
  bool _requiredTouched = false;

  @override
  Widget build(BuildContext context) {
    return WashGalleryPage(
      title: 'Date and time',
      description:
          'Native TimeClockDial (analog clock) beside CalendarMonth date and range pickers.',
      sections: [
        _s(
            '01 · Time',
            'Time field',
            'TimeClockDial analog clock (hour, minute, second). Same control used by CalendarMonth includeTime.',
            _timeSection(),
            _timeDart),
        _s(
            '02 · Date',
            'Date field',
            'Native date input and a CalendarMonth dropdown picker',
            _dateSection(),
            _dateDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '03 · Date time',
            'Date time field',
            'Native datetime-local plus a composed date and time pair',
            _dateTimeSection(),
            _dateTimeDart),
        _s(
            '04 · Time range',
            'Time range',
            'Inclusive studio session hours with start and end time inputs',
            _timeRangeSection(),
            _timeRangeDart,
            tint: WashGalleryPanelTint.rose),
        _s(
            '05 · Date range',
            'Date range',
            'CalendarMonth range mode with YYYY-MM-DD/YYYY-MM-DD value',
            _dateRangeSection(),
            _dateRangeDart),
        _s(
            '06 · Date time range',
            'Date time range',
            'Composed start and end date+time controls with a live summary',
            _dateTimeRangeSection(),
            _dateTimeRangeDart),
        _s(
            '07 · Studio',
            'Wash dry window and critique',
            'Book a drying window, then schedule a critique with CalendarMonth includeTime',
            _studioSection(),
            _studioDart,
            tint: WashGalleryPanelTint.ochre),
        _s(
            '08 · States',
            'Required and disabled',
            'Required fields show an error-colored asterisk',
            _statesSection(),
            _statesDart,
            tint: WashGalleryPanelTint.rose),
        _s('09 · Responsive', 'Narrow layout', 'Fields stack on small screens',
            _responsiveSection(), _responsiveDart),
      ],
    );
  }

  WashGallerySection _s(
    String eyebrow,
    String title,
    String desc,
    Widget preview,
    String dart, {
    WashGalleryPanelTint tint = WashGalleryPanelTint.none,
  }) {
    return WashGallerySection(
      eyebrow: eyebrow,
      title: title,
      description: desc,
      tint: tint,
      child: WashShowcaseTabs(preview: preview, dartSource: dart),
    );
  }

  Widget _timeSection() {
    return LayoutBuilder(
      builder: (context, c) {
        final wide = c.maxWidth >= WashTailwindBreakpoints.lg;
        final session = WashDateTimeFieldset(
          legend: 'Session start',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              WashTimeClockDial(
                value: _timeValue,
                onChanged: (v) => setState(() => _timeValue = v),
                ariaLabel: 'Session start time',
              ),
              const SizedBox(height: 8),
              Text('Analog dial · HH:mm:ss',
                  style: WashTypography.label(WashTokens.of(context).inkMuted)),
              const WashDateTimeClassLabel('TimeClockDial'),
              WashDateTimeLiveValue(value: washFormatTime12(_timeValue)),
            ],
          ),
        );
        final sizes = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Sizes',
                style: WashTypography.label(WashTokens.of(context).inkMuted)),
            const SizedBox(height: 12),
            Row(
              children: [
                const SizedBox(width: 32, child: Text('SM')),
                Expanded(
                  child: WashTimeClockDial(
                    size: WashTimeClockDialSize.sm,
                    value: _timeSizeDemo,
                    onChanged: (v) => setState(() => _timeSizeDemo = v),
                    ariaLabel: 'Time SM',
                  ),
                ),
              ],
            ),
            const WashDateTimeClassLabel('TimeClockDial size="sm"'),
            const SizedBox(height: 8),
            Row(
              children: [
                const SizedBox(width: 32, child: Text('MD')),
                Expanded(
                  child: WashTimeClockDial(
                    value: _timeSizeDemo,
                    onChanged: (v) => setState(() => _timeSizeDemo = v),
                    ariaLabel: 'Time MD',
                  ),
                ),
              ],
            ),
            const WashDateTimeClassLabel('TimeClockDial size="md"'),
          ],
        );
        if (wide) {
          return Column(
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: session),
                  const SizedBox(width: 24),
                  Expanded(child: sizes),
                ],
              ),
              const SizedBox(height: 24),
              _triggerColors(),
            ],
          );
        }
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            session,
            const SizedBox(height: 24),
            sizes,
            const SizedBox(height: 24),
            _triggerColors()
          ],
        );
      },
    );
  }

  Widget _triggerColors() {
    final t = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Trigger colors', style: WashTypography.label(t.inkMuted)),
        const SizedBox(height: 12),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            WashTimeClockDial(
                value: _timeColorDemo,
                onChanged: (v) => setState(() => _timeColorDemo = v),
                ariaLabel: 'Time default'),
            WashTimeClockDial(
              value: _timeColorDemo,
              onChanged: (v) => setState(() => _timeColorDemo = v),
              triggerPrimary: true,
              ariaLabel: 'Time primary',
            ),
            WashTimeClockDial(
              value: _timeColorDemo,
              onChanged: (v) => setState(() => _timeColorDemo = v),
              triggerSecondary: true,
              ariaLabel: 'Time secondary',
            ),
            WashTimeClockDial(
              value: _timeColorDemo,
              onChanged: (v) => setState(() => _timeColorDemo = v),
              triggerAccent: true,
              ariaLabel: 'Time accent',
            ),
          ],
        ),
        WashDateTimeLiveValue(
            label: 'Shared color demo',
            value: washFormatTime12(_timeColorDemo)),
      ],
    );
  }

  Widget _dateSection() {
    return LayoutBuilder(
      builder: (context, c) {
        final wide = c.maxWidth >= WashTailwindBreakpoints.lg;
        final native = WashDateTimeFieldset(
          legend: 'Native date',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              WashDateInput(
                  value: _nativeDate,
                  onChanged: (v) => setState(() => _nativeDate = v),
                  ariaLabel: 'Native date'),
              const WashDateTimeClassLabel('input type="date"'),
              WashDateTimeLiveValue(value: washFormatDisplayDate(_nativeDate)),
            ],
          ),
        );
        final wash = WashDateTimeFieldset(
          legend: 'Wash calendar dropdown',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              WashCalendarDropdown(
                value: _washDate,
                onChanged: (v) => setState(() => _washDate = v),
              ),
              const WashDateTimeClassLabel('details.dropdown + CalendarMonth'),
              WashDateTimeLiveValue(value: washFormatDisplayDate(_washDate)),
            ],
          ),
        );
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: native),
              const SizedBox(width: 24),
              Expanded(child: wash)
            ],
          );
        }
        return Column(children: [native, const SizedBox(height: 24), wash]);
      },
    );
  }

  Widget _dateTimeSection() {
    return LayoutBuilder(
      builder: (context, c) {
        final wide = c.maxWidth >= WashTailwindBreakpoints.lg;
        final native = WashDateTimeFieldset(
          legend: 'Native datetime-local',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              WashDateTimeLocalInput(
                value: _datetimeLocal,
                onChanged: (v) => setState(() => _datetimeLocal = v),
                ariaLabel: 'Date and time',
              ),
              const WashDateTimeClassLabel('input type="datetime-local"'),
              WashDateTimeLiveValue(
                  value: washFormatDateTimeLocal(_datetimeLocal)),
            ],
          ),
        );
        final composed = WashDateTimeFieldset(
          legend: 'Composed date + time',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              WashDateInput(
                  value: _composedDate,
                  onChanged: (v) => setState(() => _composedDate = v),
                  ariaLabel: 'Composed date'),
              const SizedBox(height: 8),
              WashTimeClockDial(
                value: _composedTime,
                onChanged: (v) => setState(() => _composedTime = v),
                ariaLabel: 'Composed time',
              ),
              const WashDateTimeClassLabel('type=date + TimeClockDial'),
              WashDateTimeLiveValue(
                value: _composedDate.isNotEmpty && _composedTime.isNotEmpty
                    ? '${washFormatDisplayDate(_composedDate)} · ${washFormatTime12(_composedTime)}'
                    : '',
              ),
            ],
          ),
        );
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: native),
              const SizedBox(width: 24),
              Expanded(child: composed)
            ],
          );
        }
        return Column(children: [native, const SizedBox(height: 24), composed]);
      },
    );
  }

  Widget _timeRangeSection() {
    final ok = washCompareTime(_sessionStart, _sessionEnd) <= 0;
    return WashDateTimeFieldset(
      legend: 'Studio session hours',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          WashTimeClockDial(
              value: _sessionStart,
              onChanged: (v) => setState(() => _sessionStart = v),
              ariaLabel: 'Session start'),
          const SizedBox(height: 8),
          WashTimeClockDial(
              value: _sessionEnd,
              onChanged: (v) => setState(() => _sessionEnd = v),
              ariaLabel: 'Session end'),
          Text(
            ok
                ? 'Inclusive window for open studio'
                : 'End should be at or after start.',
            style: WashTypography.label(
                ok ? WashTokens.of(context).inkMuted : const Color(0xFFEF4444)),
          ),
          const WashDateTimeClassLabel('TimeClockDial + TimeClockDial'),
          WashDateTimeLiveValue(
            value: _sessionStart.isNotEmpty && _sessionEnd.isNotEmpty
                ? '${washFormatTime12(_sessionStart)} to ${washFormatTime12(_sessionEnd)}'
                : '',
          ),
        ],
      ),
    );
  }

  Widget _dateRangeSection() {
    final range = washParseDateRange(_dateRange);
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: WashCalendarMonth(
            mode: WashCalendarMonthMode.range,
            value: _dateRange,
            onChanged: (v) => setState(() => _dateRange = v),
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Selected range',
                  style: WashTypography.label(WashTokens.of(context).inkMuted)),
              Text(
                  'Start: ${range.start.isEmpty ? "(none)" : washFormatDisplayDate(range.start)}'),
              Text(
                  'End: ${range.end.isEmpty ? "(none)" : washFormatDisplayDate(range.end)}'),
              WashDateTimeLiveValue(label: 'Raw', value: _dateRange),
              const WashDateTimeClassLabel('CalendarMonth mode="range"'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _dateTimeRangeSection() {
    final summary =
        '${washFormatDisplayDate(_rangeStartDate)} ${washFormatTime12(_rangeStartTime)} to ${washFormatDisplayDate(_rangeEndDate)} ${washFormatTime12(_rangeEndTime)}';
    final t = WashTokens.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        WashDateTimeFieldset(
          legend: 'Range start',
          child: Column(
            children: [
              WashDateInput(
                  value: _rangeStartDate,
                  onChanged: (v) => setState(() => _rangeStartDate = v),
                  ariaLabel: 'Range start date'),
              WashTimeClockDial(
                  value: _rangeStartTime,
                  onChanged: (v) => setState(() => _rangeStartTime = v),
                  ariaLabel: 'Range start time'),
            ],
          ),
        ),
        const SizedBox(height: 16),
        WashDateTimeFieldset(
          legend: 'Range end',
          child: Column(
            children: [
              WashDateInput(
                  value: _rangeEndDate,
                  onChanged: (v) => setState(() => _rangeEndDate = v),
                  ariaLabel: 'Range end date'),
              WashTimeClockDial(
                  value: _rangeEndTime,
                  onChanged: (v) => setState(() => _rangeEndTime = v),
                  ariaLabel: 'Range end time'),
            ],
          ),
        ),
        Container(
          margin: const EdgeInsets.only(top: 16),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            border: Border.all(color: t.inkBorder.withValues(alpha: 0.8)),
            borderRadius: BorderRadius.circular(12),
            color: t.surface.withValues(alpha: 0.6),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Live summary', style: WashTypography.label(t.inkMuted)),
              const SizedBox(height: 4),
              Text(summary,
                  style: WashTypography.body(t.onSurface)
                      .copyWith(fontWeight: FontWeight.w600)),
              const WashDateTimeClassLabel('date+time × 2'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _studioSection() {
    final drySummary =
        '${washFormatDisplayDate(_dryStartDate)} ${washFormatTime12(_dryStartTime)} to ${washFormatDisplayDate(_dryEndDate)} ${washFormatTime12(_dryEndTime)}';
    return LayoutBuilder(
      builder: (context, c) {
        final wide = c.maxWidth >= WashTailwindBreakpoints.lg;
        final dry = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Dry window',
                style: WashTypography.title(WashTokens.of(context).primary)
                    .copyWith(fontWeight: FontWeight.bold)),
            WashDateTimeFieldset(
              legend: 'Starts drying',
              child: Column(
                children: [
                  WashDateInput(
                      value: _dryStartDate,
                      onChanged: (v) => setState(() => _dryStartDate = v),
                      ariaLabel: 'Dry start date'),
                  WashTimeClockDial(
                      value: _dryStartTime,
                      onChanged: (v) => setState(() => _dryStartTime = v),
                      ariaLabel: 'Dry start time'),
                ],
              ),
            ),
            WashDateTimeFieldset(
              legend: 'Ready by',
              child: Column(
                children: [
                  WashDateInput(
                      value: _dryEndDate,
                      onChanged: (v) => setState(() => _dryEndDate = v),
                      ariaLabel: 'Dry end date'),
                  WashTimeClockDial(
                      value: _dryEndTime,
                      onChanged: (v) => setState(() => _dryEndTime = v),
                      ariaLabel: 'Dry end time'),
                ],
              ),
            ),
            WashDateTimeLiveValue(label: 'Dry window', value: drySummary),
          ],
        );
        final critique = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Critique booking',
                style: WashTypography.title(
                        WashTokens.of(context).palette.secondary)
                    .copyWith(fontWeight: FontWeight.bold)),
            WashDateTimeFieldset(
              legend: 'Date and time',
              child: WashCalendarDropdown(
                value: _critiqueValue,
                includeTime: true,
                onChanged: (v) => setState(() => _critiqueValue = v),
              ),
            ),
            WashDateTimeLiveValue(
                label: 'Critique',
                value: washFormatDateTimeLocal(_critiqueValue)),
            const WashDateTimeClassLabel('CalendarMonth includeTime'),
          ],
        );
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: dry),
              const SizedBox(width: 24),
              Expanded(child: critique)
            ],
          );
        }
        return Column(children: [dry, const SizedBox(height: 24), critique]);
      },
    );
  }

  Widget _statesSection() {
    return LayoutBuilder(
      builder: (context, c) {
        final wide = c.maxWidth >= WashTailwindBreakpoints.lg;
        final form = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            WashDateTimeFieldset(
              legend: 'Delivery date',
              requiredMark: true,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashDateInput(
                      value: _requiredDate,
                      onChanged: (v) => setState(() => _requiredDate = v),
                      ariaLabel: 'Delivery date'),
                  if (_requiredTouched && _requiredDate.isEmpty)
                    Text('Date is required',
                        style: WashTypography.label(const Color(0xFFEF4444))),
                ],
              ),
            ),
            WashDateTimeFieldset(
              legend: 'Pickup time',
              requiredMark: true,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  WashTimeClockDial(
                      value: _requiredTime,
                      onChanged: (v) => setState(() => _requiredTime = v),
                      ariaLabel: 'Pickup time'),
                  if (_requiredTouched && _requiredTime.isEmpty)
                    Text('Time is required',
                        style: WashTypography.label(const Color(0xFFEF4444))),
                ],
              ),
            ),
            WashButton(
              label: 'Check required',
              onPressed: () => setState(() => _requiredTouched = true),
            ),
          ],
        );
        final locked = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Opacity(
              opacity: 0.7,
              child: WashDateTimeFieldset(
                legend: 'Locked date',
                child: WashDateInput(
                    value: _pasteToday,
                    onChanged: (_) {},
                    enabled: false,
                    ariaLabel: 'Locked date'),
              ),
            ),
            Opacity(
              opacity: 0.7,
              child: WashDateTimeFieldset(
                legend: 'Locked time',
                child: const WashTimeClockDial(
                    value: '16:00:00',
                    disabled: true,
                    ariaLabel: 'Locked time'),
              ),
            ),
          ],
        );
        if (wide) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: form),
              const SizedBox(width: 24),
              Expanded(child: locked)
            ],
          );
        }
        return Column(children: [form, const SizedBox(height: 24), locked]);
      },
    );
  }

  Widget _responsiveSection() {
    final t = WashTokens.of(context);
    return Container(
      width: double.infinity,
      constraints: const BoxConstraints(maxWidth: 360),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: Border.all(
            color: t.inkBorder.withValues(alpha: 0.8),
            style: BorderStyle.solid),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('~360px phone column', style: WashTypography.label(t.inkMuted)),
          const SizedBox(height: 12),
          WashDateTimeFieldset(
            legend: 'Open hours',
            child: Column(
              children: [
                WashTimeClockDial(
                    value: '10:00:00',
                    onChanged: (_) {},
                    ariaLabel: 'Open from'),
                const SizedBox(height: 8),
                WashTimeClockDial(
                    value: '18:00:00',
                    onChanged: (_) {},
                    ariaLabel: 'Open until'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  static const _timeDart =
      'WashTimeClockDial(value: time, onChanged: setTime);';
  static const _dateDart = 'WashDateInput + WashCalendarDropdown';
  static const _dateTimeDart =
      'WashDateTimeLocalInput + WashDateInput + WashTimeClockDial';
  static const _timeRangeDart = 'WashTimeClockDial start/end pair';
  static const _dateRangeDart = 'WashCalendarMonth(mode: range)';
  static const _dateTimeRangeDart = 'Range start/end date + time';
  static const _studioDart =
      'Dry window fields + WashCalendarDropdown(includeTime: true)';
  static const _statesDart = 'Required fieldset + disabled inputs';
  static const _responsiveDart = 'Stacked TimeClockDial in max-width column';
}
