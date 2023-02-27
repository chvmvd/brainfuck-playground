import {
  type BrainfuckCommand,
  type BrainfuckCommands,
  defaultMemory,
  type Memory,
} from "./brainfuckDefinitions";
import brainfuckParser from "./brainfuckParser";

/**
 * get the index of the next corresponding close bracket
 * @param brainfuckCommands an array of brainfuck commands
 * @param instructionPointer the index of the open bracket
 * @returns the index of the next corresponding close bracket
 */
function getNextCloseBracketIndex(
  brainfuckCommands: BrainfuckCommands,
  instructionPointer: number
): number {
  let closeBracketCounter = 0;
  instructionPointer++;
  while (closeBracketCounter < 1) {
    if (brainfuckCommands[instructionPointer] === "[") {
      closeBracketCounter--;
    }
    if (brainfuckCommands[instructionPointer] === "]") {
      closeBracketCounter++;
    }
    instructionPointer++;
  }
  return instructionPointer - 1;
}

/**
 * get the index of the previous corresponding open bracket
 * @param brainfuckCommands an array of brainfuck commands
 * @param instructionPointer the index of the close bracket
 * @returns the index of the previous corresponding open bracket
 */
function getPreviousOpenBracketIndex(
  brainfuckCommands: BrainfuckCommands,
  instructionPointer: number
): number {
  let openBracketCounter = 0;
  instructionPointer--;
  while (openBracketCounter < 1) {
    if (brainfuckCommands[instructionPointer] === "]") {
      openBracketCounter--;
    }
    if (brainfuckCommands[instructionPointer] === "[") {
      openBracketCounter++;
    }
    instructionPointer--;
  }
  return instructionPointer + 1;
}

/**
 * interpret brainfuck source code
 * @param sourceCode source code
 * @param input input
 * @returns output, memory state and pointer state
 */
export default function brainfuckInterpreter(
  sourceCode: string,
  input: string
): { output: string; memory: Memory; pointer: number } {
  const brainfuckCommands = brainfuckParser(sourceCode);
  const memory: Memory = [...defaultMemory];
  let pointer = 0;
  let instructionPointer = 0;
  let output = "";
  while (instructionPointer < brainfuckCommands.length) {
    const brainfuckCommand: BrainfuckCommand =
      brainfuckCommands[instructionPointer];
    switch (brainfuckCommand) {
      case ">":
        pointer++;
        instructionPointer++;
        break;
      case "<":
        pointer--;
        instructionPointer++;
        break;
      case "+":
        memory[pointer]++;
        instructionPointer++;
        break;
      case "-":
        memory[pointer]--;
        instructionPointer++;
        break;
      case ".":
        output = `${output}${String.fromCharCode(memory[pointer])}`;
        instructionPointer++;
        break;
      case ",":
        memory[pointer] = input.charCodeAt(0);
        input = input.slice(1);
        instructionPointer++;
        break;
      case "[":
        if (memory[pointer] === 0) {
          instructionPointer =
            getNextCloseBracketIndex(brainfuckCommands, instructionPointer) + 1;
        } else {
          instructionPointer++;
        }
        break;
      case "]":
        if (memory[pointer] !== 0) {
          instructionPointer =
            getPreviousOpenBracketIndex(brainfuckCommands, instructionPointer) +
            1;
        } else {
          instructionPointer++;
        }
        break;
    }
  }
  return { output, memory, pointer };
}
