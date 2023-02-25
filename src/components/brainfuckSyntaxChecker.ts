import { type BrainfuckCode } from "./brainfuckDefinitions";

export default function brainfuckSyntaxChecker(
  sourceCode: BrainfuckCode
):
  | "Too many open bracket!"
  | "Too many close bracket!"
  | "bracket mismatch!"
  | "OK" {
  let openBracketCount = (sourceCode.match(/\[/g) || []).length;
  let closeBracketCount = (sourceCode.match(/\]/g) || []).length;
  if (openBracketCount > closeBracketCount) return "Too many open bracket!";
  if (openBracketCount < closeBracketCount) return "Too many close bracket!";
  let cnt = 0;
  for (const char of sourceCode) {
    if (char === "[") cnt++;
    if (char === "]") cnt--;
    if (cnt < 0) return "bracket mismatch!";
  }
  return "OK";
}
