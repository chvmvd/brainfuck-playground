import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import brainfuckInterpreter from "./components/brainfuckInterpreter";

function App() {
  useEffect(() => {
    const output = brainfuckInterpreter("++++++++[>++++++++<-]>+.+.+.", "");
    console.log(output);
  }, []);
  return (
    <>
      <div>Hello World!</div>
    </>
  );
}

export default App;
