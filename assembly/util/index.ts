

export namespace Buffer {
    export function fromString(str: string): Uint8Array {
        let arr: Uint8Array= new Uint8Array(str.lengthUTF8 - 1 );
        memory.copy(Buffer.getPtr(arr), str.toUTF8(), str.lengthUTF8 - 1);
        return arr;
    }

    export function toString(arr: Uint8Array): string {
        return String.fromUTF8(Buffer.getPtr(arr), arr.byteLength);
    }
    
    export function getArrayBufferPtr(arr: ArrayBuffer): usize {
        let ptr = changetype<usize>(arr);
        return ptr;
    }

    export function getPtr(arr: Uint8Array): usize {
        let ptr = getArrayBufferPtr(arr.buffer);
        return ptr + arr.byteOffset
    }

    export function readString(arr: Uint8Array, start: usize, end: usize): string {
        return String.fromUTF8(changetype<usize>(arr.buffer) + arr.byteOffset + start, end - start);
    }
}