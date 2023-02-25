import {
  type BrainfuckCommand,
  type BrainfuckCode,
} from "./brainfuckDefinitions";

type Storage = number[];

function getNextCloseBracketIndex(sourceCode: string, codePointer: number) {
  let closeBracketCounter = 0;
  codePointer++;
  while (closeBracketCounter < 1) {
    if (sourceCode[codePointer] === "[") {
      closeBracketCounter--;
    }
    if (sourceCode[codePointer] === "]") {
      closeBracketCounter++;
    }
    codePointer++;
  }
  return codePointer - 1;
}

function getPreviousOpenBracketIndex(sourceCode: string, codePointer: number) {
  let openBracketCounter = 0;
  codePointer--;
  while (openBracketCounter < 1) {
    if (sourceCode[codePointer] === "]") {
      openBracketCounter--;
    }
    if (sourceCode[codePointer] === "[") {
      openBracketCounter++;
    }
    codePointer--;
  }
  return codePointer + 1;
}

export default function brainfuckInterpreter(
  sourceCode: BrainfuckCode,
  input: string
) {
  const storage: Storage = [...Array(1000000)].map((_) => 0);
  let pointer = 0;
  let codePointer = 0;
  let output = "";
  while (codePointer < sourceCode.length) {
    const command: BrainfuckCommand = sourceCode[
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
          codePointer = getNextCloseBracketIndex(sourceCode, codePointer) + 1;
        } else {
          codePointer++;
        }
        break;
      case "]":
        if (storage[pointer] !== 0) {
          codePointer =
            getPreviousOpenBracketIndex(sourceCode, codePointer) + 1;
        } else {
          codePointer++;
        }
        break;
    }
  }
  return output;
}
