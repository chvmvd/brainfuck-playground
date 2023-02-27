import {
  brainfuckCommand,
  type BrainfuckCommand,
  type BrainfuckCode,
} from "./brainfuckDefinitions";

export default function brainfuckParser(sourceCode: string): BrainfuckCode {
  let brainfuckCode: BrainfuckCode = [];
  for (const char of sourceCode) {
    if (brainfuckCommand.includes(char))
      brainfuckCode.push(char as BrainfuckCommand);
  }
  return brainfuckCode;
}
