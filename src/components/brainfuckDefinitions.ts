export const brainfuckCommand = ["<", ">", "+", "-", ".", ",", "[", "]"];
export type BrainfuckCommand = "<" | ">" | "+" | "-" | "." | "," | "[" | "]";
export type BrainfuckCode = string;
export type Memory = number[];
export type BrainfuckSyntaxStatus =
  | "OK"
  | "Too many open bracket!"
  | "Too many close bracket!"
  | "bracket mismatch!";
