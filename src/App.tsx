import { useState, useEffect } from "react";
import {
  type BrainfuckSyntaxStatus,
  type Memory,
} from "./components/brainfuckDefinitions";
import brainfuckInterpreter from "./components/brainfuckInterpreter";
import brainfuckSyntaxChecker from "./components/brainfuckSyntaxChecker";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Stack,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { grey, blue } from "@mui/material/colors";

function App() {
  const [sourceCode, setSourceCode] = useState<string>("");
  const [syntaxStatus, setSyntaxStatus] = useState<BrainfuckSyntaxStatus>("OK");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [memory, setMemory] = useState<Memory>([]);
  const [pointer, setPointer] = useState<number>(0);
  useEffect(() => {
    setSyntaxStatus(brainfuckSyntaxChecker(sourceCode));
  }, [sourceCode]);
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" component="h1" flexGrow={1}>
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
      <Stack spacing={1}>
        <Box>
          <Typography variant="h5" component="h2">
            Program
          </Typography>
          <TextField
            variant="outlined"
            error={syntaxStatus === "OK" ? false : true}
            helperText={syntaxStatus === "OK" ? "" : syntaxStatus}
            placeholder="Write your code here."
            multiline
            rows={10}
            fullWidth
            value={sourceCode}
            onChange={(e) => {
              setSourceCode(e.target.value);
            }}
          />
        </Box>
        <Stack direction="row" spacing={2} alignItems="flex-end">
          <Box flexGrow={1}>
            <Typography variant="h5" component="h2">
              Input
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Write your input here."
              fullWidth
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </Box>
          <Button
            variant="contained"
            size="large"
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
          </Button>
        </Stack>
      </Stack>
      <Box>
        <Typography variant="h5" component="h2">
          Output
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            p: 1,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : grey[100],
            color: (theme) =>
              theme.palette.mode === "dark" ? grey[300] : grey[800],
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? grey[800] : grey[300],
            borderRadius: 2,
          }}
        >
          {output}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" component="h2">
          Memory
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell component="th">{`${i * 20}...${
                    (i + 1) * 20 - 1
                  }`}</TableCell>
                  {[...Array(20)].map((_, j) => (
                    <TableCell
                      key={i * 20 + j}
                      sx={{
                        bgcolor: (theme) =>
                          i * 20 + j === pointer
                            ? theme.palette.mode === "dark"
                              ? blue[800]
                              : blue[100]
                            : "transparent",
                      }}
                    >
                      {memory[i * 20 + j]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default App;
