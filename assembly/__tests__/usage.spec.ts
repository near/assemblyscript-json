import * as JSON from "../JSON";
import { JSONEncoder } from "../encoder";
import { JSONDecoder } from "../decoder";

describe("README Usage Examples", () => {
  it("Quick Start", () => {

    /* Using the JSON Object */

    // Parse an object using the JSON object
    let jsonObj: JSON.Obj = <JSON.Obj>(JSON.parse('{"hello": "world"}'));

    // Can then use a key to read from the object if you know it's type
    let world = jsonObj.getString("hello");

    // If you don't know what the type of the value
    let unknown = jsonObj.getValue("hello");

    if(unknown.isString) { 
      // unkown.isString would be true
      // ...
    }
  });
});

