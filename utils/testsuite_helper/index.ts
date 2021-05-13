import "wasi";

import { Console, CommandLine, Process, FileSystem, Descriptor } from "as-wasi";
import { JSON } from "../../assembly";

function parse(file: string): u32 {
  const fd = FileSystem.open(file);
  if (fd == null) {
    Console.error("Cannot open file - " + file);
    return 2;
  }
  let content: string = fd.readString()!;
  if (content == null) {
    Console.error("Cannot read file - " + file);
    return 2;
  }

  // parse the file
  let res = JSON.parse(content);
  // Console.log(res.toString());
  Console.log(file + " - Success!");
  return 0;
}

let cmd = new CommandLine();
let f: string | null = cmd.get(1);
if (f) {
  Process.exit(parse(<string>f));
} else {
  Console.log("No File");
  Process.exit(2);
}
