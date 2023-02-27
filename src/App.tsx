import React, { useState, useEffect } from "react";
import {
  availableBrainfuckCommands,
  type BrainfuckSyntaxStatus,
  defaultMemory,
  type Memory,
} from "./components/brainfuckDefinitions";
import brainfuckSyntaxChecker from "./components/brainfuckSyntaxChecker";
import { Toolbar, Box, Stack } from "@mui/material";
import {
  AppBarComponent,
  ProgramComponent,
  InputComponent,
  RunButtonComponent,
  OutputComponent,
  MemoryComponent,
} from "./components/UIComponents";

function App(): JSX.Element {
  const [sourceCode, setSourceCode] = useState<string>("");
  const [syntaxStatus, setSyntaxStatus] = useState<BrainfuckSyntaxStatus>("OK");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [memory, setMemory] = useState<Memory>([...defaultMemory]);
  const [pointer, setPointer] = useState<number>(0);
  useEffect(() => {
    setSyntaxStatus(brainfuckSyntaxChecker(sourceCode));
  }, [sourceCode]);
  return (
    <>
      <AppBarComponent
        GitHubUrl="https://github.com/chvmvd/brainfuck-playground"
        availableCommands={availableBrainfuckCommands}
      />
      <Toolbar />
      <Box sx={{ m: 2 }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <ProgramComponent<BrainfuckSyntaxStatus>
              syntaxStatus={syntaxStatus}
              sourceCode={sourceCode}
              setSourceCode={setSourceCode}
            />
            <Stack direction="row" spacing={2} alignItems="flex-end">
              <Box flexGrow={1}>
                <InputComponent input={input} setInput={setInput} />
              </Box>
              <RunButtonComponent
                sourceCode={sourceCode}
                input={input}
                setOutput={setOutput}
                setMemory={setMemory}
                setPointer={setPointer}
              />
            </Stack>
          </Stack>
          <Stack spacing={1}>
            <OutputComponent output={output} />
            <MemoryComponent memory={memory} pointer={pointer} />
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default App;
