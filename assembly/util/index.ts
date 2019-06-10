

export namespace Buffer {
    export function fromString(str: string): Uint8Array {
        let arr = new Uint8Array(str.lengthUTF8 - 1 );
        memory.copy(Buffer.getPtr(arr), str.toUTF8(), str.lengthUTF8 - 1);
        return arr;
    }

    export function toString(arr: Uint8Array): string {
        return String.fromUTF8(Buffer.getPtr(arr), arr.byteLength);
    }
    
    export function getArrayBufferPtr(arr: ArrayBuffer): usize {
        return  changetype<usize>(arr);
    }
    export function getPtr(arr: Uint8Array): usize {
        return  getArrayBufferPtr(arr.buffer) + arr.byteOffset
    }
}