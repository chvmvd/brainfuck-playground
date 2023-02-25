import {
  type BrainfuckCommand,
  type BrainfuckCode,
} from "./brainfuckDefinitions";

type Storage = number[];

function getNextCloseParenIndex(sourceCode: string, codePointer: number) {
  let closeParenCounter = 0;
  codePointer++;
  while (closeParenCounter < 1) {
    if (sourceCode[codePointer] === "[") {
      closeParenCounter--;
    }
    if (sourceCode[codePointer] === "]") {
      closeParenCounter++;
    }
    codePointer++;
  }
  return codePointer - 1;
}

function getPreviousOpenParenIndex(sourceCode: string, codePointer: number) {
  let openParenCounter = 0;
  codePointer--;
  while (openParenCounter < 1) {
    if (sourceCode[codePointer] === "]") {
      openParenCounter--;
    }
    if (sourceCode[codePointer] === "[") {
      openParenCounter++;
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
          codePointer = getNextCloseParenIndex(sourceCode, codePointer) + 1;
        } else {
          codePointer++;
        }
        break;
      case "]":
        if (storage[pointer] !== 0) {
          codePointer = getPreviousOpenParenIndex(sourceCode, codePointer) + 1;
        } else {
          codePointer++;
        }
        break;
    }
  }
  return output;
}
