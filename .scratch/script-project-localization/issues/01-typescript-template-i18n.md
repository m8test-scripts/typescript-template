# 01: TypeScript 模板展示双语脚本项目

**What to build:** TypeScript 模板随 Development Kit 宿主语言切换 metadata 和入口 UI，并在页面显示 TypeScript 语言标识。

**Blocked by:** None.

**Status:** resolved

- [x] 在 `typescript/res/strings/` 添加英文和中文 catalogs，覆盖项目描述、计数标签、按钮和语言标识；只在中文目录覆盖项目名称。
- [x] 入口 UI 通过 `$stringResources.getString(key)` 获取文案，并在按钮下方显示语言标识。
- [x] README 记录 catalogs、locale、API 和 metadata 键。
- [x] `rerunJavascript` 在 `.207` 英文和中文 locale 下均退出码为 0；UI 文案与语言标识正确，计数按钮正常，生成 JS 和 catalogs 与源文件一致。

## Answer

TypeScript 模板现在从 `typescript/res/strings/` 提供英文和中文 catalogs，入口 TypeScript 通过 `$stringResources` 本地化计数标签、按钮和按钮下方的语言标识；中文 catalog 覆盖项目名称并翻译描述。`generateJavascriptGlobalVariables` 确认全局名称为 `$stringResources`。`rerunJavascript` 在英文和 `zh-Hans-CN` 下均退出码为 0；页面截图显示了两种语言，中文按钮点击后计数从 0 变为 1。生成的 JavaScript 和资源文件与预期一致。截图：`/tmp/m8test-typescript-en.png`、`/tmp/m8test-typescript-zh.png`、`/tmp/m8test-typescript-zh-counted.png`。验证后 Development Kit locale 已恢复为空覆盖，继续跟随设备 `zh-Hans-CN`。
