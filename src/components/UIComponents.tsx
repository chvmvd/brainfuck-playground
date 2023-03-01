import React, { useState, type Dispatch, type SetStateAction } from "react";
import { type Memory } from "./brainfuckDefinitions";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { grey, blue } from "@mui/material/colors";

export function AppBarComponent({
  title,
  GitHubUrl,
  availableCommands,
}: {
  title: string;
  GitHubUrl: string;
  availableCommands: string[];
}): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" component="h1" flexGrow={1}>
            {title}
          </Typography>
          <IconButton color="inherit" size="large" href={GitHubUrl}>
            <GitHubIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => {
              setOpen(true);
            }}
          >
            <HelpOutlineOutlinedIcon fontSize="inherit" />
          </IconButton>
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <DialogTitle>Available Commands</DialogTitle>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Command</TableCell>
                    <TableCell>Meaning</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>{availableCommands[0]}</code>
                    </TableCell>
                    <TableCell>Increment the data pointer.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>{availableCommands[1]}</code>
                    </TableCell>
                    <TableCell>Decrement the data pointer.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>{availableCommands[2]}</code>
                    </TableCell>
                    <TableCell>
                      Increment the byte at the data pointer.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>{availableCommands[3]}</code>
                    </TableCell>
                    <TableCell>
                      Decrement the byte at the data pointer.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>{availableCommands[4]}</code>
                    </TableCell>
                    <TableCell>Output the byte at the data pointer.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>{availableCommands[5]}</code>
                    </TableCell>
                    <TableCell>
                      Receive one byte from input and store it in the byte at
                      the data pointer.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>{availableCommands[6]}</code>
                    </TableCell>
                    <TableCell>
                      If the byte at the data pointer is zero, jump the
                      instruction pointer forward to the command after the
                      matching <code>{availableCommands[7]}</code> command.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>{availableCommands[7]}</code>
                    </TableCell>
                    <TableCell>
                      If the byte at the data pointer is nonzero, jump the
                      instruction pointer back to the command after the matching{" "}
                      <code>{availableCommands[6]}</code> command.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Dialog>
        </Toolbar>
      </AppBar>
    </>
  );
}

export function ProgramComponent<SyntaxStatus extends string>({
  syntaxStatus,
  sourceCode,
  setSourceCode,
}: {
  syntaxStatus: SyntaxStatus;
  sourceCode: string;
  setSourceCode: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  return (
    <>
      <Typography variant="h5" component="h2">
        Program
      </Typography>
      <TextField
        variant="outlined"
        error={syntaxStatus !== "OK"}
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
    </>
  );
}

export function InputComponent({
  input,
  setInput,
}: {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  return (
    <>
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
    </>
  );
}

export function RunButtonComponent({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element {
  return (
    <>
      <Button variant="contained" size="large" onClick={onClick}>
        Run
      </Button>
    </>
  );
}

export function OutputComponent({ output }: { output: string }): JSX.Element {
  return (
    <>
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
    </>
  );
}

export function MemoryComponent({
  memory,
  pointer,
}: {
  memory: Memory;
  pointer: number;
}): JSX.Element {
  return (
    <>
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
    </>
  );
}
