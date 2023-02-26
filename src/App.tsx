import { useState } from "react";
import { type Memory } from "./components/brainfuckDefinitions";
import brainfuckInterpreter from "./components/brainfuckInterpreter";
import brainfuckSyntaxChecker from "./components/brainfuckSyntaxChecker";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

function App() {
  const [sourceCode, setSourceCode] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [memory, setMemory] = useState<Memory>([]);
  const [pointer, setPointer] = useState<number>(0);
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Brainfuck Playground
          </Typography>
          <IconButton
            color="inherit"
            href="https://github.com/chvmvd/brainfuck-playground"
            size="large"
          >
            <GitHubIcon fontSize="inherit" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <input
        type="text"
        value={sourceCode}
        onChange={(e) => {
          setSourceCode(e.target.value);
        }}
      />
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          if (brainfuckSyntaxChecker(sourceCode) === "OK") {
            const result = brainfuckInterpreter(sourceCode, input);
            setOutput(result.output);
            setMemory(result.memory);
            setPointer(result.pointer);
          }
        }}
      >
        Run
      </button>
      <div>
        <span>Output:</span>
        {output}
      </div>
      <div>
        <span>Memory</span>
        <table>
          <tbody>
            {[...Array(10)].map((_, i) => (
              <tr key={i}>
                {[...Array(10)].map((_, j) => (
                  <td
                    key={i * 10 + j}
                    style={{
                      color: i * 10 + j === pointer ? "skyblue" : "black",
                    }}
                  >
                    {memory[i * 10 + j]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
