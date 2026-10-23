import 'package:flutter/widgets.dart';

import '../components/button/wash_button.dart';
import '../foundation/wash_icon.dart';
import '../icons/wash_lucide_icon.dart';
import '../theme/wash_typography.dart';
import '../tokens/wash_tokens.dart';
import '../widgets/wash_form_fields.dart';
import 'wash_code_editor_pane.dart';

/// Rich template previews for the `auth-*` and `template-*` routes. The web
/// demo composes these as full product surfaces, so Flutter mirrors the same
/// section variants instead of repeating one placeholder card.
class WashTemplatePreview extends StatelessWidget {
  const WashTemplatePreview({
    required this.pageId,
    required this.sectionIndex,
    required this.sectionTitle,
    super.key,
  });

  final String pageId;
  final int sectionIndex;
  final String sectionTitle;

  @override
  Widget build(BuildContext context) {
    return switch (pageId) {
      'auth-screen' => _AuthScreenDemo(index: sectionIndex),
      'auth-2fa' => const _TwoFactorDemo(),
      'auth-otp' => const _OtpVerificationDemo(),
      'forgot-password' => const _ForgotPasswordDemo(),
      'template-checkout' => const _CheckoutDemo(),
      'template-payment' => _PaymentDemo(index: sectionIndex),
      'template-terminal-logging' => const _TerminalDemo(),
      'template-rich-text' => const _RichTextDemo(),
      'template-code-editor' => const _CodeEditorDemo(),
      'template-file-tree' => const _FileTreeDemo(),
      'template-docs-layout' => const _DocsLayoutDemo(),
      'template-dialog' => _DialogDemo(index: sectionIndex),
      _ => _SimpleTemplate(title: sectionTitle),
    };
  }
}

class _SimpleTemplate extends StatelessWidget {
  const _SimpleTemplate({required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _CardShell(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: WashTypography.title(tokens.onSurface).copyWith(
              fontSize: 20,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Template preview',
            style: WashTypography.body(tokens.inkMuted),
          ),
        ],
      ),
    );
  }
}

/* ------------------------------------------------------------------ auth */

class _AuthScreenDemo extends StatelessWidget {
  const _AuthScreenDemo({required this.index});

  final int index;

  @override
  Widget build(BuildContext context) {
    if (index >= 3) {
      return const _AuthSplit();
    }
    final tokens = WashTokens.of(context);
    final signup = index == 2;
    return Container(
      width: double.infinity,
      constraints: BoxConstraints(minHeight: signup ? 448 : 320),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: tokens.surfaceContainer.withValues(alpha: signup ? 0.4 : 0.6),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: BoxConstraints(maxWidth: signup ? 448 : 384),
          child: SizedBox(
            width: double.infinity,
            child: _AuthCard(signup: signup),
          ),
        ),
      ),
    );
  }
}

class _AuthCard extends StatefulWidget {
  const _AuthCard({this.signup = false});

  final bool signup;

  @override
  State<_AuthCard> createState() => _AuthCardState();
}

class _AuthCardState extends State<_AuthCard> {
  bool _remember = false;
  bool _terms = false;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final signup = widget.signup;
    return _CardShell(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            signup ? 'Create account' : 'Sign in',
            style: WashTypography.body(tokens.palette.primary).copyWith(
              fontSize: 20,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            signup
                ? 'Start archiving plates and sharing wash presets.'
                : 'Access your Menzies Design studio plates.',
            style: WashTypography.body(tokens.inkMuted).copyWith(
              fontSize: 14,
              height: 1.45,
            ),
          ),
          const SizedBox(height: 16),
          if (signup) ...[
            const WashInput(
              label: 'Display name',
              hint: 'Studio name',
              requiredMark: true,
            ),
            const SizedBox(height: 12),
            const WashInput(
              label: 'Email',
              hint: 'you@studio.com',
              requiredMark: true,
            ),
            const SizedBox(height: 12),
            LayoutBuilder(
              builder: (context, constraints) {
                final password = const WashInput(
                  label: 'Password',
                  hint: 'Password',
                  requiredMark: true,
                  obscureText: true,
                );
                final confirm = const WashInput(
                  label: 'Confirm',
                  hint: 'Confirm',
                  requiredMark: true,
                  obscureText: true,
                );
                if (constraints.maxWidth < 360) {
                  return Column(
                    children: [
                      password,
                      const SizedBox(height: 12),
                      confirm,
                    ],
                  );
                }
                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(child: password),
                    const SizedBox(width: 12),
                    Expanded(child: confirm),
                  ],
                );
              },
            ),
            const SizedBox(height: 12),
            _AuthCheckbox(
              value: _terms,
              onChanged: (v) => setState(() => _terms = v ?? false),
              label: 'I agree to the studio terms',
              required: true,
            ),
            const SizedBox(height: 16),
            WashButton(
              label: 'Create account',
              block: true,
              onPressed: () {},
            ),
          ] else ...[
            const WashInput(
              label: 'Email',
              hint: 'you@studio.com',
              requiredMark: true,
              leading: WashLucideIcon('mail', size: 16),
            ),
            const SizedBox(height: 12),
            const WashInput(
              label: 'Password',
              hint: 'Password',
              requiredMark: true,
              obscureText: true,
              leading: WashLucideIcon('lock', size: 16),
            ),
            const SizedBox(height: 12),
            LayoutBuilder(
              builder: (context, constraints) {
                final remember = _AuthCheckbox(
                  value: _remember,
                  onChanged: (v) => setState(() => _remember = v ?? false),
                  label: 'Remember me',
                );
                final forgot = _TextLink(
                  label: 'Forgot password?',
                  onTap: () {},
                );
                if (constraints.maxWidth < 240) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      remember,
                      const SizedBox(height: 4),
                      forgot,
                    ],
                  );
                }
                return Row(
                  children: [
                    Expanded(child: remember),
                    forgot,
                  ],
                );
              },
            ),
            const SizedBox(height: 16),
            WashButton(
              label: 'Sign in',
              block: true,
              onPressed: () {},
            ),
            const SizedBox(height: 12),
            Center(
              child: Text.rich(
                TextSpan(
                  children: [
                    TextSpan(
                      text: 'No account? ',
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 13,
                      ),
                    ),
                    TextSpan(
                      text: 'Create one',
                      style: WashTypography.body(tokens.palette.secondary)
                          .copyWith(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _AuthCheckbox extends StatelessWidget {
  const _AuthCheckbox({
    required this.value,
    required this.onChanged,
    required this.label,
    this.required = false,
  });

  final bool value;
  final ValueChanged<bool?> onChanged;
  final String label;
  final bool required;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () => onChanged(!value),
        child: Row(
          children: [
            Container(
              width: 20,
              height: 20,
              decoration: BoxDecoration(
                color: value ? tokens.primary : null,
                border: Border.all(color: tokens.inkBorder, width: 2),
                borderRadius: BorderRadius.circular(4),
              ),
              child: value
                  ? WashIcon(
                      WashIconGlyph.check,
                      size: 14,
                      color: tokens.onPrimary,
                    )
                  : null,
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Text.rich(
                TextSpan(
                  children: [
                    TextSpan(
                      text: label,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 14,
                      ),
                    ),
                    if (required)
                      TextSpan(
                        text: ' *',
                        style: WashTypography.body(tokens.palette.error)
                            .copyWith(fontSize: 14),
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AuthSplit extends StatelessWidget {
  const _AuthSplit();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 820;
        final copy = Column(
          crossAxisAlignment:
              wide ? CrossAxisAlignment.start : CrossAxisAlignment.center,
          children: [
            Text(
              'MENZIES DESIGN',
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                letterSpacing: 1.4,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              'Welcome back to the wash desk',
              textAlign: wide ? TextAlign.left : TextAlign.center,
              style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                fontSize: 36,
                height: 1.15,
                fontWeight: FontWeight.w700,
                letterSpacing: -0.6,
              ),
            ),
            const SizedBox(height: 14),
            Text(
              'Sign in to review plates, tune pigments, and publish studio '
              'presets for your team.',
              textAlign: wide ? TextAlign.left : TextAlign.center,
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 15,
                height: 1.6,
              ),
            ),
          ],
        );
        final card = SizedBox(
          width: wide ? 384 : double.infinity,
          child: const _SplitAuthCard(),
        );
        return Container(
          width: double.infinity,
          constraints: const BoxConstraints(minHeight: 512),
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: tokens.surfaceContainer,
            borderRadius: BorderRadius.circular(16),
          ),
          child: wide
              ? Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Align(
                        alignment: Alignment.centerLeft,
                        child: ConstrainedBox(
                          constraints: const BoxConstraints(maxWidth: 448),
                          child: copy,
                        ),
                      ),
                    ),
                    const SizedBox(width: 32),
                    card,
                  ],
                )
              : Column(
                  children: [
                    copy,
                    const SizedBox(height: 28),
                    card,
                  ],
                ),
        );
      },
    );
  }
}

class _SplitAuthCard extends StatelessWidget {
  const _SplitAuthCard();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return _CardShell(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'Sign in',
            style: WashTypography.body(tokens.palette.secondary).copyWith(
              fontSize: 20,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 16),
          const WashInput(
            label: 'Email',
            hint: 'you@studio.com',
            requiredMark: true,
          ),
          const SizedBox(height: 12),
          const WashInput(
            label: 'Password',
            hint: 'Password',
            requiredMark: true,
            obscureText: true,
          ),
          const SizedBox(height: 16),
          WashButton(
            label: 'Continue',
            block: true,
            onPressed: () {},
          ),
        ],
      ),
    );
  }
}

class _TwoFactorDemo extends StatelessWidget {
  const _TwoFactorDemo();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 440),
        child: _CardShell(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const _FeatureIcon(icon: 'shield-check'),
              const SizedBox(height: 16),
              Text(
                'Two-factor authentication',
                style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                  fontSize: 24,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.4,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Enter the 6-digit code from your authenticator app.',
                style: WashTypography.body(tokens.inkMuted).copyWith(
                  fontSize: 13,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 20),
              const Center(child: WashOtpField(length: 6)),
              const SizedBox(height: 18),
              WashButton(
                label: 'Verify code',
                block: true,
                onPressed: () {},
              ),
              const SizedBox(height: 10),
              Center(
                child: _TextLink(
                  label: 'Resend code',
                  onTap: () {},
                ),
              ),
              const SizedBox(height: 12),
              const _SoftNote(
                text:
                    'Lost your device? Use a backup code or contact your studio admin.',
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _OtpVerificationDemo extends StatelessWidget {
  const _OtpVerificationDemo();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 460),
        child: _CardShell(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const _FeatureIcon(icon: 'mail-check'),
              const SizedBox(height: 16),
              Text(
                'Check your email',
                style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                  fontSize: 24,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.4,
                ),
              ),
              const SizedBox(height: 6),
              Text.rich(
                TextSpan(
                  children: [
                    TextSpan(
                      text: 'We sent a 6-digit code to ',
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 13,
                        height: 1.5,
                      ),
                    ),
                    TextSpan(
                      text: 'ada@studio.com',
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 13,
                        height: 1.5,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    TextSpan(
                      text: '. It expires in 10 minutes.',
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 13,
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              const Center(child: WashOtpField(length: 6)),
              const SizedBox(height: 18),
              WashButton(
                label: 'Verify email',
                block: true,
                onPressed: () {},
              ),
              const SizedBox(height: 10),
              Wrap(
                alignment: WrapAlignment.center,
                crossAxisAlignment: WrapCrossAlignment.center,
                spacing: 4,
                children: [
                  Text(
                    "Didn't get it?",
                    style: WashTypography.body(tokens.inkMuted).copyWith(
                      fontSize: 12.5,
                    ),
                  ),
                  _TextLink(label: 'Resend', onTap: () {}),
                ],
              ),
              const SizedBox(height: 8),
              Center(
                child: _TextLink(
                  label: 'Back to sign in',
                  icon: 'arrow-left',
                  onTap: () {},
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ForgotPasswordDemo extends StatelessWidget {
  const _ForgotPasswordDemo();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 440),
        child: _CardShell(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const _FeatureIcon(icon: 'key-round'),
              const SizedBox(height: 16),
              Text(
                'Reset your password',
                style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                  fontSize: 24,
                  fontWeight: FontWeight.w600,
                  letterSpacing: -0.4,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'Enter the email tied to your studio account and we will send '
                'a single-use reset link.',
                style: WashTypography.body(tokens.inkMuted).copyWith(
                  fontSize: 13,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 20),
              const WashInput(
                label: 'Email',
                hint: 'you@studio.com',
                leading: WashLucideIcon('mail', size: 16),
              ),
              const SizedBox(height: 16),
              WashButton(
                label: 'Send reset link',
                block: true,
                onPressed: () {},
              ),
              const SizedBox(height: 14),
              Center(
                child: _TextLink(
                  label: 'Back to sign in',
                  icon: 'arrow-left',
                  onTap: () {},
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/* --------------------------------------------------------------- checkout */

class _CheckoutDemo extends StatelessWidget {
  const _CheckoutDemo();

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 900;
        final form = _CheckoutForm();
        final summary = _OrderSummary();
        if (!wide) {
          return Column(
            children: [
              form,
              const SizedBox(height: 20),
              summary,
            ],
          );
        }
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(flex: 3, child: form),
            const SizedBox(width: 24),
            Expanded(flex: 2, child: summary),
          ],
        );
      },
    );
  }
}

class _CheckoutForm extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _FormSection(
          title: 'Contact',
          children: [
            const WashInput(
              label: 'Email',
              hint: 'you@studio.com',
              leading: WashLucideIcon('mail', size: 16),
            ),
            const SizedBox(height: 12),
            const WashInput(
              label: 'Phone',
              hint: '+1 (555) 014-8821',
              leading: WashLucideIcon('phone', size: 16),
            ),
          ],
        ),
        const SizedBox(height: 16),
        _FormSection(
          title: 'Shipping address',
          children: [
            const WashInput(label: 'Full name', hint: 'Ada Lovelace'),
            const SizedBox(height: 12),
            const WashInput(
              label: 'Address',
              hint: '42 Pigment Row',
              leading: WashLucideIcon('map-pin', size: 16),
            ),
            const SizedBox(height: 12),
            Row(
              children: const [
                Expanded(child: WashInput(label: 'City', hint: 'Portland')),
                SizedBox(width: 12),
                SizedBox(
                  width: 130,
                  child: WashInput(label: 'ZIP', hint: '97205'),
                ),
              ],
            ),
          ],
        ),
        const SizedBox(height: 16),
        _FormSection(
          title: 'Payment',
          children: [
            const WashInput(
              label: 'Card number',
              hint: '4242 4242 4242 4242',
              leading: WashLucideIcon('credit-card', size: 16),
            ),
            const SizedBox(height: 12),
            Row(
              children: const [
                Expanded(child: WashInput(label: 'Expiry', hint: 'MM / YY')),
                SizedBox(width: 12),
                Expanded(child: WashInput(label: 'CVC', hint: '123')),
              ],
            ),
            const SizedBox(height: 12),
            const WashInput(label: 'Name on card', hint: 'Ada Lovelace'),
          ],
        ),
      ],
    );
  }
}

class _OrderSummary extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    const items = [
      ('Ultramarine pigment set', '15ml tubes, studio grade', 2, r'$48.00'),
      ('Arches cold press plate pack', '10 sheets, 140 lb', 1, r'$124.00'),
      ('Palette knife trio', 'Flexible steel, wash desk', 1, r'$32.00'),
    ];
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.72),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.8)),
        boxShadow: [
          BoxShadow(
            color: tokens.onSurface.withValues(alpha: 0.04),
            blurRadius: 16,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'Order summary',
            style: WashTypography.title(tokens.onSurface).copyWith(
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 16),
          for (final item in items) ...[
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 38,
                  height: 38,
                  decoration: BoxDecoration(
                    color: tokens.palette.primary.withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Center(
                    child: WashLucideIcon(
                      'droplet',
                      size: 18,
                      color: tokens.palette.primary,
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item.$1,
                        style: WashTypography.body(tokens.onSurface).copyWith(
                          fontSize: 12.5,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        '${item.$2} · Qty ${item.$3}',
                        style: WashTypography.body(tokens.inkMuted).copyWith(
                          fontSize: 11,
                        ),
                      ),
                    ],
                  ),
                ),
                Text(
                  item.$4,
                  style: WashTypography.body(tokens.onSurface).copyWith(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
          ],
          _DashedLine(color: tokens.inkBorder.withValues(alpha: 0.6)),
          const SizedBox(height: 12),
          for (final row in const [
            ('Subtotal', r'$204.00'),
            ('Shipping', r'$0.00'),
            ('Tax', r'$16.32'),
          ])
            Padding(
              padding: const EdgeInsets.only(bottom: 6),
              child: Row(
                children: [
                  Expanded(
                    child: Text(
                      row.$1,
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 12.5,
                      ),
                    ),
                  ),
                  Text(
                    row.$2,
                    style: WashTypography.body(tokens.onSurface).copyWith(
                      fontSize: 12.5,
                    ),
                  ),
                ],
              ),
            ),
          _DashedLine(color: tokens.inkBorder.withValues(alpha: 0.6)),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: Text(
                  'Total',
                  style: WashTypography.body(tokens.onSurface).copyWith(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              Text(
                r'$220.32',
                style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                  fontSize: 22,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          WashButton(
            label: 'Place order · \$220.32',
            block: true,
            onPressed: () {},
          ),
          const SizedBox(height: 8),
          Text(
            'Secure checkout · Free studio shipping',
            textAlign: TextAlign.center,
            style: WashTypography.body(tokens.inkMuted).copyWith(
              fontSize: 10.5,
            ),
          ),
        ],
      ),
    );
  }
}

class _FormSection extends StatelessWidget {
  const _FormSection({required this.title, required this.children});

  final String title;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: tokens.surface.withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.8)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            title,
            style: WashTypography.title(tokens.onSurface).copyWith(
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 14),
          ...children,
        ],
      ),
    );
  }
}

/* ---------------------------------------------------------------- payment */

class _PaymentDemo extends StatefulWidget {
  const _PaymentDemo({required this.index});

  final int index;

  @override
  State<_PaymentDemo> createState() => _PaymentDemoState();
}

class _PaymentDemoState extends State<_PaymentDemo> {
  int _saved = 0;
  bool _sameBilling = true;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final isSaved = widget.index >= 2;
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 720),
      child: _CardShell(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              isSaved ? 'Pay with card on file' : 'New card payment',
              style: WashTypography.title(tokens.onSurface).copyWith(
                fontSize: 20,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              isSaved
                  ? 'Choose a saved card. Billing details are reused from your studio account.'
                  : 'Add a card for this order. Your details stay on your device.',
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 13,
                height: 1.5,
              ),
            ),
            const SizedBox(height: 18),
            if (!isSaved) ...[
              const WashInput(
                label: 'Card number',
                hint: '4242 4242 4242 4242',
                leading: WashLucideIcon('credit-card', size: 16),
              ),
              const SizedBox(height: 12),
              Row(
                children: const [
                  Expanded(child: WashInput(label: 'Expiry', hint: 'MM / YY')),
                  SizedBox(width: 12),
                  Expanded(child: WashInput(label: 'CVC', hint: '123')),
                ],
              ),
              const SizedBox(height: 12),
              const WashInput(label: 'Name on card', hint: 'Ada Lovelace'),
              const SizedBox(height: 12),
              const WashInput(
                label: 'Billing address',
                hint: '42 Pigment Row, Portland',
                leading: WashLucideIcon('map-pin', size: 16),
              ),
            ] else ...[
              for (var i = 0; i < 2; i++) ...[
                _SavedCard(
                  selected: _saved == i,
                  title: i == 0 ? 'Visa •••• 4242' : 'Mastercard •••• 4444',
                  subtitle: i == 0 ? 'Expires 08 / 29' : 'Expires 02 / 28',
                  icon: i == 0 ? 'credit-card' : 'credit-card',
                  onTap: () => setState(() => _saved = i),
                ),
                const SizedBox(height: 8),
              ],
              const SizedBox(height: 4),
              _TextLink(
                label: 'Add a new card',
                icon: 'plus',
                onTap: () {},
              ),
              const SizedBox(height: 12),
              WashCheckbox(
                value: _sameBilling,
                onChanged: (v) => setState(() => _sameBilling = v ?? false),
                label: 'Billing address same as studio account',
              ),
            ],
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: tokens.surfaceContainer.withValues(alpha: 0.5),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: tokens.inkBorder.withValues(alpha: 0.6),
                ),
              ),
              child: Row(
                children: [
                  const WashLucideIcon('shield-check', size: 18),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Encrypted checkout · 30-day studio guarantee',
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 11.5,
                      ),
                    ),
                  ),
                  Text(
                    r'$220.32',
                    style:
                        WashTypography.displayLarge(tokens.onSurface).copyWith(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            WashButton(
              label: 'Pay \$220.32',
              block: true,
              onPressed: () {},
            ),
          ],
        ),
      ),
    );
  }
}

class _SavedCard extends StatelessWidget {
  const _SavedCard({
    required this.selected,
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.onTap,
  });

  final bool selected;
  final String title;
  final String subtitle;
  final String icon;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: selected
                ? Color.alphaBlend(
                    tokens.palette.primary.withValues(alpha: 0.08),
                    tokens.surface,
                  )
                : tokens.surface.withValues(alpha: 0.6),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: selected
                  ? tokens.palette.primary.withValues(alpha: 0.6)
                  : tokens.inkBorder.withValues(alpha: 0.6),
            ),
          ),
          child: Row(
            children: [
              Container(
                width: 20,
                height: 20,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: selected ? tokens.palette.primary : tokens.inkBorder,
                    width: 2,
                  ),
                ),
                child: selected
                    ? Center(
                        child: Container(
                          width: 10,
                          height: 10,
                          decoration: BoxDecoration(
                            color: tokens.palette.primary,
                            shape: BoxShape.circle,
                          ),
                        ),
                      )
                    : null,
              ),
              const SizedBox(width: 12),
              WashLucideIcon(icon, size: 18, color: tokens.inkMuted),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: WashTypography.body(tokens.onSurface).copyWith(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      subtitle,
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 11.5,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/* --------------------------------------------------------------- terminal */

class _TerminalDemo extends StatelessWidget {
  const _TerminalDemo();

  @override
  Widget build(BuildContext context) {
    const bg = Color(0xFF0B1220);
    const chrome = Color(0xFF111827);
    const border = Color(0xFF1F2937);
    const logs = [
      ('12:04:01', 'INFO', 'wash build started', Color(0xFF7DD3FC)),
      ('12:04:02', 'INFO', 'compiled 42 plate components', Color(0xFF7DD3FC)),
      ('12:04:03', 'OK', 'fonts copied · 4 families', Color(0xFF4ADE80)),
      ('12:04:04', 'WARN', 'studio humidity 62%', Color(0xFFFBBF24)),
      ('12:04:05', 'INFO', 'watching src/pigments', Color(0xFF7DD3FC)),
      (
        '12:04:06',
        'ERROR',
        'plate 17 skipped · missing mask',
        Color(0xFFF87171)
      ),
      ('12:04:07', 'INFO', 'ready in 4.2s', Color(0xFF7DD3FC)),
    ];
    return Container(
      height: 360,
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: border),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            height: 46,
            padding: const EdgeInsets.symmetric(horizontal: 14),
            color: chrome,
            child: Row(
              children: [
                for (final color in const [
                  Color(0xFFF87171),
                  Color(0xFFFBBF24),
                  Color(0xFF4ADE80),
                ]) ...[
                  Container(
                    width: 9,
                    height: 9,
                    decoration: BoxDecoration(
                      color: color,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 6),
                ],
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'studio — wash build',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: WashTypography.body(const Color(0xFFE5E7EB))
                        .copyWith(fontSize: 12, fontFamily: 'MapleMono'),
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: const Color(0xFF4ADE80).withValues(alpha: 0.12),
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(
                      color: const Color(0xFF4ADE80).withValues(alpha: 0.4),
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 6,
                        height: 6,
                        decoration: const BoxDecoration(
                          color: Color(0xFF4ADE80),
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 5),
                      Text(
                        'Live',
                        style: WashTypography.body(const Color(0xFF4ADE80))
                            .copyWith(fontSize: 10.5),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 10),
                for (final icon in const ['trash-2', 'pause', 'copy']) ...[
                  _TerminalButton(icon: icon),
                  const SizedBox(width: 4),
                ],
              ],
            ),
          ),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (final log in logs)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            log.$1,
                            style: WashTypography.body(const Color(0xFF64748B))
                                .copyWith(
                              fontSize: 11.5,
                              fontFamily: 'MapleMono',
                            ),
                          ),
                          const SizedBox(width: 10),
                          Container(
                            width: 52,
                            padding: const EdgeInsets.symmetric(vertical: 1),
                            decoration: BoxDecoration(
                              color: log.$4.withValues(alpha: 0.12),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              log.$2,
                              textAlign: TextAlign.center,
                              style: WashTypography.body(log.$4).copyWith(
                                fontSize: 9.5,
                                fontFamily: 'MapleMono',
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              log.$3,
                              style:
                                  WashTypography.body(const Color(0xFFE2E8F0))
                                      .copyWith(
                                fontSize: 12,
                                fontFamily: 'MapleMono',
                                height: 1.5,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  Padding(
                    padding: const EdgeInsets.only(top: 2),
                    child: Row(
                      children: [
                        Text(
                          r'$ ',
                          style: WashTypography.body(const Color(0xFF4ADE80))
                              .copyWith(fontSize: 12, fontFamily: 'MapleMono'),
                        ),
                        Container(
                          width: 7,
                          height: 14,
                          color: const Color(0xFF4ADE80),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          Container(
            height: 24,
            padding: const EdgeInsets.symmetric(horizontal: 14),
            color: chrome,
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    'main*  UTF-8  LF',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style:
                        WashTypography.body(const Color(0xFF94A3B8)).copyWith(
                      fontSize: 10,
                      fontFamily: 'MapleMono',
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  'wash 1.4.0',
                  style: WashTypography.body(const Color(0xFF94A3B8)).copyWith(
                    fontSize: 10,
                    fontFamily: 'MapleMono',
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _TerminalButton extends StatelessWidget {
  const _TerminalButton({required this.icon});

  final String icon;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 26,
      height: 26,
      decoration: BoxDecoration(
        color: const Color(0xFF1F2937),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: const Color(0xFF374151)),
      ),
      child: Center(
        child: WashLucideIcon(
          icon,
          size: 13,
          color: const Color(0xFFCBD5E1),
        ),
      ),
    );
  }
}

/* -------------------------------------------------------------- rich text */

class _RichTextDemo extends StatelessWidget {
  const _RichTextDemo();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    const tools = [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'code',
      'link',
      'list',
      'list-ordered',
      'quote',
      'undo-2',
      'redo-2',
    ];
    return Container(
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.8)),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(
              color: tokens.surfaceContainer.withValues(alpha: 0.35),
              border: Border(
                bottom: BorderSide(
                  color: tokens.inkBorder.withValues(alpha: 0.6),
                ),
              ),
            ),
            child: Wrap(
              spacing: 4,
              runSpacing: 4,
              children: [
                for (var i = 0; i < tools.length; i++) ...[
                  _ToolButton(icon: tools[i], active: i == 0),
                  if (i == 5 || i == 8)
                    Container(
                      width: 1,
                      height: 24,
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      color: tokens.inkBorder.withValues(alpha: 0.6),
                    ),
                ],
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(28, 24, 28, 32),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Pigment notes',
                  style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                    fontSize: 30,
                    fontWeight: FontWeight.w600,
                    letterSpacing: -0.6,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'A living document for the studio palette, wash recipes, and '
                  'the decisions that keep the system calm.',
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 14,
                    height: 1.65,
                  ),
                ),
                const SizedBox(height: 22),
                _RichHeading('Mixing ultramarine'),
                const SizedBox(height: 8),
                _RichParagraph(
                  'Start with a cool ultramarine and add a touch of burnt umber '
                  'to knock back the saturation. Keep the mixture loose; the '
                  'paper should do as much work as the brush.',
                ),
                const SizedBox(height: 12),
                const _RichQuote(
                  'A wash is not a fill. It is a record of water finding its way.',
                ),
                const SizedBox(height: 16),
                _RichHeading('Studio checklist'),
                const SizedBox(height: 8),
                for (final line in const [
                  'Soak the plate for ninety seconds.',
                  'Mix enough pigment for two passes.',
                  'Dry flat, away from direct sun.',
                ])
                  Padding(
                    padding: const EdgeInsets.only(bottom: 6),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(top: 2),
                          child: WashIcon(
                            WashIconGlyph.check,
                            size: 14,
                            color: tokens.palette.primary,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            line,
                            style: WashTypography.body(tokens.onSurface)
                                .copyWith(fontSize: 13.5, height: 1.55),
                          ),
                        ),
                      ],
                    ),
                  ),
                const SizedBox(height: 12),
                Text.rich(
                  TextSpan(
                    children: [
                      TextSpan(
                        text: 'Persist the palette with ',
                        style: WashTypography.body(tokens.onSurface).copyWith(
                          fontSize: 13.5,
                          height: 1.65,
                        ),
                      ),
                      TextSpan(
                        text: 'washTheme.setPigment()',
                        style: WashTypography.body(tokens.onSurface).copyWith(
                          fontSize: 12.5,
                          fontFamily: 'MapleMono',
                          backgroundColor: tokens.surfaceContainer,
                        ),
                      ),
                      TextSpan(
                        text: ' and keep the paper mode in sync.',
                        style: WashTypography.body(tokens.onSurface).copyWith(
                          fontSize: 13.5,
                          height: 1.65,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ToolButton extends StatelessWidget {
  const _ToolButton({required this.icon, this.active = false});

  final String icon;
  final bool active;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      width: 30,
      height: 30,
      decoration: BoxDecoration(
        color: active ? tokens.palette.primary.withValues(alpha: 0.14) : null,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Center(
        child: WashLucideIcon(
          icon,
          size: 15,
          color: active ? tokens.palette.primary : tokens.inkMuted,
        ),
      ),
    );
  }
}

class _RichHeading extends StatelessWidget {
  const _RichHeading(this.text);
  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      text,
      style: WashTypography.displayLarge(tokens.onSurface).copyWith(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        letterSpacing: -0.3,
      ),
    );
  }
}

class _RichParagraph extends StatelessWidget {
  const _RichParagraph(this.text);
  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Text(
      text,
      style: WashTypography.body(tokens.onSurface).copyWith(
        fontSize: 13.5,
        height: 1.65,
      ),
    );
  }
}

class _RichQuote extends StatelessWidget {
  const _RichQuote(this.text);
  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
      decoration: BoxDecoration(
        border: Border(
          left: BorderSide(color: tokens.palette.primary, width: 3),
        ),
        color: tokens.palette.primary.withValues(alpha: 0.05),
      ),
      child: Text(
        '"$text"',
        style: WashTypography.body(tokens.onSurface).copyWith(
          fontSize: 13.5,
          height: 1.6,
          fontStyle: FontStyle.italic,
        ),
      ),
    );
  }
}

/* ------------------------------------------------------------ code editor */

class _CodeEditorDemo extends StatelessWidget {
  const _CodeEditorDemo();

  @override
  Widget build(BuildContext context) {
    const code = r'''import { createWashTheme } from '@menzies-design/wash-ui'

export const studioTheme = createWashTheme({
  pigment: 'mineral',
  mode: 'paper',
  radius: 10,
  fonts: {
    display: 'Fraunces',
    sans: 'Maple Mono',
  },
})

export function applyPigment(id: string) {
  document.documentElement.dataset.pigment = id
  localStorage.setItem('wash-pigment', id)
}
''';
    return WashCodeEditorPane(
      code: code,
      fileName: 'studio-theme.ts',
      languageLabel: 'TypeScript',
      languageId: 'typescript',
      bodyHeight: 430,
    );
  }
}

/* -------------------------------------------------------------- file tree */

class _FileNode {
  const _FileNode({
    required this.name,
    required this.depth,
    this.folder = false,
    this.content = '',
    this.language = 'plaintext',
    this.languageLabel = 'Plain text',
  });
  final String name;
  final int depth;
  final bool folder;
  final String content;
  final String language;
  final String languageLabel;
}

const _fileNodes = <_FileNode>[
  _FileNode(name: 'lib', depth: 0, folder: true),
  _FileNode(name: 'components', depth: 1, folder: true),
  _FileNode(name: 'button', depth: 2, folder: true),
  _FileNode(
    name: 'wash_button.dart',
    depth: 3,
    content: "class WashButton extends StatelessWidget {\n"
        "  const WashButton({required this.onPressed, this.label, super.key});\n\n"
        "  final VoidCallback onPressed;\n"
        "  final String? label;\n\n"
        "  @override\n"
        "  Widget build(BuildContext context) {\n"
        "    return WashRipple(onTap: onPressed, child: Text(label ?? 'Button'));\n"
        "  }\n"
        "}",
    language: 'dart',
    languageLabel: 'Dart',
  ),
  _FileNode(
    name: 'wash_tokens.css',
    depth: 2,
    content: ":root {\n"
        "  --wash-pigment: mineral;\n"
        "  --wash-radius: 10px;\n"
        "  --wash-font-display: 'Fraunces';\n"
        "}\n\n"
        ".wash-panel {\n"
        "  background: var(--wash-paper);\n"
        "  border: 1px solid var(--wash-ink-border);\n"
        "}",
    language: 'css',
    languageLabel: 'CSS',
  ),
  _FileNode(
    name: 'README.md',
    depth: 1,
    content: '# Wash UI Studio\n\n'
        'The pigment-first design system for calm, handmade products.\n\n'
        '## Getting started\n\n'
        '1. Pick a pigment.\n'
        '2. Wrap the app in WashThemeProvider.\n'
        '3. Compose from the component gallery.',
    language: 'markdown',
    languageLabel: 'Markdown',
  ),
  _FileNode(
    name: 'package.json',
    depth: 0,
    content: '{\n'
        '  "name": "@menzies-design/wash-ui",\n'
        '  "version": "1.4.0",\n'
        '  "type": "module"\n'
        "}",
    language: 'json',
    languageLabel: 'JSON',
  ),
];

class _FileTreeDemo extends StatefulWidget {
  const _FileTreeDemo();

  @override
  State<_FileTreeDemo> createState() => _FileTreeDemoState();
}

class _FileTreeDemoState extends State<_FileTreeDemo> {
  int _selected = 3;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final tree = _FileTree(
      selected: _selected,
      onSelect: (index) {
        if (!_fileNodes[index].folder) setState(() => _selected = index);
      },
    );
    final editor = _fileNodes[_selected].folder
        ? const SizedBox.shrink()
        : WashCodeEditorPane(
            code: _fileNodes[_selected].content,
            fileName: _fileNodes[_selected].name,
            languageLabel: _fileNodes[_selected].languageLabel,
            languageId: _fileNodes[_selected].language,
            bodyHeight: 356,
          );
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < 720) {
          return Column(
            children: [
              SizedBox(height: 260, child: tree),
              const SizedBox(height: 12),
              editor,
            ],
          );
        }
        return Container(
          height: 460,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.8)),
          ),
          clipBehavior: Clip.antiAlias,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              SizedBox(width: 280, child: tree),
              Container(
                width: 1,
                color: tokens.inkBorder.withValues(alpha: 0.7),
              ),
              Expanded(
                  child: Padding(
                      padding: const EdgeInsets.all(12), child: editor)),
            ],
          ),
        );
      },
    );
  }
}

class _FileTree extends StatelessWidget {
  const _FileTree({required this.selected, required this.onSelect});

  final int selected;
  final ValueChanged<int> onSelect;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      color: tokens.surfaceContainer.withValues(alpha: 0.35),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            height: 40,
            padding: const EdgeInsets.symmetric(horizontal: 12),
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: tokens.inkBorder.withValues(alpha: 0.6),
                ),
              ),
            ),
            child: Row(
              children: [
                const WashLucideIcon('folder-open', size: 14),
                const SizedBox(width: 8),
                Text(
                  'EXPLORER',
                  style: WashTypography.body(tokens.inkMuted).copyWith(
                    fontSize: 10,
                    letterSpacing: 0.8,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(vertical: 6),
              itemCount: _fileNodes.length,
              itemBuilder: (context, index) {
                final node = _fileNodes[index];
                final isSelected = index == selected && !node.folder;
                return MouseRegion(
                  cursor: node.folder
                      ? SystemMouseCursors.basic
                      : SystemMouseCursors.click,
                  child: GestureDetector(
                    onTap: () => onSelect(index),
                    child: Container(
                      color: isSelected
                          ? tokens.palette.primary.withValues(alpha: 0.12)
                          : null,
                      padding: EdgeInsets.fromLTRB(
                        12.0 + node.depth * 14,
                        7,
                        10,
                        7,
                      ),
                      child: Row(
                        children: [
                          WashLucideIcon(
                            node.folder ? 'chevron-down' : _fileIcon(node.name),
                            size: 13,
                            color: node.folder
                                ? tokens.inkMuted
                                : tokens.palette.primary,
                          ),
                          const SizedBox(width: 6),
                          Expanded(
                            child: Text(
                              node.name,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: WashTypography.body(
                                isSelected
                                    ? tokens.palette.primary
                                    : tokens.onSurface,
                              ).copyWith(
                                fontSize: 11.5,
                                fontFamily: 'MapleMono',
                                fontWeight: isSelected
                                    ? FontWeight.w600
                                    : FontWeight.w400,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  String _fileIcon(String name) {
    if (name.endsWith('.md')) return 'file-text';
    if (name.endsWith('.css')) return 'file-code';
    if (name.endsWith('.json')) return 'braces';
    return 'file-code';
  }
}

/* ------------------------------------------------------------ docs layout */

class _DocsLayoutDemo extends StatelessWidget {
  const _DocsLayoutDemo();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return LayoutBuilder(
      builder: (context, constraints) {
        final showToc = constraints.maxWidth >= 1080;
        return Container(
          height: 720,
          decoration: BoxDecoration(
            color: tokens.surface,
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.8)),
          ),
          clipBehavior: Clip.antiAlias,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _DocsSidebar(tokens: tokens),
              Container(
                width: 1,
                color: tokens.inkBorder.withValues(alpha: 0.7),
              ),
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(32, 28, 32, 40),
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 720),
                    child: _DocsArticle(tokens: tokens),
                  ),
                ),
              ),
              if (showToc) ...[
                Container(
                  width: 1,
                  color: tokens.inkBorder.withValues(alpha: 0.7),
                ),
                const _DocsToc(),
              ],
            ],
          ),
        );
      },
    );
  }
}

class _DocsSidebar extends StatelessWidget {
  const _DocsSidebar({required this.tokens});

  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 230,
      child: Container(
        color: tokens.surfaceContainer.withValues(alpha: 0.24),
        padding: const EdgeInsets.fromLTRB(16, 18, 16, 18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Container(
                  width: 28,
                  height: 28,
                  decoration: BoxDecoration(
                    color: tokens.palette.primary,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Center(
                    child: WashLucideIcon(
                      'droplets',
                      size: 15,
                      color: tokens.onPrimary,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  'Wash UI',
                  style: WashTypography.displayLarge(tokens.onSurface).copyWith(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Container(
              height: 34,
              padding: const EdgeInsets.symmetric(horizontal: 10),
              decoration: BoxDecoration(
                color: tokens.surface,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(
                  color: tokens.inkBorder.withValues(alpha: 0.7),
                ),
              ),
              child: Row(
                children: [
                  const WashLucideIcon('search', size: 13),
                  const SizedBox(width: 6),
                  Text(
                    'Search docs',
                    style: WashTypography.body(tokens.inkMuted).copyWith(
                      fontSize: 11.5,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            _GroupLabel(label: 'GETTING STARTED', tokens: tokens),
            const SizedBox(height: 6),
            for (final item in const [
              'Introduction',
              'Installation',
              'Project structure',
            ])
              _NavRow(label: item, tokens: tokens),
            const SizedBox(height: 16),
            _GroupLabel(label: 'GUIDES', tokens: tokens),
            const SizedBox(height: 6),
            for (final item in const [
              'Theming',
              'Tokens',
              'Customization',
            ])
              _NavRow(
                label: item,
                tokens: tokens,
                active: item == 'Theming',
              ),
            const SizedBox(height: 16),
            _GroupLabel(label: 'REFERENCE', tokens: tokens),
            const SizedBox(height: 6),
            for (final item in const ['Components', 'Assets', 'MCP server'])
              _NavRow(label: item, tokens: tokens),
          ],
        ),
      ),
    );
  }
}

class _GroupLabel extends StatelessWidget {
  const _GroupLabel({required this.label, required this.tokens});

  final String label;
  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    return Text(
      label,
      style: WashTypography.body(tokens.inkMuted).copyWith(
        fontSize: 9.5,
        letterSpacing: 0.9,
        fontWeight: FontWeight.w600,
      ),
    );
  }
}

class _NavRow extends StatelessWidget {
  const _NavRow(
      {required this.label, required this.tokens, this.active = false});

  final String label;
  final WashTokens tokens;
  final bool active;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 2),
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 6),
      decoration: BoxDecoration(
        color: active ? tokens.palette.primary.withValues(alpha: 0.12) : null,
        borderRadius: BorderRadius.circular(6),
      ),
      child: Text(
        label,
        style: WashTypography.body(
          active ? tokens.palette.primary : tokens.onSurface,
        ).copyWith(
          fontSize: 12,
          fontWeight: active ? FontWeight.w600 : FontWeight.w400,
        ),
      ),
    );
  }
}

class _DocsArticle extends StatelessWidget {
  const _DocsArticle({required this.tokens});

  final WashTokens tokens;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            for (final part in const ['Docs', 'Guides', 'Theming'])
              Padding(
                padding: const EdgeInsets.only(right: 6),
                child: Row(
                  children: [
                    Text(
                      part,
                      style: WashTypography.body(tokens.inkMuted).copyWith(
                        fontSize: 11,
                      ),
                    ),
                    if (part != 'Theming') ...[
                      const SizedBox(width: 6),
                      Text(
                        '/',
                        style: WashTypography.body(tokens.inkMuted).copyWith(
                          fontSize: 11,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
          ],
        ),
        const SizedBox(height: 10),
        Text(
          'Studio pigment tokens',
          style: WashTypography.displayLarge(tokens.onSurface).copyWith(
            fontSize: 30,
            fontWeight: FontWeight.w600,
            letterSpacing: -0.6,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Wash UI exposes pigments as semantic tokens. The chrome, panels, '
          'and charts all read the same paper palette, so a theme swap stays '
          'coherent across the app.',
          style: WashTypography.body(tokens.inkMuted).copyWith(
            fontSize: 14,
            height: 1.7,
          ),
        ),
        const SizedBox(height: 22),
        Text(
          'Semantic slots',
          style: WashTypography.displayLarge(tokens.onSurface).copyWith(
            fontSize: 20,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Each pigment resolves into base, primary, accent, and status slots. '
          'Components never hard-code raw colors; they ask the token layer.',
          style: WashTypography.body(tokens.onSurface).copyWith(
            fontSize: 13.5,
            height: 1.7,
          ),
        ),
        const SizedBox(height: 14),
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: tokens.surfaceContainer.withValues(alpha: 0.45),
            borderRadius: BorderRadius.circular(10),
            border: Border.all(
              color: tokens.inkBorder.withValues(alpha: 0.6),
            ),
          ),
          child: Text(
            'const palette = washPalette("mineral", WashThemeMode.light);\n'
            'palette.primary;  // pigment focus\n'
            'palette.base100;  // paper surface',
            style: WashTypography.body(tokens.onSurface).copyWith(
              fontSize: 12,
              fontFamily: 'MapleMono',
              height: 1.6,
            ),
          ),
        ),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.fromLTRB(14, 12, 14, 12),
          decoration: BoxDecoration(
            color: tokens.palette.primary.withValues(alpha: 0.07),
            borderRadius: BorderRadius.circular(10),
            border: Border(
              left: BorderSide(color: tokens.palette.primary, width: 3),
            ),
          ),
          child: Text(
            'Keep paper mode and pigment selection separate. The mode changes '
            'surface luminance; the pigment changes hue.',
            style: WashTypography.body(tokens.onSurface).copyWith(
              fontSize: 12.5,
              height: 1.6,
            ),
          ),
        ),
        const SizedBox(height: 20),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Expanded(
              child: _DocPager(label: 'Previous', title: 'Project structure'),
            ),
            const SizedBox(width: 16),
            const Expanded(
              child: _DocPager(
                label: 'Next',
                title: 'Design tokens',
                alignRight: true,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _DocPager extends StatelessWidget {
  const _DocPager({
    required this.label,
    required this.title,
    this.alignRight = false,
  });

  final String label;
  final String title;
  final bool alignRight;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Column(
      crossAxisAlignment:
          alignRight ? CrossAxisAlignment.end : CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: WashTypography.body(tokens.inkMuted).copyWith(
            fontSize: 9.5,
            letterSpacing: 0.8,
          ),
        ),
        const SizedBox(height: 3),
        Text(
          title,
          style: WashTypography.body(tokens.palette.primary).copyWith(
            fontSize: 12.5,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}

class _DocsToc extends StatelessWidget {
  const _DocsToc();

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return SizedBox(
      width: 180,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(18, 26, 18, 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'ON THIS PAGE',
              style: WashTypography.body(tokens.inkMuted).copyWith(
                fontSize: 9.5,
                letterSpacing: 0.9,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 10),
            for (final item in const [
              'Semantic slots',
              'Paper mode',
              'Pigment registry',
              'Persisting a theme',
            ])
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: Text(
                  item,
                  style: WashTypography.body(
                    item == 'Semantic slots'
                        ? tokens.palette.primary
                        : tokens.inkMuted,
                  ).copyWith(
                    fontSize: 11.5,
                    fontWeight: item == 'Semantic slots'
                        ? FontWeight.w600
                        : FontWeight.w400,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

/* ---------------------------------------------------------------- dialogs */

class _DialogDemo extends StatelessWidget {
  const _DialogDemo({required this.index});

  final int index;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final destructive = index <= 1;
    final notice = index >= 3;
    return Container(
      height: 360,
      decoration: BoxDecoration(
        color: tokens.surfaceContainer.withValues(alpha: 0.45),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.7)),
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 440),
          child: _CardShell(
            child: SizedBox(
              height: 308,
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _FeatureIcon(
                          icon: destructive
                              ? 'triangle-alert'
                              : notice
                                  ? 'circle-check'
                                  : 'pencil',
                          tone: destructive
                              ? tokens.palette.error
                              : notice
                                  ? tokens.palette.success
                                  : tokens.palette.primary,
                          size: 38,
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                destructive
                                    ? 'Delete pigment?'
                                    : notice
                                        ? 'Wash saved'
                                        : 'Edit pigment',
                                style: WashTypography.title(tokens.onSurface)
                                    .copyWith(
                                  fontSize: 19,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                destructive
                                    ? 'This removes the pigment and every saved theme that uses it. This cannot be undone.'
                                    : notice
                                        ? 'Your theme is stored locally. The gallery will keep this pigment on reload.'
                                        : 'Update the display name and pigment hex.',
                                style: WashTypography.body(tokens.inkMuted)
                                    .copyWith(
                                  fontSize: 12.5,
                                  height: 1.5,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    if (!destructive && !notice) ...[
                      const SizedBox(height: 16),
                      const WashInput(label: 'Name', hint: 'Mineral'),
                      const SizedBox(height: 10),
                      const WashInput(label: 'Hex', hint: '#3B6EA5'),
                    ],
                    const SizedBox(height: 18),
                    Wrap(
                      alignment: WrapAlignment.end,
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        if (!notice)
                          WashButton(
                            variant: WashButtonVariant.ghost,
                            label: 'Cancel',
                            onPressed: () {},
                          ),
                        WashButton(
                          variant: destructive
                              ? WashButtonVariant.error
                              : WashButtonVariant.primary,
                          label: destructive
                              ? 'Delete'
                              : notice
                                  ? 'OK'
                                  : 'Save changes',
                          onPressed: () {},
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/* ----------------------------------------------------------------- common */

class _CardShell extends StatelessWidget {
  const _CardShell({required this.child}) : maxWidth = null;

  final Widget child;
  final double? maxWidth;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: tokens.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.8)),
        boxShadow: [
          BoxShadow(
            color: tokens.onSurface.withValues(alpha: 0.08),
            blurRadius: 24,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: child,
    );
  }
}

class _FeatureIcon extends StatelessWidget {
  const _FeatureIcon({required this.icon, this.tone, this.size = 48});

  final String icon;
  final Color? tone;
  final double size;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    final color = tone ?? tokens.palette.primary;
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(size * 0.3),
        border: Border.all(color: color.withValues(alpha: 0.24)),
      ),
      child: Center(
        child: WashLucideIcon(icon, size: size * 0.46, color: color),
      ),
    );
  }
}

class _TextLink extends StatelessWidget {
  const _TextLink({required this.label, required this.onTap, this.icon});

  final String label;
  final VoidCallback onTap;
  final String? icon;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onTap,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (icon != null) ...[
              WashLucideIcon(icon!, size: 13, color: tokens.palette.primary),
              const SizedBox(width: 5),
            ],
            Flexible(
              child: Text(
                label,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: WashTypography.body(tokens.palette.primary).copyWith(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SoftNote extends StatelessWidget {
  const _SoftNote({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) {
    final tokens = WashTokens.of(context);
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: tokens.surfaceContainer.withValues(alpha: 0.45),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: tokens.inkBorder.withValues(alpha: 0.6)),
      ),
      child: Text(
        text,
        style: WashTypography.body(tokens.inkMuted).copyWith(
          fontSize: 11.5,
          height: 1.5,
        ),
      ),
    );
  }
}


class _DashedLine extends StatelessWidget {
  const _DashedLine({required this.color});

  final Color color;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final count = (constraints.maxWidth / 6).floor();
        return Row(
          children: [
            for (var i = 0; i < count; i++)
              Container(
                width: 3,
                height: 1,
                margin: const EdgeInsets.only(right: 3),
                color: color,
              ),
          ],
        );
      },
    );
  }
}
