import "allocator/arena";

import { BSONDecoder, BSONHandler } from "../../assembly/decoder";

declare function logStr(str: string): void;
declare function logF64(val: f64): void;

/*
let deserialize_vector = [
    {
        obj: { "BSON": ["awesome", 5.05, 1986] },
        bson: "310000000442534f4e002600000002300008000000617765736f6d65000131003333333333331440103200c20700000000",
    },
    {
        obj: { arr: ["foo", "bar", 100, 1000], ta: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]), obj: { int32: 10, int64: 1125899906842624, flo: 3.141592653 } },
        bson: "7500000004617272002900000002300004000000666f6f00023100040000006261720010320064000000103300e8030000000574610008000000000102030405060708036f626a002c00000010696e743332000a00000012696e74363400000000000000040001666c6f0038e92f54fb2109400000"
    },
    {
        obj: { id: 123456, sk: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]), pk: new Uint8Array([255, 254, 253, 252, 251, 250, 249, 248]) },
        bson: "2f0000001069640040e2010005736b000800000000010203040506070805706b000800000000fffefdfcfbfaf9f800"
    },
];
*/
enum EventType {
    String = 1,
    Bytes = 2,
    Int = 3,
    Bool = 4,
    Null = 5,
    PushArray = 6,
    PopArray = 7,
    PushObject = 8,
    PopObject = 9
}

class BSONEvent {
    constructor(public type: EventType, public name: string, public valuePtr: usize) { }

    getValue<T>() : T {
        return changetype<T>(this.valuePtr);
    }

    toString(): string {
        switch (this.type) {
            case EventType.String:
                return this.name + ": " + "'" + this.getValue<string>() + "'";
            case EventType.Int:
                // TODO: Should be some easy way to convert int to string
                let intArray = new Array<i32>();
                intArray.push(this.getValue<i32>());
                return this.name + ": " + intArray.toString();
            case EventType.Bool:
                let value = this.getValue<bool>();
                return this.name + ": " + (value ? "true" : "false");
            case EventType.Null:
                return this.name + ": null";
            case EventType.PushArray:
                return this.name + ": [";
            case EventType.PopArray:
                return "]";
            case EventType.PushObject:
                return this.name + ": {";
            case EventType.PopObject:
                return "}";
            case EventType.Bytes:
                return this.name + ": " + bytes2array(this.getValue<Uint8Array>()).toString();
            default:
                return "<Invalid BSONEvent>"; 
        }
    }
}

class BSONTestHandler extends BSONHandler {
    events: Array<BSONEvent> = new Array<BSONEvent>();

    setString(name: string, value: string): void {
        this.events.push(new BSONEvent(EventType.String, name, changetype<usize>(value)));
    }

    setBoolean(name: string, value: bool): void {
        this.events.push(new BSONEvent(EventType.Bool, name, changetype<usize>(value)));
    }

    setNull(name: string): void {
        this.events.push(new BSONEvent(EventType.Null, name, 0));
    }

    setInteger(name: string, value: i32): void {
        this.events.push(new BSONEvent(EventType.Int, name, changetype<usize>(value)));
    }

    setUint8Array(name: string, value: Uint8Array): void {
        this.events.push(new BSONEvent(EventType.Bytes, name, changetype<usize>(value)));
    }

    pushArray(name: string): bool {
        this.events.push(new BSONEvent(EventType.PushArray, name, 0));
        return true;
    }

    popArray(): void {
        this.events.push(new BSONEvent(EventType.PopArray, "", 0));
    }

    pushObject(name: string): bool {
        this.events.push(new BSONEvent(EventType.PushObject, name, 0));
        return true;
    }

    popObject(): void {
        this.events.push(new BSONEvent(EventType.PopObject, "", 0));
    }
}

let handler : BSONTestHandler = new BSONTestHandler();

export class StringConversionTests {

    static setUp(): void {
        handler.events = new Array<BSONEvent>();
    }

    static createDecoder(): BSONDecoder<BSONTestHandler> {
        return new BSONDecoder(handler);
    }

    static shouldHandleEmptyObject(): bool {
        this.createDecoder().deserialize(hex2bin("0500000000"));
        return handler.events.length == 0
    }
  
    static shouldHandleInt32(): bool {
        this.createDecoder().deserialize(hex2bin("0e00000010696e74003412000000"));
        return handler.events.length == 1 &&
            handler.events[0].toString() == "int: 4660"; // 0x1234
    }

    static shouldHandleNegativeInt32(): bool {
        this.createDecoder().deserialize(hex2bin("0e00000010696e7400f6ffffff00"));
        return handler.events.length == 1 &&
            handler.events[0].toString() == "int: -10";
    }
  
    static shouldHandleString(): bool {
        this.createDecoder().deserialize(hex2bin("1a00000002737472000c00000048656c6c6f20576f726c640000"));
        return handler.events.length == 1 &&
            handler.events[0].toString() == "str: 'Hello World'";
    }
  
    static shouldHandleUTF8String() : bool {
        this.createDecoder().deserialize(hex2bin("17000000027374720009000000c384c396c39cc39f0000"));
        return handler.events.length == 1 &&
            handler.events[0].toString() == "str: '" + "\u00C4\u00D6\u00DC\u00DF" + "'";
    }
  
    static shouldHandleBooleanFalse(): bool {
        this.createDecoder().deserialize(hex2bin("0c00000008626f6f6c000000"));
        return handler.events.length == 1 &&
            handler.events[0].toString() == "bool: false";
    }

    static shouldHandleBooleanTrue(): bool {
        this.createDecoder().deserialize(hex2bin("0c00000008626f6f6c000100"));
        return handler.events.length == 1 &&
            handler.events[0].toString() == "bool: true";
    }

    static shouldHandleNull(): bool {
        this.createDecoder().deserialize(hex2bin("0a0000000a6e756c0000"));
        return handler.events.length == 1 &&
            handler.events[0].toString() == "nul: null";
    }
  
    static shouldHandleBytes(): bool {
        this.createDecoder().deserialize(hex2bin("190000000562696e000a00000000010203040506070809ff00"));
        return handler.events.length == 1 &&
            handler.events[0].toString() == "bin: 1,2,3,4,5,6,7,8,9,255";
    };
  
    static shouldHandleArray(): bool {
        this.createDecoder().deserialize(hex2bin("2b000000046172720021000000103000fa000000103100fb000000103200fc000000103300fd0000000000"));
        return handler.events.length == 6 &&
            handler.events[0].toString() == "arr: [" &&
            handler.events[1].toString() == "0: 250" && // 0xFA
            handler.events[2].toString() == "1: 251" && // 0XFB
            handler.events[3].toString() == "2: 252" && // 0xFC
            handler.events[4].toString() == "3: 253" && // 0xFD
            handler.events[5].toString() == "]";
    };
  
    static shouldHandleNestedArray(): bool {
        this.createDecoder().deserialize(hex2bin("4f000000046172720045000000043000210000001030001000000010310011000000103200120000001033001300000000103100fa000000103200fb000000103300fc000000103400fd0000000000"));
        return handler.events.length == 12 &&
            handler.events[0].toString() == "arr: [" &&
            handler.events[1].toString() == "0: [" &&
            handler.events[2].toString() == "0: 16" && // 0x10
            handler.events[3].toString() == "1: 17" && // 0X11
            handler.events[4].toString() == "2: 18" && // 0x12
            handler.events[5].toString() == "3: 19" && // 0x13
            handler.events[6].toString() == "]" &&
            handler.events[7].toString() == "1: 250" && // 0xFA
            handler.events[8].toString() == "2: 251" && // 0XFB
            handler.events[9].toString() == "3: 252" && // 0xFC
            handler.events[10].toString() == "4: 253" && // 0xFD
            handler.events[11].toString() == "]";
    }
  
    static shouldHandleObjects(): bool {
        this.createDecoder().deserialize(hex2bin("22000000036f626a001800000010696e74000a000000027374720001000000000000"));
        return handler.events.length == 4 &&
            handler.events[0].toString() == "obj: {" &&
            handler.events[1].toString() == "int: 10" &&
            handler.events[2].toString() == "str: ''" &&
            handler.events[3].toString() == "}";
    }
  
    /*
    TODO: Enable when serializer is ready
    static shouldHandleComplexObjects(): bool {
        for (let i = 0; i < deserialize_vector.length; i++) {
            let bson = BSON.serialize(deserialize_vector[i].obj);
            this.createDecoder().deserialize(hex2bin(deserialize_vector[i].bson), true);
            expect(obj).to.deep.equal(deserialize_vector[i].obj);
        }
    }
    */
  
    static shouldAbortDocumentTooSmall(): void {
        this.createDecoder().deserialize(hex2bin("04000000"));
    }
  
    static shouldAbortDocumentTermination1(): void {
        this.createDecoder().deserialize(hex2bin("0c00000008626f6f6c000001"));
    }
    static shouldAbortDocumentTermination2(): void {
        this.createDecoder().deserialize(hex2bin("0c00000008626f6f6c0000"));
    }
  
    static shouldAbortDocumentSizeMismatch(): void {
        this.createDecoder().deserialize(hex2bin("0d00000008626f6f6c000000"));
    }
  
    static shouldAbortIllegalKeyname(): void {
        this.createDecoder().deserialize(hex2bin("0c00000008626f6f6c010100"));
    }
  
    static shouldAbortUnknownElement(): void {
        this.createDecoder().deserialize(hex2bin("0c00000018626f6f6c000000"));
    }
}

function logEvents(): void {
    for (let i = 0; i < handler.events.length; i++) {
        logStr("events:" + handler.events[i].toString());
    }
}

function bytes2array(typedArr: Uint8Array): Array<u8> {
    let arr = new Array<u8>();
    for (let i = 0; i < typedArr.length; i++) {
        arr.push(typedArr[i]);
    }
    return arr;
}

function hex2bin(hex: string): Uint8Array {
    let bin = new Uint8Array(hex.length >>> 1);
    for (let i = 0, len = hex.length >>> 1; i < len; i++) {
        bin[i] = u32(parseInt(hex.substr(i << 1, 2), 16));
    }
    return bin;
}