# assemblyscript-json

JSON encoder / decoder for AssemblyScript.

Special thanks to https://github.com/MaxGraey/bignum.wasm for basic unit testing infra for AssemblyScript.

# Limitations

This is developed for use in smart contracts written in AssemblyScript for https://github.com/nearprotocol/nearcore.
This imposes such limitations:
- Float numbers not supported
- We assume that memory never needs to be deallocated (cause these contracts are short-lived).

Note that this mostly just defines the way it's currently implemented. Contributors are welcome to fix limitations.


# Usage

## Encoding JSON

```ts
// Make sure memory allocator is available
import "allocator/arena";
// Import encoder
import { JSONEncoder } from "path/to/module";

// Create encoder
let encoder = new JSONEncoder();

// Construct necessary object
encoder.pushObject("obj");
encoder.setInteger("int", 10);
encoder.setString("str", "");
encoder.popObject();

// Get serialized data
let json: Uint8Array = encoder.serialize();

// Or get serialized data as string
let jsonString: String = encoder.toString();

```

## Parsing JSON

```ts
// Make sure memory allocator is available
import "allocator/arena";
// Import decoder
import { JSONDecoder, JSONHandler } from "path/to/module";

// Events need to be received by custom object extending JSONHandler.
// NOTE: All methods are optional to implement.
class MyJSONEventsHandler extends JSONHandler {
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

    pushArray(name: string): bool {
        // Handle array start
        // true means that nested object needs to be traversed, false otherwise
        // Note that returning false means JSONDecoder.startIndex need to be updated by handler
        return true;
    }

    popArray(): void {
        // Handle array end
    }

    pushObject(name: string): bool {
        // Handle object start
        // true means that nested object needs to be traversed, false otherwise
        // Note that returning false means JSONDecoder.startIndex need to be updated by handler
        return true;
    }

    popObject(): void {
        // Handle object end
    }
}

// Create decoder
let decoder = new JSONDecoder<MyJSONEventsHandler>(new MyJSONEventsHandler());

// Let's assume JSON data is available in this variable
let json: Uint8Array = ...;

// Parse JSON
decoder.deserialize(json); // This will send events to MyJSONEventsHandler

```

## JSON namespace

```ts
import { JSON } from "path/to/module";

// Can use JS parse api
let jsonObj: JSON.Object = JSON.parse(`{"hello": "world"}`);

// Can then use a key to read from the object if you know it's type
let world = jsonObj.getString("hello");

// If you don't know what the type of the value
let unknown = jsonObj.getValue("hello")

unknown.isString // true;
```
