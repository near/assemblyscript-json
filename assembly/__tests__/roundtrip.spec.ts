import { JSONDecoder } from "../decoder";
import { JSONEncoder } from "../encoder";
import { Buffer } from "../util";
import { JSON } from "../JSON";


function roundtripTest(jsonString: string, _expectedString: string  = ""): void {
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
    roundtripTest("{ }", "{}")
  });

  it("should handle int32", () => {
    // expectFn(():void => {
    roundtripTest('{"int":4660}');
  });

  it("should handle int32Sign", () => {
    roundtripTest('{"int":-4660}');
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
    roundtripTest(
      '"\\"\\\\\\/\\n\\t\\b\\r\\t"',
      '"\\"\\\\/\\n\\t\\b\\r\\t"'
    );
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

var primObj: JSON.Obj;
var primArr: JSON.Arr;

function parseToString(input: string): string {
  return JSON.parse(input).toString();
}

describe("JSON.parse", () => {      
  beforeAll(() => {
    primObj = JSON.Value.Object();
    primArr = <JSON.Arr>JSON.from<i32[]>([42]);
    primObj.set("number", JSON.from(42));
    primObj.set("boolean", JSON.from(true));
    primObj.set("string", JSON.from("Hello"));
  });

  describe("Primitive Values", () => {
    it("should handle numbers", () => {
      expect((<JSON.Num>JSON.parse("123456789"))._num).toStrictEqual((<JSON.Num>JSON.from(123456789))._num);
    });

    it("should handle strings", () => {
      expect(parseToString("\"hello\"")).toStrictEqual(JSON.from("hello").toString());
    });

    it("should handle booleans", () => {
      expect(parseToString("true")).toStrictEqual(JSON.from(true).toString());
      expect(parseToString("false")).toStrictEqual(JSON.from(false).toString());
    });

    //TODO: JSON.from(null) should equal JSON.NUll();
    it("should handle null", () => {
      expect(parseToString("null")).toStrictEqual("null");
    });
  });

  describe("Arrays", () => {
    it("should handle empty ones", () => {
      expect(parseToString("[]")).toStrictEqual(JSON.from<i32[]>([]).toString());
    });

    it("should handle non-empty ones", () => {

      expect(parseToString("[42]")).toStrictEqual(primArr.toString());
    });

    it("should handle nested ones", () => {
      const outterArr = JSON.Value.Array();
      outterArr.push(primArr);
      expect(parseToString("[[42]]")).toStrictEqual(outterArr.toString());
    });
  });
  
  describe("Objects", () => {
    it("should handle empty objects", () => {
      expect(parseToString("{}")).toStrictEqual(JSON.Value.Object().toString());
    });

    it("should handle primitive values", () => {
      expect(
        parseToString(`{
                      "number": 42, 
                      "boolean": true, 
                      "string": "Hello"
                    }`)).toStrictEqual(primObj.toString());
    });

    it("should handle nested objects", () => {
      const outerObj = JSON.Value.Object();
      outerObj.set("innerObject", primObj);
      expect(
        JSON.parse(`{
                      "innerObject": {
                          "number": 42, 
                          "boolean": true, 
                          "string": "Hello" 
                      }
                    }`)).toStrictEqual(outerObj);
    });
    
    it("should handle arrays", () => {
      const obj = JSON.Value.Object();
      obj.set("arr", primArr);
      expect(parseToString('{"arr": [42]}')).toStrictEqual(obj.toString());
    });

  });

});
