import {
  brainfuckCommand,
  type BrainfuckCommand,
  type BrainfuckCode,
} from "./brainfuckDefinitions";

export default function brainfuckParser(sourceCode: string): BrainfuckCode {
  let parsedCode: BrainfuckCode = [];
  for (const char of sourceCode) {
    if (brainfuckCommand.includes(char))
      parsedCode.push(char as BrainfuckCommand);
  }
  return parsedCode;
}
