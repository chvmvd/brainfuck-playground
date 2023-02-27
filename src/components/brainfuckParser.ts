import {
  availableBrainfuckCommands,
  type BrainfuckCommand,
  type BrainfuckCommands,
} from "./brainfuckDefinitions";

/**
 * remove comments from the source code and convert to an array of brainfuck commands
 * @param sourceCode source code
 * @returns an array of brainfuck commands
 */
export default function brainfuckParser(sourceCode: string): BrainfuckCommands {
  const brainfuckCommands: BrainfuckCommands = [];
  for (const char of sourceCode) {
    if (availableBrainfuckCommands.includes(char))
      brainfuckCommands.push(char as BrainfuckCommand);
  }
  return brainfuckCommands;
}
