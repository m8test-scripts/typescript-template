// @ts-nocheck
const StringBuilder = Packages.java.lang.StringBuilder;
const builder = new StringBuilder("M8Test");
builder.append(" TypeScript");
if (String(builder.toString()) !== "M8Test TypeScript") throw new Error("JVM StringBuilder");
const raw = $arrays.intArrayOf(3, 1, 2);
const values = $objectWrappers.wrapIntArray(raw);
if (values.getSize() !== 3) throw new Error("wrapped size");
values.set(0, 7);
if (!values.contains(7)) throw new Error("wrapped array");
let callbackCalled = false;
$logger.withContext(context => { callbackCalled = context !== null; });
if (!callbackCalled) throw new Error("Kotlin function callback");
const items = $iterables.listOf("first", "second");
if (String(items.get(1)) !== "second") throw new Error("host List factory");
$logger.info("typescript-template-jvm-interop:passed");
