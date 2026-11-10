# TypeScript 模板脚本项目 i18n

Status: resolved

## Problem Statement

TypeScript 模板入口 UI 只有固定中文文案，项目显示名称只有单一默认值。Development Kit 切换语言后示例仍显示中文，也无法从运行页面判断脚本使用哪个语言模板。

## Solution

在 TypeScript 模板资源目录提供英文和中文 BCP 47 catalogs。入口 TypeScript 代码通过生成的 `$stringResources` 全局变量获取计数标签、按钮文案和完整的 TypeScript 语言标识。中文目录翻译项目名称和描述，英文名称继续由 `appName` 配置。README 说明资源目录、locale 行为和 API。

## Requirements

1. `typescript/res/strings/en.json` 与 `zh.json` 提供计数标签、按钮、语言标识和项目描述。
2. 只有中文 catalog 提供 `m8test.project.name`，以保留英文 `projectConfig.name` 默认值和 `-PappName` 覆盖。
3. 主 UI 的示例文案都经 `$stringResources.getString(key)` 获取，并在按钮下方显示 `Script language: TypeScript` / `脚本语言：TypeScript`。
4. README 说明 BCP 47 catalogs、资源复制到 `build/project/res/strings`、宿主 locale 跟随行为及 metadata 键。
5. 保持计数器、side scripts、事件载荷和 TypeScript 到 Rhino JavaScript 的运行行为不变。

## Testing Decisions

- `generateJavascriptGlobalVariables` 确认 TypeScript 模板可用的全局变量名称为 `$stringResources`。
- 使用实际 `rerunJavascript` 任务在 `192.168.31.207:5555` 下分别验证英文和 `zh-Hans-CN` UI、计数交互及语言标识。
- 检查编译/转换后的 `build/project/src/com/example/script/primary.js` 使用 `$stringResources`，且 `build/project/res/strings` 与源 catalogs 一致。
- 保存中英文设备截图，测试后恢复 Development Kit 跟随系统 locale。

## Out of Scope

不修改宿主、Gradle 插件、其他模板、side scripts 或 README 文档语言。
