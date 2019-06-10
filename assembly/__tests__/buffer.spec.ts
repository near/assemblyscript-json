import { Buffer } from "../util";

describe("Buffer", (): void => {
  it("should be able to access underlying data", () => {
    let b: string = "Hello World";
    let arr = Buffer.fromString(b);
    let b2: string = Buffer.toString(arr);
    expect<string>(b).toStrictEqual(b2);
  });
});
