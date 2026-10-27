---
name: adapting-typescript-for-rhino
description: 配置 TypeScript 声明、静态检查和编译产物以供 M8Test Rhino 执行时使用；不代替 Rhino 运行时验证。
---

# 为 Rhino 适配 TypeScript

TypeScript 源码会编译/转换成 JavaScript 后交给 Rhino。JVM 类访问与运行时转换遵循共享 `accessing-jvm-from-rhino`；本技能只处理 TypeScript 静态层和本模板的构建转换。

- 检查当前 `tsconfig`、模板编译器和生成目录，确认实际输出送入运行时的 JavaScript。
- TypeScript 编译器可能不知道 Rhino 提供的 `Packages` 全局对象。需要静态检查时通过项目声明或源码类型声明描述它；声明不能在运行时创建或替代 Rhino 对象。
- 修改类型声明时检查它与真实宿主/Extension 签名及当前版本一致；不要把宽泛 `any` 的编译成功当成 JVM 调用正确。
- 单独验证 TypeScript 编译诊断和 Rhino 执行。当前项目检查具体 TS 源码可使用 `./node_modules/.bin/tsc --noEmit`；设备端 Test Control 才能证明编译后 JavaScript 的运行时行为。
- 调试时分别检查 TS 作者源码、编译/打包后的 JS 和 Rhino 结果，定位错误发生在哪一层。
