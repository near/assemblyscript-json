import "allocator/arena";

import { JSONDecoder, JSONHandler } from "../../assembly/decoder";

declare function logStr(str: string): void;
declare function logF64(val: f64): void;

class JSONTestHandler extends JSONHandler {
    isFirstKey: boolean = true
    inObject: Array<boolean> = [false]
    result: string = ""

    setString(name: string, value: string): void {
        this.writeKey(name);
        this.writeString(value);
    }

    setBoolean(name: string, value: bool): void {
        this.writeKey(name);
        this.writeBoolean(value);
    }

    setNull(name: string): void {
        this.writeKey(name);
        this.write("null");
    }

    setInteger(name: string, value: i32): void {
        this.writeKey(name);
        this.writeInteger(value);
    }

    pushArray(name: string): bool {
        this.writeKey(name);
        this.write("[");
        this.isFirstKey = true
        this.inObject.push(false);
        return true;
    }

    popArray(): void {
        this.write("]");
    }

    pushObject(name: string): bool {
        this.writeKey(name);
        this.write("{");
        this.isFirstKey = true
        this.inObject.push(true);
        return true;
    }

    popObject(): void {
        this.write("}");
    }

    private writeKey(str: string): void {
        if (!this.isFirstKey ) {
            this.write(",");
        } else {
            this.isFirstKey = false;
        }
        if (str != null) {
            this.writeString(str);
            this.write(":");
        }
    }

    private writeString(str: string): void {
        this.write('"');
        let savedIndex = 0;
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            let needsEscaping = char < 0x20 || char == '"'.charCodeAt(0) || char == '\\'.charCodeAt(0);
            if (needsEscaping) {
                this.write(str.substring(savedIndex, i));
                savedIndex = i + 1;
                if (char == '"'.charCodeAt(0)) {
                    this.write('\\"');
                } else if (char == "\\".charCodeAt(0)) {
                    this.write("\\\\");
                } else if (char == "\b".charCodeAt(0)) {
                    this.write("\\b");
                } else if (char == "\n".charCodeAt(0)) {
                    this.write("\\n");
                } else if (char == "\r".charCodeAt(0)) {
                    this.write("\\r");
                } else if (char == "\t".charCodeAt(0)) {
                    this.write("\\t");
                } else {
                    // TODO: Implement encoding for other contol characters
                    assert(false, "Unsupported control chracter");
                }
            }
        }
        this.write(str.substring(savedIndex, str.length));
        this.write('"');
    }

    private writeBoolean(value: bool): void {
        this.write(value ? "true" : "false");
    }

    private writeInteger(value: i32): void {
        // TODO: More efficient encoding
        let arr: Array<i32> = [value];
        this.write(arr.toString());
    }

    private write(str: string): void {
        this.result += str;
    }
}


export class StringConversionTests {
    private static handler : JSONTestHandler = new JSONTestHandler();

    static setUp(): void {
        this.handler = new JSONTestHandler();
    }

    static createDecoder(): JSONDecoder<JSONTestHandler> {
        return new JSONDecoder(this.handler);
    }

    static shouldHandleEmptyObject(): bool {
        return this.roundripTest("{}");
    }

    static shouldHandleEmptyObjectWithWhitespace(): bool {
        return this.roundripTest("{ }", "{}");
    }

    static shouldHandleInt32(): bool {
        return this.roundripTest('{"int":4660}');
    }

    static shouldHandleInt32Sign(): bool {
        return this.roundripTest('{"int":-4660}');
    }

    static shouldHandleTrue(): bool {
        return this.roundripTest('{"val":true}');
    }

    static shouldHandleFalse(): bool {
        return this.roundripTest('{"val":false}');
    }

    static shouldHandleNull(): bool {
        return this.roundripTest('{"val":null}');
    }

    static shouldHandleString(): bool {
        return this.roundripTest('{"str":"foo"}');
    }

    static shouldHandleStringEscaped(): bool {
        return this.roundripTest('"\\"\\\\\\/\\n\\t\\b\\r\\t"', '"\\"\\\\/\\n\\t\\b\\r\\t"');
    }

    static shouldHandleStringUnicodeEscaped1(): bool {
        return this.roundripTest('"\\u0022"', '"\\""');
    }

    static shouldHandleStringUnicodeEscaped2(): bool {
        return this.roundripTest('"\u041f\u043e\u043b\u0442\u043e\u0440\u0430 \u0417\u0435\u043c\u043b\u0435\u043a\u043e\u043f\u0430"', '"Полтора Землекопа"');
    }

    static shouldMultipleKeys(): bool {
        return this.roundripTest('{"str":"foo","bar":"baz"}');
    }

    static shouldHandleNestedObjects(): bool {
        return this.roundripTest('{"str":"foo","obj":{"a":1,"b":-123456}}');
    }

    static shouldHandleEmptyArray(): bool {
        return this.roundripTest('[]');
    }

    static shouldHandleArray(): bool {
        return this.roundripTest('[1,2,3]');
    }

    static shouldHandleNestedArrays(): bool {
        return this.roundripTest('[[1,2,3],[4,[5,6]]]');
    }

    static shouldHandleNestedObjectsAndArrays(): bool {
        return this.roundripTest('{"str":"foo","arr":[{"obj":{"a":1,"b":-123456}}]}');
    }

    static shouldHandleWhitespace(): bool {
        return this.roundripTest(
            ' { "str":"foo","obj": {"a":1, "b" :\n -123456} } ',
            '{"str":"foo","obj":{"a":1,"b":-123456}}');
    }

    private static roundripTest(jsonString: string, expectedString: string = null): bool {
        expectedString = expectedString || jsonString;
        logStr("----------------- " + jsonString );
        let buffer: Uint8Array = new Uint8Array(jsonString.lengthUTF8);
        let utf8ptr = jsonString.toUTF8();
        // TODO: std should expose memcpy?
        for (let i = 0; i < buffer.length; i++) {
            buffer[i] = load<u8>(utf8ptr + i);
        }
        this.createDecoder().deserialize(buffer);
        assert(this.handler.result == expectedString,
            "Expected:\n" + expectedString + "\n" + "Actual:\n" + this.handler.result);
        return true;
    }
}

function bytes2array(typedArr: Uint8Array): Array<u8> {
    let arr = new Array<u8>();
    for (let i = 0; i < typedArr.length; i++) {
        arr.push(typedArr[i]);
    }
    return arr;
}

function hex2bin(hex: string): Uint8Array {
    let bin = new Uint8Array(hex.length >>> 1);
    for (let i = 0, len = hex.length >>> 1; i < len; i++) {
        bin[i] = u32(parseInt(hex.substr(i << 1, 2), 16));
    }
    return bin;
}