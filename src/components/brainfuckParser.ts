import { brainfuckCommand, BrainfuckCode } from "./brainfuckDefinitions";

export default function brainfuckParser(sourceCode: string): BrainfuckCode {
  let parsedCode = "";
  for (const char of sourceCode) {
    if (brainfuckCommand.includes(char)) parsedCode = `${parsedCode}${char}`;
  }
  return parsedCode;
}
