import { JSONDecoder } from "../decoder";
import { JSONEncoder } from "../encoder";
import { Buffer } from "../util";
import * as JSON from "../JSON";

let primObj: JSON.Obj;
let testFloat = 42.24;
let testInteger = 42;
let testBool = true;
let testArray = [1, 2, 3];

describe("JSON.Value.toString()", () => {
  beforeAll(() => {
    primObj = JSON.Value.Object();
    primObj.set("Str", JSON.from("Hello"));
    primObj.set("Num", JSON.from(testFloat));
    primObj.set("Float", JSON.from(testFloat));
    primObj.set("Integer", JSON.from(testInteger));
    primObj.set("Bool", JSON.from(testBool));
    primObj.set("Arr", JSON.from(testArray));
    let childObj = JSON.Value.Object();
    childObj.set("isChild", JSON.from(true));
    primObj.set("Obj", childObj);
  });

  it("Str", () => {
    let value = primObj.getString("Str");
    expect(value!.toString()).toBe("Hello");
  });

  it("Num", () => {
    let value = primObj.getNum("Num");
    expect(value!.toString()).toBe(testFloat.toString());
  });

  it("Float", () => {
    let value = primObj.getFloat("Float");
    expect(value!.toString()).toBe(testFloat.toString());

  });

  it("Integer", () => {
    let value = primObj.getInteger("Integer");
    expect(value!.toString()).toBe(testInteger.toString());
  });

  it("Bool", () => {
    let value = primObj.getBool("Bool");
    expect(value!.toString()).toBe(testBool.toString());
  });

  it("Arr", () => {
    let value = primObj.getArr("Arr");
    expect(value!.toString()).toBe("[" + testArray.toString() + "]");
  });

  it("Obj", () => {
    let value = primObj.getObj("Obj");
    expect(value!.toString()).toBe('{"isChild": true}');
  });

  it("Entire Object", () => {
    expect(primObj.toString()).toBe("{\"Str\": \"Hello\",\"Num\": 42.24,\"Float\": 42.24,\"Integer\": 42,\"Bool\": true,\"Arr\": [1,2,3],\"Obj\": {\"isChild\": true}}");
  });
});

