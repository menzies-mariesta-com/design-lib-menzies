import 'dart:async';

import 'package:flutter/widgets.dart';

import '../../components/alert/wash_daisy_alert.dart';
import '../../components/button/wash_button.dart';
import '../../components/otp/wash_otp.dart';
import '../../icons/wash_lucide_icon.dart';
import '../../theme/wash_typography.dart';
import '../../tokens/wash_tokens.dart';
import '../wash_gallery_panel.dart';
import '../wash_showcase_tabs.dart';

class WashOtpGalleryPage extends StatefulWidget {
  const WashOtpGalleryPage({super.key});

  @override
  State<WashOtpGalleryPage> createState() => _WashOtpGalleryPageState();
}

class _WashOtpGalleryPageState extends State<WashOtpGalleryPage> {
  static const _studioCode = '4821';

  String _verifyCode = '';
  String _studioCodeValue = '';
  String? _toastMessage;
  WashAlertTone? _toastTone;
  Timer? _toastTimer;

  static const _sizes = <(String, WashOtpSize)>[
    ('XS', WashOtpSize.xs),
    ('SM', WashOtpSize.sm),
    ('MD', WashOtpSize.md),
    ('LG', WashOtpSize.lg),
    ('XL', WashOtpSize.xl),
  ];

  static const _colors = <(String, WashOtpTone)>[
    ('Neutral', WashOtpTone.neutral),
    ('Primary', WashOtpTone.primary),
    ('Secondary', WashOtpTone.secondary),
    ('Accent', WashOtpTone.accent),
    ('Info', WashOtpTone.info),
    ('Success', WashOtpTone.success),
    ('Warning', WashOtpTone.warning),
    ('Error', WashOtpTone.error),
  ];

  void _showToast(String message, WashAlertTone tone) {
    _toastTimer?.cancel();
    setState(() {
      _toastMessage = message;
      _toastTone = tone;
    });
    _toastTimer = Timer(const Duration(milliseconds: 3500), () {
      if (mounted) {
        setState(() {
          _toastMessage = null;
          _toastTone = null;
        });
      }
    });
  }

  @override
  void dispose() {
    _toastTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);

    return Stack(
      children: [
        WashGalleryPage(
          kicker: 'Component gallery',
          title: 'OTP',
          description:
              'daisyUI otp pin fields for verification codes, sizes, colors, and studio unlock flows.',
          sections: [
            WashGallerySection(
              eyebrow: '01 · Basic',
              title: 'Digit boxes',
              description:
                  'Four or six empty spans plus a single numeric input',
              child: WashShowcaseTabs(
                preview: LayoutBuilder(
                  builder: (context, constraints) {
                    final row = constraints.maxWidth >= 640;
                    final kids = [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '4 digits',
                            style: WashTypography.label(tokens.inkMuted)
                                .copyWith(fontSize: 12),
                          ),
                          const SizedBox(height: 8),
                          const WashOtp(
                            digits: 4,
                            semanticLabel: 'Four digit code',
                          ),
                          const SizedBox(height: 8),
                          _ClassLabel('otp (4 spans)'),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '6 digits',
                            style: WashTypography.label(tokens.inkMuted)
                                .copyWith(fontSize: 12),
                          ),
                          const SizedBox(height: 8),
                          const WashOtp(
                            digits: 6,
                            semanticLabel: 'Six digit code',
                          ),
                          const SizedBox(height: 8),
                          _ClassLabel('otp (6 spans)'),
                        ],
                      ),
                    ];
                    if (row) {
                      return Row(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          kids[0],
                          const SizedBox(width: 32),
                          kids[1],
                        ],
                      );
                    }
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        kids[0],
                        const SizedBox(height: 24),
                        kids[1],
                      ],
                    );
                  },
                ),
                dartSource: _basicDart,
              ),
            ),
            WashGallerySection(
              eyebrow: '02 · Joined',
              title: 'Connected boxes',
              description:
                  'otp-joined merges the character cells into one continuous field',
              tint: WashGalleryPanelTint.ochre,
              child: WashShowcaseTabs(
                preview: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const WashOtp(
                      digits: 4,
                      joined: true,
                      semanticLabel: 'Joined four digit code',
                    ),
                    const SizedBox(height: 8),
                    const _ClassLabel('otp otp-joined'),
                  ],
                ),
                dartSource: _joinedDart,
              ),
            ),
            WashGallerySection(
              eyebrow: '03 · Sizes',
              title: 'Scale ladder',
              description:
                  'otp-xs through otp-xl for compact and generous layouts',
              child: WashShowcaseTabs(
                preview: Column(
                  children: [
                    for (final s in _sizes) ...[
                      LayoutBuilder(
                        builder: (context, constraints) {
                          final row = constraints.maxWidth >= 640;
                          final field = SingleChildScrollView(
                            scrollDirection: Axis.horizontal,
                            padding: const EdgeInsets.only(bottom: 4),
                            child: WashOtp(
                              digits: 4,
                              size: s.$2,
                              semanticLabel: '${s.$1} OTP',
                            ),
                          );
                          if (row) {
                            return Row(
                              children: [
                                SizedBox(
                                  width: 32,
                                  child: Text(
                                    s.$1,
                                    style: WashTypography.body(tokens.inkMuted)
                                        .copyWith(
                                      fontSize: 12,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 16),
                                Flexible(child: field),
                                const SizedBox(width: 12),
                                _ClassLabel('otp otp-${s.$2.name}'),
                              ],
                            );
                          }
                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                s.$1,
                                style: WashTypography.body(tokens.inkMuted)
                                    .copyWith(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                              const SizedBox(height: 8),
                              field,
                              const SizedBox(height: 4),
                              _ClassLabel('otp otp-${s.$2.name}'),
                            ],
                          );
                        },
                      ),
                      const SizedBox(height: 20),
                    ],
                  ],
                ),
                dartSource: _sizesDart,
              ),
            ),
            WashGallerySection(
              eyebrow: '04 · Colors',
              title: 'Semantic accents',
              description: 'Neutral through error border tones',
              child: WashShowcaseTabs(
                preview: LayoutBuilder(
                  builder: (context, constraints) {
                    final cols = constraints.maxWidth >= 1024
                        ? 4
                        : constraints.maxWidth >= 640
                            ? 2
                            : 1;
                    final gap = 20.0;
                    final w = cols == 1
                        ? constraints.maxWidth
                        : (constraints.maxWidth - gap * (cols - 1)) / cols;
                    return Wrap(
                      spacing: gap,
                      runSpacing: gap,
                      children: [
                        for (final c in _colors)
                          SizedBox(
                            width: w,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  c.$1,
                                  style: WashTypography.body(tokens.inkMuted)
                                      .copyWith(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                                const SizedBox(height: 8),
                                SingleChildScrollView(
                                  scrollDirection: Axis.horizontal,
                                  child: WashOtp(
                                    digits: 4,
                                    tone: c.$2,
                                    semanticLabel: '${c.$1} OTP',
                                  ),
                                ),
                                const SizedBox(height: 4),
                                _ClassLabel('otp otp-${c.$2.name}'),
                              ],
                            ),
                          ),
                      ],
                    );
                  },
                ),
                dartSource: _colorsDart,
              ),
            ),
            WashGallerySection(
              eyebrow: '05 · Form',
              title: 'Verify with button',
              description: 'Required label, OTP field, and a verify action',
              tint: WashGalleryPanelTint.rose,
              child: WashShowcaseTabs(
                preview: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 448),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      RichText(
                        text: TextSpan(
                          style: WashTypography.body(tokens.onSurface),
                          children: [
                            const TextSpan(text: 'Verification code'),
                            TextSpan(
                              text: '*',
                              style: TextStyle(
                                color: tokens.error,
                                fontSize: 14,
                                height: 1,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 8),
                      WashOtp(
                        digits: 4,
                        value: _verifyCode,
                        onChanged: (v) => setState(() => _verifyCode = v),
                        semanticLabel: 'Verification code',
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Enter the 4-digit code from your device.',
                        style: WashTypography.body(tokens.inkMuted)
                            .copyWith(fontSize: 12),
                      ),
                      const SizedBox(height: 16),
                      WashButton(
                        label: 'Verify',
                        onPressed: () {
                          if (_verifyCode.length == 4) {
                            _showToast('Code verified', WashAlertTone.success);
                          } else {
                            _showToast(
                              'Enter all four digits',
                              WashAlertTone.error,
                            );
                          }
                        },
                      ),
                      const SizedBox(height: 8),
                      const _ClassLabel('otp + btn btn-primary'),
                    ],
                  ),
                ),
                dartSource: _formDart,
              ),
            ),
            WashGallerySection(
              eyebrow: '06 · Studio',
              title: 'Studio unlock code',
              description: 'Themed unlock demo',
              child: WashShowcaseTabs(
                preview: Align(
                  alignment: Alignment.center,
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 384),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        RichText(
                          textAlign: TextAlign.center,
                          text: TextSpan(
                            style: WashTypography.body(tokens.onSurface),
                            children: [
                              const TextSpan(text: 'Unlock code'),
                              TextSpan(
                                text: '*',
                                style: TextStyle(
                                  color: tokens.error,
                                  fontSize: 14,
                                  height: 1,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 8),
                        SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: WashOtp(
                            digits: 4,
                            size: WashOtpSize.lg,
                            tone: WashOtpTone.primary,
                            value: _studioCodeValue,
                            onChanged: (v) =>
                                setState(() => _studioCodeValue = v),
                            semanticLabel: 'Studio unlock code',
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Open the pigment desk with your studio pin.',
                          textAlign: TextAlign.center,
                          style: WashTypography.body(tokens.inkMuted)
                              .copyWith(fontSize: 12),
                        ),
                        const SizedBox(height: 20),
                        WashButton(
                          label: 'Unlock studio',
                          variant: WashButtonVariant.secondary,
                          onPressed: () {
                            if (_studioCodeValue == _studioCode) {
                              _showToast(
                                'Studio unlocked',
                                WashAlertTone.success,
                              );
                            } else {
                              _showToast(
                                'Incorrect unlock code',
                                WashAlertTone.error,
                              );
                            }
                          },
                        ),
                        const SizedBox(height: 8),
                        const _ClassLabel('otp otp-lg otp-primary'),
                      ],
                    ),
                  ),
                ),
                dartSource: _studioDart,
              ),
            ),
            WashGallerySection(
              eyebrow: '07 · Responsive',
              title: 'Narrow viewports',
              description:
                  'OTP rows scroll horizontally when boxes outgrow the panel, so mobile',
              tint: WashGalleryPanelTint.blue,
              child: WashShowcaseTabs(
                preview: Align(
                  alignment: Alignment.center,
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 220),
                    child: Column(
                      children: [
                        SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          padding: const EdgeInsets.only(bottom: 8),
                          child: const WashOtp(
                            digits: 6,
                            size: WashOtpSize.lg,
                            joined: true,
                            semanticLabel: 'Responsive six digit code',
                          ),
                        ),
                        const _ClassLabel(
                          'otp otp-lg otp-joined + overflow-x-auto',
                        ),
                      ],
                    ),
                  ),
                ),
                dartSource: _responsiveDart,
              ),
            ),
          ],
        ),
        if (_toastMessage != null && _toastTone != null)
          Positioned(
            right: 16,
            bottom: 16,
            child: WashDaisyAlert(
              tone: _toastTone!,
              shadow: true,
              children: [
                WashLucideIcon(
                  _toastTone == WashAlertTone.success
                      ? 'circle-check'
                      : 'circle-x',
                  size: 20,
                ),
                WashAlertMessage(_toastMessage!),
              ],
            ),
          ),
      ],
    );
  }

  static const _basicDart = 'WashOtp(digits: 4) / WashOtp(digits: 6)';
  static const _joinedDart = 'WashOtp(digits: 4, joined: true)';
  static const _sizesDart = 'WashOtp(size: WashOtpSize.xs…xl)';
  static const _colorsDart = 'WashOtp(tone: WashOtpTone.primary…)';
  static const _formDart = 'WashOtp + Verify WashButton + toast';
  static const _studioDart = 'WashOtp(size: lg, tone: primary) unlock demo';
  static const _responsiveDart =
      'WashOtp(digits: 6, size: lg, joined: true) in narrow frame';
}

class _ClassLabel extends StatelessWidget {
  const _ClassLabel(this.value);

  final String value;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      value,
      style: WashTypography.body(tokens.inkMuted).copyWith(
        fontFamily: 'monospace',
        fontSize: 10.4,
      ),
    );
  }
}
