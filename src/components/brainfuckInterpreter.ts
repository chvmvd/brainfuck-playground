import {
  type BrainfuckCommand,
  type BrainfuckCode,
  defaultMemory,
  type Memory,
} from "./brainfuckDefinitions";
import brainfuckParser from "./brainfuckParser";

/**
 * get the index of the next corresponding close bracket
 * @param brainfuckCode an array of brainfuck commands
 * @param instructionPointer the index of the open bracket
 * @returns the index of the next corresponding close bracket
 */
function getNextCloseBracketIndex(
  brainfuckCode: BrainfuckCode,
  instructionPointer: number
) {
  let closeBracketCounter = 0;
  instructionPointer++;
  while (closeBracketCounter < 1) {
    if (brainfuckCode[instructionPointer] === "[") {
      closeBracketCounter--;
    }
    if (brainfuckCode[instructionPointer] === "]") {
      closeBracketCounter++;
    }
    instructionPointer++;
  }
  return instructionPointer - 1;
}

/**
 * get the index of the previous corresponding open bracket
 * @param brainfuckCode an array of brainfuck commands
 * @param instructionPointer the index of the close bracket
 * @returns the index of the previous corresponding open bracket
 */
function getPreviousOpenBracketIndex(
  brainfuckCode: BrainfuckCode,
  instructionPointer: number
) {
  let openBracketCounter = 0;
  instructionPointer--;
  while (openBracketCounter < 1) {
    if (brainfuckCode[instructionPointer] === "]") {
      openBracketCounter--;
    }
    if (brainfuckCode[instructionPointer] === "[") {
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
) {
  const brainfuckCode = brainfuckParser(sourceCode);
  const memory: Memory = [...defaultMemory];
  let pointer = 0;
  let instructionPointer = 0;
  let output = "";
  while (instructionPointer < brainfuckCode.length) {
    const command: BrainfuckCommand = brainfuckCode[instructionPointer];
    switch (command) {
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
            getNextCloseBracketIndex(brainfuckCode, instructionPointer) + 1;
        } else {
          instructionPointer++;
        }
        break;
      case "]":
        if (memory[pointer] !== 0) {
          instructionPointer =
            getPreviousOpenBracketIndex(brainfuckCode, instructionPointer) + 1;
        } else {
          instructionPointer++;
        }
        break;
    }
  }
  return { output: output, memory: memory, pointer: pointer };
}
