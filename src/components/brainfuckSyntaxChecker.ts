import {
  type BrainfuckSyntaxStatus,
  type BrainfuckCode,
} from "./brainfuckDefinitions";
import brainfuckParser from "./brainfuckParser";

export default function brainfuckSyntaxChecker(
  sourceCode: string
): BrainfuckSyntaxStatus {
  const brainfuckCode = brainfuckParser(sourceCode);
  let openBracketCount = (brainfuckCode.join("").match(/\[/g) || []).length;
  let closeBracketCount = (brainfuckCode.join("").match(/\]/g) || []).length;
  if (openBracketCount > closeBracketCount) return "Too many open bracket!";
  if (openBracketCount < closeBracketCount) return "Too many close bracket!";
  let cnt = 0;
  for (const char of brainfuckCode) {
    if (char === "[") cnt++;
    if (char === "]") cnt--;
    if (cnt < 0) return "bracket mismatch!";
  }
  return "OK";
}
