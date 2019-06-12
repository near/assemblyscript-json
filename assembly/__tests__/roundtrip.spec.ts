import { JSONDecoder } from "../decoder";
import { JSONEncoder } from "../encoder";

let handler: JSONEncoder;
let decoder: JSONDecoder<JSONEncoder>;

function roundripTest(jsonString: string, expectedString: string | null = null): bool {
    log<string>("--------" + jsonString + (expectedString ? " " + expectedString! : ""));
    expectedString = expectedString || jsonString;
    let buffer: Uint8Array = new Uint8Array(jsonString.lengthUTF8);
    let utf8ptr = jsonString.toUTF8();
    memory.copy(<usize>buffer.buffer, utf8ptr, buffer.byteLength);
    decoder.deserialize(buffer);
    let resultBuffer = handler.serialize();
    let resultString = String.fromUTF8(
        <usize>resultBuffer.buffer + resultBuffer.byteOffset,
        resultBuffer.length
    );
    assert(expectedString != null);
    if (expectedString) {
        expect<string>(resultString).toStrictEqual(expectedString);
        expect<string>(handler.toString()).toStrictEqual(expectedString);
    }

    return true;
}

describe("Round trip", () => {

    beforeEach(() => {
        handler = new JSONEncoder();
        decoder = new JSONDecoder<JSONEncoder>(handler);
    });


    it("create decoder", () => {
        expect<bool>(decoder != null).toBe(true);
    });

    it("should handle empty object", () => {
        expect<bool>(roundripTest("{}")).toBe(true);
    });

    it("should handle empty object with whitespace", () => {
        expect<bool>(roundripTest("{ }", "{}")).toBe(true);
    });

    it("should handle int32", () => {
        expect<bool>(roundripTest('{"int":4660}')).toBe(true);
    });

    it("should handle int32Sign", () => {
        expect<bool>(roundripTest('{"int":-4660}')).toBe(true)
    })

    it("should handle true", () => {
        expect<bool>(roundripTest('{"val":true}')).toBe(true)
    })

    it("should handle false", () => {
        expect<bool>(roundripTest('{"val":false}')).toBe(true)
    })

    it("should handle null", () => {
        expect<bool>(roundripTest('{"val":null}')).toBe(true)
    })

    it("should handle string", () => {
        expect<bool>(roundripTest('{"str":"foo"}')).toBe(true)
    })

    it("should handle string escaped", () => {
        expect<bool>(roundripTest('"\\"\\\\\\/\\n\\t\\b\\r\\t"', '"\\"\\\\/\\n\\t\\b\\r\\t"')).toBe(true)
    })

    it("should handle string unicode escaped simple", () => {
        expect<bool>(roundripTest('"\\u0022"', '"\\""')).toBe(true)
    })

    it("should handle string unicode escaped", () => {
        expect<bool>(roundripTest('"\\u041f\\u043e\\u043b\\u0442\\u043e\\u0440\\u0430 \\u0417\\u0435\\u043c\\u043b\\u0435\\u043a\\u043e\\u043f\\u0430"', '"Полтора Землекопа"')).toBe(true)
    })

    it("should multiple keys", () => {
        expect<bool>(roundripTest('{"str":"foo","bar":"baz"}')).toBe(true)
    })

    it("should handle nested objects", () => {
        expect<bool>(roundripTest('{"str":"foo","obj":{"a":1,"b":-123456}}')).toBe(true)
    })

    it("should handle empty array", () => {
        expect<bool>(roundripTest('[]')).toBe(true)
    })

    it("should handle array", () => {
        expect<bool>(roundripTest('[1,2,3]')).toBe(true)
    })

    it("should handle nested arrays", () => {
        expect<bool>(roundripTest('[[1,2,3],[4,[5,6]]]')).toBe(true)
    })

    it("should handle nested objects and arrays", () => {
        expect<bool>(roundripTest('{"str":"foo","arr":[{"obj":{"a":1,"b":-123456}}]}')).toBe(true)
    })

    it("should handle whitespace", () => {
        expect<bool>(roundripTest(
            ' { "str":"foo","obj": {"a":1, "b" :\n -123456} } ',
            '{"str":"foo","obj":{"a":1,"b":-123456}}')).toBe(true);
    });
})
