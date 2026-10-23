# 01: Adopt self-contained APK defaults for TypeScript

**What to build:** This template produces an APK that includes the Runtime Extensions its script declares by default, and explains how the author can explicitly choose runtime dependency delivery instead.

**Blocked by:** 01: Expose default-on APK Extension bundling.

**Status:** resolved

- [x] The template uses the default-on APK bundling behavior without forcing bundling for ordinary project runs.
- [x] The template documentation explains that default APKs can run offline and documents the explicit opt-out trade-off.
- [x] Generated build source preserves the default behavior for this language.
- [x] An opt-out configuration for this template omits bundled Extension APKs while retaining runtime dependency declarations.
- [x] Template build verification confirms the produced APK contains only this script's declared Extension dependencies.

## Comments

- `:typescript:buildJavascriptApk` passed with default bundling and with `bundleExtensions = false` on 2026-10-23. The opt-out SPA contained no bundled APKs and retained the Compose declaration in `project.config.json`.
- A fresh-installed APK ran with app networking denied. The script's Compose UI responded to a tap, and the bundled APK was present in the application's private Extension store.
