import { type BrainfuckSyntaxStatus } from "./brainfuckDefinitions";
import brainfuckParser from "./brainfuckParser";

/**
 * check the syntax of the source code
 * @param sourceCode source code
 * @returns syntax status
 */
export default function brainfuckSyntaxChecker(
  sourceCode: string
): BrainfuckSyntaxStatus {
  const brainfuckCommands = brainfuckParser(sourceCode);
  let openBracketCount = (brainfuckCommands.join("").match(/\[/g) || []).length;
  let closeBracketCount = (brainfuckCommands.join("").match(/\]/g) || [])
    .length;
  if (openBracketCount > closeBracketCount) return "Too many open bracket!";
  if (openBracketCount < closeBracketCount) return "Too many close bracket!";
  let cnt = 0;
  for (const char of brainfuckCommands) {
    if (char === "[") cnt++;
    if (char === "]") cnt--;
    if (cnt < 0) return "bracket mismatch!";
  }
  return "OK";
}
