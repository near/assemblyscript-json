import { JSONDecoder } from "../decoder";
import { JSONEncoder } from "../encoder";
import { Buffer } from "../util";
import * as JSON from "../JSON";

function roundtripTest(jsonString: string, _expectedString: string = ""): void {
  const expectedString = _expectedString == "" ? jsonString : _expectedString;
  let buffer: Uint8Array = Buffer.fromString(jsonString);
  let handler = new JSONEncoder();
  let decoder = new JSONDecoder<JSONEncoder>(handler);

  decoder.deserialize(buffer, null);

  let resultBuffer = handler.serialize();
  let resultString: string = Buffer.toString(resultBuffer);

  expect<string>(resultString).toStrictEqual(expectedString);
  expect<string>(handler.toString()).toStrictEqual(expectedString);
}

describe("Round trip", () => {
  it("should handle empty object", () => {
    roundtripTest("{}");
  });

  it("should handle empty object with whitespace", () => {
    roundtripTest("{ }", "{}");
  });

  it("should handle int32", () => {
    // expectFn(():void => {
    roundtripTest('{"int":4660}');
  });

  it("should handle float32", () => {
    // expectFn(():void => {
    roundtripTest('{"float":24.24}');
  });

  it("should handle int32Sign", () => {
    roundtripTest('{"int":-4660}');
  });

  it("should handle float32Sign", () => {
    roundtripTest('{"float":-24.24}');
  });

  it("should handle scientific notation float", () => {
    // Lower and Upper E
    roundtripTest(
      '{"floatLowerE":1.23456e5,"floatUpperE":1.23456E5}', 
      '{"floatLowerE":123456.0,"floatUpperE":123456.0}'
    );

    // Complex Scientific Notation
    roundtripTest(
      '{"floatEMinus":123456e-5,"floatEPlus":1.23456E+5}', 
      '{"floatEMinus":1.23456,"floatEPlus":123456.0}'
    );
  });

  it("should handle special floats", () => {
    roundtripTest(
      '{"negativeZero":-0}',
      '{"negativeZero":0.0}',
    );
  });


  it("should handle true", () => {
    roundtripTest('{"val":true}');
  });

  it("should handle false", () => {
    roundtripTest('{"val":false}');
  });

  it("should handle null", () => {
    roundtripTest('{"val":null}');
  });

  it("should handle string", () => {
    roundtripTest('{"str":"foo"}');
  });

  it("should handle string escaped", () => {
    roundtripTest('"\\"\\\\\\/\\n\\t\\b\\r\\t"', '"\\"\\\\/\\n\\t\\b\\r\\t"');
  });

  it("should handle string unicode escaped simple", () => {
    roundtripTest('"\\u0022"', '"\\""');
  });

  it("should handle string unicode escaped", () => {
    roundtripTest(
      '"\\u041f\\u043e\\u043b\\u0442\\u043e\\u0440\\u0430 \\u0417\\u0435\\u043c\\u043b\\u0435\\u043a\\u043e\\u043f\\u0430"',
      '"Полтора Землекопа"'
    );
  });

  it("should multiple keys", () => {
    roundtripTest('{"str":"foo","bar":"baz"}');
  });

  it("should handle nested objects", () => {
    roundtripTest('{"str":"foo","obj":{"a":1,"b":-123456}}');
  });

  it("should handle empty array", () => {
    roundtripTest("[]");
  });

  it("should handle array", () => {
    roundtripTest("[1,2,3]");
  });

  it("should handle nested arrays", () => {
    roundtripTest("[[1,2,3],[4,[5,6]]]");
  });

  it("should handle nested objects and arrays", () => {
    roundtripTest('{"str":"foo","arr":[{"obj":{"a":1,"b":-123456}}]}');
  });

  it("should handle whitespace", () => {
    roundtripTest(
      ' { "str":"foo","obj": {"a":1, "b" :\n -123456} } ',
      '{"str":"foo","obj":{"a":1,"b":-123456}}'
    );
  });
});

