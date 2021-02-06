import * as JSON from "../JSON";
import { JSONEncoder } from "../encoder";
import { JSONDecoder, JSONHandler } from "../decoder";

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

  setInteger(name: string, value: i64): void {
    // Handle field
  }

  setFloat(name: string, value: f64): void {
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

describe("README Usage Examples", () => {
  it("Parsing JSON", () => {
    // Parse an object using the JSON object
    let jsonObj: JSON.Obj = <JSON.Obj>(JSON.parse('{"hello": "world", "value": 24}'));

    // We can then use the .getX functions to read from the object if you know it's type
    // This will return the appropriate JSON.X value if the key exists, or null if the key does not exist
    let worldOrNull: JSON.Str | null = jsonObj.getString("hello"); // This will return a JSON.Str or null
    if (worldOrNull != null) {
      // use .valueOf() to turn the high level JSON.Str type into a string
      let world: string = worldOrNull.valueOf();
    }

    let numOrNull: JSON.Num | null = jsonObj.getNum("value");
    if (numOrNull != null) {
      // use .valueOf() to turn the high level JSON.Num type into a f64
      let value: f64 = numOrNull.valueOf();
    }

    // If you don't know the value type, get the parent JSON.Value
    let valueOrNull: JSON.Value | null = jsonObj.getValue("hello");
    if (valueOrNull != null) {
      let value: JSON.Value = changetype<JSON.Value>(valueOrNull);

      // Next we could figure out what type we are
      if(value.isString) { 
        // value.isString would be true, so we can cast to a string
        let stringValue: string = changetype<JSON.Str>(value).toString();
        
        // Do something with string value
      }
    }
  });

  it("Encoding JSON", () => {
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
    let jsonString: string = encoder.toString();

    assert(jsonString, '"obj": {"int": 10, "str": ""}'); // True!
  });

  it("Decoding JSON", () => {

    // NOTE: Include the JSON Handler Class here

    // Create decoder
    let decoder = new JSONDecoder<MyJSONEventsHandler>(new MyJSONEventsHandler());

    // Create a byte buffer of our JSON. NOTE: Deserializers work on UTF8 string buffers.
    let jsonString = '{"hello": "world"}';
    let jsonBuffer = Uint8Array.wrap(String.UTF8.encode(jsonString));

    // Parse JSON
    decoder.deserialize(jsonBuffer); // This will send events to MyJSONEventsHandler
  });
});

