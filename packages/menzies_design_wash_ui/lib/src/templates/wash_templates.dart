import 'package:flutter/painting.dart';
import 'package:flutter/widgets.dart';

import '../foundation/wash_icon.dart';
import '../components/bottom_sheet/wash_bottom_sheet.dart';
import '../foundation/wash_modal_scope.dart';
import '../foundation/wash_primitives.dart';
import '../widgets/wash_button.dart';
import '../widgets/wash_catalog.dart';
import '../widgets/wash_data_table.dart';
import '../widgets/wash_feedback.dart';
import '../widgets/wash_form_fields.dart';
import '../studio/wash_code_highlighter.dart';

class WashAuthScreenTemplate extends StatelessWidget {
  const WashAuthScreenTemplate({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 400),
        child: WashPlateCard(
          title: 'Sign in',
          child: Column(
            children: [
              const WashInput(label: 'Email'),
              const SizedBox(height: 12),
              const WashInput(label: 'Password', obscureText: true),
              const SizedBox(height: 16),
              WashButton(label: 'Continue', block: true, onPressed: () {}),
            ],
          ),
        ),
      ),
    );
  }
}

class WashTwoFactorTemplate extends StatelessWidget {
  const WashTwoFactorTemplate({super.key});
  @override
  Widget build(BuildContext context) {
    return WashPlateCard(
      title: 'Two-factor authentication',
      child: WashOtpField(length: 6, onCompleted: (_) {}),
    );
  }
}

class WashForgotPasswordTemplate extends StatelessWidget {
  const WashForgotPasswordTemplate({super.key});
  @override
  Widget build(BuildContext context) {
    return WashPlateCard(
      title: 'Reset password',
      child: Column(
        children: [
          const WashInput(label: 'Email'),
          const SizedBox(height: 12),
          WashButton(label: 'Send link', onPressed: () {}),
        ],
      ),
    );
  }
}

class WashOtpTemplate extends StatelessWidget {
  const WashOtpTemplate({super.key});
  @override
  Widget build(BuildContext context) {
    return WashPlateCard(
      title: 'Enter verification code',
      child: WashOtpField(length: 6, onCompleted: (_) {}),
    );
  }
}

class WashCheckoutTemplate extends StatelessWidget {
  const WashCheckoutTemplate({super.key});
  @override
  Widget build(BuildContext context) {
    return WashPlateCard(
      title: 'Checkout',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const WashInput(label: 'Card number'),
          WashButton(label: 'Pay', block: true, onPressed: () {}),
        ],
      ),
    );
  }
}

class WashPaymentTemplate extends StatelessWidget {
  const WashPaymentTemplate({super.key});
  @override
  Widget build(BuildContext context) => const WashCheckoutTemplate();
}

class WashTerminalLogTemplate extends StatelessWidget {
  const WashTerminalLogTemplate({super.key});
  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xDE000000),
      padding: const EdgeInsets.all(12),
      child: const Text(
        r'$ wash run build\n✓ Built in 4.2s',
        style: TextStyle(fontFamily: 'monospace', color: Color(0xFF22C55E), fontSize: 12),
      ),
    );
  }
}

class WashRichTextTemplate extends StatelessWidget {
  const WashRichTextTemplate({super.key});
  @override
  Widget build(BuildContext context) {
    return const WashTextarea(label: 'Rich text (toolbar coming soon)');
  }
}

class WashCodeEditorView extends StatelessWidget {
  const WashCodeEditorView({this.language = 'dart', super.key});
  final String language;

  @override
  Widget build(BuildContext context) {
    const sample = 'void main() {\n  print("Wash");\n}';
    return Container(
      color: const Color(0xFF1e1e1e),
      padding: const EdgeInsets.all(8),
      child: RichText(text: WashCodeHighlighter.highlight(sample, language: language)),
    );
  }
}

class WashFileTreeTemplate extends StatelessWidget {
  const WashFileTreeTemplate({super.key});
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        WashListTile(leading: WashIcon(WashIconGlyph.more), title: Text('lib')),
        Padding(
          padding: EdgeInsets.only(left: 24),
          child: WashListTile(leading: WashIcon(WashIconGlyph.more), title: Text('main.dart')),
        ),
      ],
    );
  }
}

class WashDocsLayoutTemplate extends StatelessWidget {
  const WashDocsLayoutTemplate({super.key});
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const SizedBox(
          width: 200,
          child: Column(
            children: [
              WashListTile(title: Text('Getting started')),
              WashListTile(title: Text('Theming')),
            ],
          ),
        ),
        const SizedBox(width: 1, child: ColoredBox(color: Color(0x22000000))),
        const Expanded(
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Text('Documentation content'),
          ),
        ),
      ],
    );
  }
}

class WashDialogTemplate extends StatelessWidget {
  const WashDialogTemplate({super.key});
  @override
  Widget build(BuildContext context) {
    return WashButton(
      label: 'Open dialog',
      onPressed: () {
        showWashDialog<void>(
          context: context,
          builder: (ctx) => WashModalBox(
            dialogStyle: true,
            child: WashDialog(
              title: 'Confirm',
              body: const Text('Proceed with this action?'),
              actions: [
                WashButton(
                  label: 'Cancel',
                  variant: WashButtonVariant.ghost,
                  onPressed: () => WashModalCloseScope.maybeCloseOf(ctx)?.call(),
                ),
                WashButton(
                  label: 'OK',
                  onPressed: () => WashModalCloseScope.maybeCloseOf(ctx)?.call(),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class WashDataTableTemplate extends StatelessWidget {
  const WashDataTableTemplate({super.key});
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 320,
      child: WashDataTable(
        columns: const [
          WashDataColumn(label: 'Name'),
          WashDataColumn(label: 'Status'),
        ],
        rows: List.generate(20, (i) => WashDataRow(cells: ['Item $i', 'Active'])),
      ),
    );
  }
}

class WashCalendarTemplate extends StatelessWidget {
  const WashCalendarTemplate({super.key});
  @override
  Widget build(BuildContext context) {
    return const WashPlateCard(title: 'Calendar', child: Text('Date picker (native port WIP)'));
  }
}
