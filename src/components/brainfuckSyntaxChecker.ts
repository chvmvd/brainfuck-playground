import {
  type BrainfuckSyntaxStatus,
  type BrainfuckCode,
} from "./brainfuckDefinitions";
import brainfuckParser from "./brainfuckParser";

export default function brainfuckSyntaxChecker(
  sourceCode: string
): BrainfuckSyntaxStatus {
  const parsedSourceCode = brainfuckParser(sourceCode);
  let openBracketCount = (parsedSourceCode.join("").match(/\[/g) || []).length;
  let closeBracketCount = (parsedSourceCode.join("").match(/\]/g) || []).length;
  if (openBracketCount > closeBracketCount) return "Too many open bracket!";
  if (openBracketCount < closeBracketCount) return "Too many close bracket!";
  let cnt = 0;
  for (const char of parsedSourceCode) {
    if (char === "[") cnt++;
    if (char === "]") cnt--;
    if (cnt < 0) return "bracket mismatch!";
  }
  return "OK";
}
