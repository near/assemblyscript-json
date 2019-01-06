# assemblyscript-bson

BSON encoder / decoder for AssemblyScript somewhat based on https://github.com/mpaland/bsonfy.

Special thanks to https://github.com/MaxGraey/bignum.wasm for basic unit testing infra for AssemblyScript.

# Limitations

This is developed for use in smart contracts written in AssemblyScript for https://github.com/nearprotocol/nearcore.
This imposes such limitations:
- Only limited data types are supported:
    - arrays
    - objects
    - 32-bit integers
    - strings
    - booleans
    - null
    - `Uint8Array`
- We assume that memory never needs to be deallocated (cause these contracts are short-lived).

Note that this mostly just defines the way it's currently implemented. Contributors are welcome to fix limitations.


# Usage

## Encoding BSON

```ts
// Make sure memory allocator is available
import "allocator/arena";
// Import encoder
import { BSONEncoder } from "path/to/module";

// Create encoder
let encoder = new BSONEncoder();

// Construct necessary object
encoder.pushObject("obj");
encoder.setInteger("int", 10);
encoder.setString("str", "");
encoder.popObject();

// Get serialized data
let bson: Uint8Array = encoder.serialize();

```

## Parsing BSON

```ts
// Make sure memory allocator is available
import "allocator/arena";
// Import decoder
import { BSONDecoder, BSONHandler } from "path/to/module";

// Events need to be received by custom object extending BSONHandler.
// NOTE: All methods are optional to implement.
class MyBSONEventsHandler extends BSONHandler {
    setString(name: string, value: string): void {
        // Handle field
    }

    setBoolean(name: string, value: bool): void {
        // Handle field
    }

    setNull(name: string): void {
        // Handle field
    }

    setInteger(name: string, value: i32): void {
        // Handle field
    }

    setUint8Array(name: string, value: Uint8Array): void {
        // Handle field
    }

    pushArray(name: string): bool {
        // Handle array start
        return true; // true means that nested object needs to be traversed, false otherwise
    }

    popArray(): void {
        // Handle array end
    }

    pushObject(name: string): bool {
        // Handle object start
        return true; // true means that nested object needs to be traversed, false otherwise
    }

    popObject(): void {
        // Handle object end
    }
}

// Create decoder
let decoder = new BSONDecoder<MyBSONEventsHandler>(new MyBSONEventsHandler());

// Let's assume BSON data is available in this variable
let bson: Uint8Array = ...;

// Parse BSON
decoder.deserialize(bson); // This will send events to MyBSONEventsHandler

```

