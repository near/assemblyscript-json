import "allocator/arena";

import { JSONDecoder } from "../../assembly/decoder";
import { JSONEncoder } from "../../assembly/encoder";

declare function logStr(str: string): void;
declare function logF64(val: f64): void;

export class StringConversionTests {
    private static handler : JSONEncoder = null;

    static setUp(): void {
        this.handler = new JSONEncoder();
    }

    static createDecoder(): JSONDecoder<JSONEncoder> {
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
        let resultBuffer = this.handler.serialize();
        let resultString = String.fromUTF8(resultBuffer.buffer.data, resultBuffer.length);
        assert(resultString == expectedString,
            "Expected:\n" + expectedString + "\n" + "Actual:\n" + resultString)
        return true;
    }
}