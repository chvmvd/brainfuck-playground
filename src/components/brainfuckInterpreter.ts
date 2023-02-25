import {
  type BrainfuckCommand,
  type BrainfuckCode,
} from "./brainfuckDefinitions";
import brainfuckParser from "./brainfuckParser";

type Storage = number[];

function getNextCloseBracketIndex(
  parsedSourceCode: string,
  codePointer: number
) {
  let closeBracketCounter = 0;
  codePointer++;
  while (closeBracketCounter < 1) {
    if (parsedSourceCode[codePointer] === "[") {
      closeBracketCounter--;
    }
    if (parsedSourceCode[codePointer] === "]") {
      closeBracketCounter++;
    }
    codePointer++;
  }
  return codePointer - 1;
}

function getPreviousOpenBracketIndex(
  parsedSourceCode: string,
  codePointer: number
) {
  let openBracketCounter = 0;
  codePointer--;
  while (openBracketCounter < 1) {
    if (parsedSourceCode[codePointer] === "]") {
      openBracketCounter--;
    }
    if (parsedSourceCode[codePointer] === "[") {
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
  const parsedSourceCode = brainfuckParser(sourceCode);
  const storage: Storage = [...Array(1000000)].map((_) => 0);
  let pointer = 0;
  let codePointer = 0;
  let output = "";
  while (codePointer < parsedSourceCode.length) {
    const command: BrainfuckCommand = parsedSourceCode[
      codePointer
    ] as BrainfuckCommand;
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
        storage[pointer]++;
        codePointer++;
        break;
      case "-":
        storage[pointer]--;
        codePointer++;
        break;
      case ".":
        output = `${output}${String.fromCharCode(storage[pointer])}`;
        codePointer++;
        break;
      case ",":
        storage[pointer] = input.charCodeAt(0);
        input = input.slice(1);
        codePointer++;
        break;
      case "[":
        if (storage[pointer] === 0) {
          codePointer =
            getNextCloseBracketIndex(parsedSourceCode, codePointer) + 1;
        } else {
          codePointer++;
        }
        break;
      case "]":
        if (storage[pointer] !== 0) {
          codePointer =
            getPreviousOpenBracketIndex(parsedSourceCode, codePointer) + 1;
        } else {
          codePointer++;
        }
        break;
    }
  }
  return output;
}
