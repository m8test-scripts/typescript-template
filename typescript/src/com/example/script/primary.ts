// 引入 ToolB 类，相对于 src 目录的路径
import ToolB = require('com/example/tool/ToolB');

// 创建 ToolB 实例
const toolBInstance = new ToolB();
// 调用 methodB 方法
toolBInstance.methodB($logger);

// UI 构建部分
// 注意：由于 slot, column 等参数在原 JS 中没有 JSDoc 类型，这里暂时使用 any。
// 如果你有对应的 Java/Kotlin 类定义，可以将 any 替换为具体的 Packages... 类型
$composeView.create((slot) => {
    // 1. 创建一个状态，指定泛型为 number
    let state = slot.remember(() => slot.mutableStateOf(0));
    // 创建一个垂直布局
    slot.Column((column) => {
        // 设置垂直布局修饰器
        column.setModifier((m) => {
            // 设置垂直布局填充满屏幕
            return m.fillMaxSize(1.0);
        });
        // 水平居中对齐元素
        column.setHorizontalAlignment((alignments) => { return alignments.getCenterHorizontally(); });
        // 垂直居中排列元素
        column.setVerticalArrangement((arrangements) => { return arrangements.getCenter(); });

        column.setContent((columnSlot) => {
            columnSlot.Text((text) => {
                // 使用状态值设置文本内容；读取状态时 Compose 会自动追踪重组
                text.setText($stringResources.getString("demo.counter.label") + state.getValue());
            });
            columnSlot.TextButton((button) => {
                // 设置按钮显示的内容
                button.setContent((buttonSlot) => {
                    // 设置按钮文本
                    buttonSlot.Text((text) => {
                        text.setText($stringResources.getString("demo.counter.button"));
                    });
                });
                button.onClick(() => {
                    // 4. 点击按钮时，更新状态值
                    state.setValue(state.getValue() + 1);
                });
            });
            columnSlot.Text((text) => {
                text.setText($stringResources.getString("demo.language"));
            });
        });
    });
});

// 启动 android 活动用于展示脚本UI
$activity.start();
