import { JSON } from '..';

const jsonStr = '{"hello":"world"}';




describe("JSON", (): void => {

    describe("parse should handle", (): void => {

        it("strings", () => {
            let obj = JSON.parse(jsonStr);
            expect<string>(obj.getString("hello")).toStrictEqual("world");
        });

        it("arrays", () => {
            let str = '{"Hello": ["World"]}'
            let obj = JSON.parse(str);
            let arr = obj.getArray("Hello");
            expect<number>(arr.length).toBe(1)
            expect<bool>(arr[0].isString).toBe(true);
            let Str = arr[0] as JSON.Str;
            expect<string>(Str.str).toStrictEqual("World");
        });

        it("nested objects", () => {
            let str = '{"top level": { "Hello": "World" } }';
            let obj = JSON.parse(str);
            let topLevel = obj.getObject("top level");
            expect<number>(topLevel.keys.length).toBe(1);
            expect<string>(topLevel.getString("Hello")).toStrictEqual("World");
        });

        it("numbers", () => {
            let str = '{"pi": 3}'
            let obj = JSON.parse(str);
            let pi: i64 = <i64>obj.getNumber("pi");
            expect<i64>(pi).toBe(<i64>3);
        });

        it("booleans", () => {
            let str = '{"Hello": true }'
            let obj = JSON.parse(str);
            expect<bool>(obj.getBool("Hello")).toBe(true);
        });

        it("null", () => {
            let str = '{"Hello": null }'
            let obj = JSON.parse(str);
            expect<bool>(obj.getNull("Hello")).toBe(true);
        })
    });
});
