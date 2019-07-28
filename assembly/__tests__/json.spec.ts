import { JSON } from "..";
import { u128 } from "bignum";
const jsonStr = '{"hello":"world"}';


describe("JSON", (): void => {
  describe("parse should handle", (): void => {
    it("strings", () => {
      let obj = JSON.parse(jsonStr);
      let hello = obj.get("hello");
      expect<string>(hello.str).toStrictEqual("world");
    });

    it("arrays", () => {
      let str = '{"Hello": ["World"]}';
      let obj = JSON.parse(str);
      let arr = obj.get("Hello").arr;
      expect<number>(arr.length).toBe(1);
      expect<bool>(arr[0] instanceof JSON.Str).toBe(true);
      let Str = arr[0];
      expect<string>(Str.str).toStrictEqual("World");
    });

    it("nested objects", () => {
      let str = '{"top level": { "Hello": "World" } }';
      let obj = JSON.parse(str);
      let topLevel = obj.get("top level");
      expect<number>(topLevel.keys.length).toBe(1);
      expect<string>(topLevel.get("Hello").str).toStrictEqual("World");
    });

    it("numbers", () => {
      let str = '{"pi": 3}';
      let obj = JSON.parse(str);
      let pi: i64 = obj.get("pi").num;
      expect<i64>(pi).toBe(<i64>3);
    });

    it("booleans", () => {
      let str = '{"Hello": true }';
      let obj = JSON.parse(str);
      expect<bool>(obj.get("Hello").bool).toBe(true);
    });

    it("null", () => {
      let str = '{"Hello": null }';
      let obj = JSON.parse(str);
      expect<bool>(obj.get("Hello").nul).toBe(true);
    });
  });
});

describe("Transitive dependencies", () => {
  it("should find second level dependencies", () => {
    let _u128 = u128.fromString("128");
    expect<i32>(_u128.toI32()).toBe(128);
  });
});
