import {
  type BrainfuckCommand,
  type BrainfuckCode,
  defaultMemory,
  type Memory,
} from "./brainfuckDefinitions";
import brainfuckParser from "./brainfuckParser";

function getNextCloseBracketIndex(
  brainfuckCode: BrainfuckCode,
  codePointer: number
) {
  let closeBracketCounter = 0;
  codePointer++;
  while (closeBracketCounter < 1) {
    if (brainfuckCode[codePointer] === "[") {
      closeBracketCounter--;
    }
    if (brainfuckCode[codePointer] === "]") {
      closeBracketCounter++;
    }
    codePointer++;
  }
  return codePointer - 1;
}

function getPreviousOpenBracketIndex(
  brainfuckCode: BrainfuckCode,
  codePointer: number
) {
  let openBracketCounter = 0;
  codePointer--;
  while (openBracketCounter < 1) {
    if (brainfuckCode[codePointer] === "]") {
      openBracketCounter--;
    }
    if (brainfuckCode[codePointer] === "[") {
      openBracketCounter++;
    }
    codePointer--;
  }
  return codePointer + 1;
}

export default function brainfuckInterpreter(
  sourceCode: string,
  input: string
) {
  const brainfuckCode = brainfuckParser(sourceCode);
  const memory: Memory = [...defaultMemory];
  let pointer = 0;
  let codePointer = 0;
  let output = "";
  while (codePointer < brainfuckCode.length) {
    const command: BrainfuckCommand = brainfuckCode[codePointer];
    switch (command) {
      case ">":
        pointer++;
        codePointer++;
        break;
      case "<":
        pointer--;
        codePointer++;
        break;
      case "+":
        memory[pointer]++;
        codePointer++;
        break;
      case "-":
        memory[pointer]--;
        codePointer++;
        break;
      case ".":
        output = `${output}${String.fromCharCode(memory[pointer])}`;
        codePointer++;
        break;
      case ",":
        memory[pointer] = input.charCodeAt(0);
        input = input.slice(1);
        codePointer++;
        break;
      case "[":
        if (memory[pointer] === 0) {
          codePointer =
            getNextCloseBracketIndex(brainfuckCode, codePointer) + 1;
        } else {
          codePointer++;
        }
        break;
      case "]":
        if (memory[pointer] !== 0) {
          codePointer =
            getPreviousOpenBracketIndex(brainfuckCode, codePointer) + 1;
        } else {
          codePointer++;
        }
        break;
    }
  }
  return { output: output, memory: memory, pointer: pointer };
}
