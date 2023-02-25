import { useState } from "react";
import { type Storage } from "./components/brainfuckDefinitions";
import brainfuckInterpreter from "./components/brainfuckInterpreter";
import brainfuckSyntaxChecker from "./components/brainfuckSyntaxChecker";

function App() {
  const [sourceCode, setSourceCode] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [storage, setStorage] = useState<Storage>([]);
  const [pointer, setPointer] = useState<number>(0);
  return (
    <>
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
            setStorage(result.storage);
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
        <span>Storage</span>
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
                    {storage[i * 10 + j]}
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
