import { JSONDecoder } from "../decoder";
import { JSONEncoder } from "../encoder";

let handler: JSONEncoder;
let decoder: JSONDecoder<JSONEncoder>;

function roundripTest(jsonString: string, expectedString: string | null = null): bool {
  log<string>("--------" + jsonString + (expectedString ? " " + expectedString : ""));
  expectedString = expectedString || jsonString;
  let buffer: Uint8Array = new Uint8Array(jsonString.lengthUTF8);
  let utf8ptr = jsonString.toUTF8();
  memory.copy(buffer.buffer.data, utf8ptr, buffer.byteLength);
  decoder.deserialize(buffer);
  let resultBuffer = handler.serialize();
  let resultString = String.fromUTF8(
    resultBuffer.buffer.data,
    resultBuffer.length
  );
  expect<string>(resultString).toStrictEqual(expectedString);
  expect<string>(handler.toString()).toStrictEqual(expectedString);
  return true;
}

describe("Round trip", () => {

  beforeEach(() => {
    handler = new JSONEncoder();
    decoder = new JSONDecoder<JSONEncoder>(handler);
  });


  it("create Decoder", () => {
    expect<bool>(decoder != null).toBe(true)
  });

  it("should Handle Empty Object", () => {
    expect<bool>(roundripTest("{}")).toBe(true);
  })

  it("should Handle Empty Object With Whitespace", () => {
    expect<bool>(roundripTest("{ }", "{}")).toBe(true)
  })

  it("should Handle Int32", () => {
    expect<bool>(roundripTest('{"int":4660}')).toBe(true)
  })

  it("should Handle Int32Sign", () => {
    expect<bool>(roundripTest('{"int":-4660}')).toBe(true)
  })

  it("should Handle True", () => {
    expect<bool>(roundripTest('{"val":true}')).toBe(true)
  })

  it("should Handle False", () => {
    expect<bool>(roundripTest('{"val":false}')).toBe(true)
  })

  it("should Handle Null", () => {
    expect<bool>(roundripTest('{"val":null}')).toBe(true)
  })

  it("should Handle String", () => {
    expect<bool>(roundripTest('{"str":"foo"}')).toBe(true)
  })

  it("should Handle String Escaped", () => {
    expect<bool>(roundripTest('"\\"\\\\\\/\\n\\t\\b\\r\\t"', '"\\"\\\\/\\n\\t\\b\\r\\t"')).toBe(true)
  })

  it("should Handle String Unicode Escaped1", () => {
    expect<bool>(roundripTest('"\\u0022"', '"\\""')).toBe(true)
  })

  it("should Handle String Unicode Escaped2", () => {
    expect<bool>(roundripTest('"\\u041f\\u043e\\u043b\\u0442\\u043e\\u0440\\u0430 \\u0417\\u0435\\u043c\\u043b\\u0435\\u043a\\u043e\\u043f\\u0430"', '"Полтора Землекопа"')).toBe(true)
  })

  it("should Multiple Keys", () => {
    expect<bool>(roundripTest('{"str":"foo","bar":"baz"}')).toBe(true)
  })

  it("should Handle Nested Objects", () => {
    expect<bool>(roundripTest('{"str":"foo","obj":{"a":1,"b":-123456}}')).toBe(true)
  })

  it("should Handle Empty Array", () => {
    expect<bool>(roundripTest('[]')).toBe(true)
  })

  it("should Handle Array", () => {
    expect<bool>(roundripTest('[1,2,3]')).toBe(true)
  })

  it("should Handle Nested Arrays", () => {
    expect<bool>(roundripTest('[[1,2,3],[4,[5,6]]]')).toBe(true)
  })

  it("should Handle Nested Objects And Arrays", () => {
    expect<bool>(roundripTest('{"str":"foo","arr":[{"obj":{"a":1,"b":-123456}}]}')).toBe(true)
  })

  it("should Handle Whitespace", () => {
    expect<bool>(roundripTest(
      ' { "str":"foo","obj": {"a":1, "b" :\n -123456} } ',
      '{"str":"foo","obj":{"a":1,"b":-123456}}')).toBe(true);
  });
})
