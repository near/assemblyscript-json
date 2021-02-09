import { JSONDecoder } from "../decoder";
import { JSONEncoder } from "../encoder";
import { Buffer } from "../util";
import * as JSON from "../JSON";

let primObj: JSON.Obj;
let primArr: JSON.Arr;

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
      expect((<JSON.Num>JSON.parse("123456789.0"))._num).toStrictEqual(
        (<JSON.Num>JSON.from(123456789.0))._num
      );
    });

    it("should handle floats", () => {
      expect((<JSON.Float>JSON.parse("123456789.0"))._num).toStrictEqual(
        (<JSON.Float>JSON.from(123456789.0))._num
      );
    });

    it("should handle scientific notation floats", () => {
      // Supports lower e
      expect((<JSON.Float>JSON.parse("1.23456e5"))._num).toStrictEqual(
        (<JSON.Float>JSON.from(123456.0))._num
      );

      // Supports Upper e
      expect((<JSON.Float>JSON.parse("1.23456E5"))._num).toStrictEqual(
        (<JSON.Float>JSON.from(123456.0))._num
      );

      // Supports Complex +
      expect((<JSON.Float>JSON.parse("1.23456e+5"))._num).toStrictEqual(
        (<JSON.Float>JSON.from(123456.0))._num
      );

      // Supports Complex -
      expect((<JSON.Float>JSON.parse("123456E-5"))._num).toStrictEqual(
        (<JSON.Float>JSON.from(1.23456))._num
      );
    });

    it("should handle special floats", () => {
      expect((<JSON.Float>JSON.parse("-0"))._num).toStrictEqual(
        (<JSON.Float>JSON.from(-0.0))._num
      );
    });

    it("should handle integers", () => {
      expect((<JSON.Integer>JSON.parse("123456789"))._num).toStrictEqual(
        (<JSON.Integer>JSON.from(123456789))._num
      );
    });

    it("should handle strings", () => {
      expect(parseToString('"hello"')).toStrictEqual(
        JSON.from("hello").toString()
      );
    });

    it("should handle booleans", () => {
      expect(parseToString("true")).toStrictEqual(JSON.from(true).toString());
      expect(parseToString("false")).toStrictEqual(JSON.from(false).toString());
    });

    // TODO: JSON.from(null) should equal JSON.NUll();
    it("should handle null", () => {
      expect(parseToString("null")).toStrictEqual("null");
    });
  });

  describe("Arrays", () => {
    it("should handle empty ones", () => {
      expect(parseToString("[]")).toStrictEqual(
        JSON.from<i32[]>([]).toString()
      );
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
        }`)
      ).toStrictEqual(primObj.toString());
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
        }`)
      ).toStrictEqual(outerObj);
    });

    it("should handle arrays", () => {
      const obj = JSON.Value.Object();
      obj.set("arr", primArr);
      expect(parseToString('{"arr": [42]}')).toStrictEqual(obj.toString());
    });
  });
});
