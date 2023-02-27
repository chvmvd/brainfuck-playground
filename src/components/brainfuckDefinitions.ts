export const brainfuckCommand = ["<", ">", "+", "-", ".", ",", "[", "]"];
export type BrainfuckCommand = "<" | ">" | "+" | "-" | "." | "," | "[" | "]";
export type BrainfuckCommands = BrainfuckCommand[];
export const defaultMemory = [...Array(100)].map((_) => 0);
export type Memory = number[];
export type BrainfuckSyntaxStatus =
  | "OK"
  | "Too many open bracket!"
  | "Too many close bracket!"
  | "bracket mismatch!";
