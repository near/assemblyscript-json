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

    setUint8Array(name: string, value: Uint8Array): void {
        assert(false, "Not implemented");
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
        // TODO: Implement encoding
        this.write('"');
        this.write(str);
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

    static shouldMultipleKeys(): bool {
        return this.roundripTest('{"str":"foo","bar":"baz"}');
    }

    static shouldHandleNestedObjects(): bool {
        return this.roundripTest('{"str":"foo","obj":{"a":1,"b":-123456}}');
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