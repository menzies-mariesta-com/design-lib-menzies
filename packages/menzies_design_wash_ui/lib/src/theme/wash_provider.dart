import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../foundation/reduced_motion.dart';
import '../tokens/wash_tokens.dart';
import 'wash_theme.dart';

class WashScope extends InheritedWidget {
  const WashScope({
    required this.pigmentId,
    required this.mode,
    required this.setPigment,
    required this.setMode,
    required super.child,
    super.key,
  });

  final String pigmentId;
  final WashThemeMode mode;
  final ValueChanged<String> setPigment;
  final ValueChanged<WashThemeMode> setMode;

  static WashScope of(BuildContext context) {
    final scope = context.dependOnInheritedWidgetOfExactType<WashScope>();
    assert(scope != null, 'Missing WashProvider');
    return scope!;
  }

  @override
  bool updateShouldNotify(WashScope oldWidget) =>
      pigmentId != oldWidget.pigmentId || mode != oldWidget.mode;
}

class WashProvider extends StatefulWidget {
  const WashProvider({
    required this.child,
    this.defaultPigment = 'mineral',
    this.defaultMode = WashThemeMode.light,
    super.key,
  });

  final Widget child;
  final String defaultPigment;
  final WashThemeMode defaultMode;

  @override
  State<WashProvider> createState() => _WashProviderState();
}

class _WashProviderState extends State<WashProvider> {
  late String _pigment;
  late WashThemeMode _mode;

  @override
  void initState() {
    super.initState();
    _pigment = widget.defaultPigment;
    _mode = widget.defaultMode;
    _loadPrefs();
  }

  Future<void> _loadPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    final storedPigment = prefs.getString(kWashThemeStorageKey);
    final storedMode = prefs.getString(kWashModeStorageKey);
    if (storedPigment != null && kWashPigmentIds.contains(storedPigment)) {
      _pigment = storedPigment;
    }
    if (storedMode == 'dark') {
      _mode = WashThemeMode.dark;
    } else if (storedMode == 'light') {
      _mode = WashThemeMode.light;
    }
    if (mounted) setState(() {});
  }

  Future<void> _persist() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(kWashThemeStorageKey, _pigment);
    await prefs.setString(
      kWashModeStorageKey,
      _mode == WashThemeMode.dark ? 'dark' : 'light',
    );
  }

  @override
  Widget build(BuildContext context) {
    final tokens = buildWashTokens(pigmentId: _pigment, mode: _mode);
    return WashScope(
      pigmentId: _pigment,
      mode: _mode,
      setPigment: (id) {
        if (!kWashPigmentIds.contains(id)) return;
        setState(() => _pigment = id);
        _persist();
      },
      setMode: (m) {
        setState(() => _mode = m);
        _persist();
      },
      child: WashThemeScope(
        tokens: tokens,
        child: widget.child,
      ),
    );
  }
}
