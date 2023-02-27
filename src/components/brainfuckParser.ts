import {
  brainfuckCommand,
  type BrainfuckCommand,
  type BrainfuckCode,
} from "./brainfuckDefinitions";

/**
 * remove comments from the source code and convert to an array of brainfuck commands
 * @param sourceCode source code
 * @returns an array of brainfuck commands
 */
export default function brainfuckParser(sourceCode: string): BrainfuckCode {
  let brainfuckCode: BrainfuckCode = [];
  for (const char of sourceCode) {
    if (brainfuckCommand.includes(char))
      brainfuckCode.push(char as BrainfuckCommand);
  }
  return brainfuckCode;
}
