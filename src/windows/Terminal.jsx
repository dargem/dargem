import { useState, useEffect, useRef } from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import useWindowStore from "#store/window.js";

const VIRTUAL_FILES = {
    "about_me.txt": `I'm an undergrad at the University of Newcastle, studying a double in computer & data science.
In my spare time I like learning topics that peak my fancy, ranging from:

  • Data orientated design
  • Humanoid soccer robots
  • Template metaprogramming
  • Competitive programming
  • Benchmarking programs
  • Random number generators
  • Questionable C++ "features"`,

    "languages.txt": `My languages are C++, Java, Python and R. My preference is C++ for my larger performance critical side projects and Java where performance isn't a concern.
Python I use for competitive programming as well as for my quick and dirty projects.
R is nice to use for statistical testing but I find not much else.`,

    "instructions.txt": `To navigate the site click on the navbar or folders to create a window.
Each of the desktop folders are my personal projects, and in the trash bin lies projects I've scrapped.
The blog consists of a large series of interesting benchmarks and C++ features.
Click on the bottom right draggable or the green expand button to resize a window.
To drag windows around, click and drag on the window's top bar.
Click on the cross, or alternatively the terminal in the dock to close this.
If you find the text too small, zoom in with Ctrl +/-.`
};


const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
        return { type: "output", text: "" };
    }

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
        case "help":
            return {
                type: "output",
                text: `Available commands:
  help         - Show this help menu
  ls           - List files
  cat [file]   - Display file contents
  whoami       - Display current user info
  clear        - Clear the terminal screen
  exit         - Close the terminal window`
            };
        case "ls":
            return {
                type: "output",
                text: Object.keys(VIRTUAL_FILES).join("    ")
            };
        case "cat":
            if (args.length === 0) {
                return { type: "output", text: "usage: cat [file]" };
            }
            const filename = args[0].toLowerCase();
            if (VIRTUAL_FILES[filename]) {
                return {
                    type: "output",
                    text: VIRTUAL_FILES[filename]
                };
            } else {
                return { type: "output", text: `cat: ${args[0]}: No such file or directory` };
            }
        case "whoami":
            return { type: "output", text: "td" };
        case "clear":
            return { type: "clear" };
        case "exit":
            return { type: "exit" };
        default:
            return { type: "output", text: `zsh: command not found: ${command}. Type 'help' for a list of commands.` };
    }
};

const Terminal = () => {
    const { closeWindow } = useWindowStore();
    const [inputVal, setInputVal] = useState("");
    const [history, setHistory] = useState([]);

    const [commandHistory, setCommandHistory] = useState([
        "whoami",
        "cat about_me.txt",
        "cat languages.txt",
        "cat instructions.txt"
    ]);
    const [historyIndex, setHistoryIndex] = useState(4);

    const terminalRef = useRef(null);
    const inputRef = useRef(null);

    // Run initial commands on first open
    useEffect(() => {
        const initialCommands = [
            "whoami",
            "cat about_me.txt",
            "cat languages.txt",
            "cat instructions.txt"
        ];
        
        const initialHistory = [];
        initialCommands.forEach((cmd) => {
            initialHistory.push({ type: "input", text: cmd });
            const result = handleCommand(cmd);
            if (result.type !== "clear" && result.type !== "exit") {
                initialHistory.push(result);
            }
        });
        setHistory(initialHistory);
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleTerminalClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const onInputKeyDown = (e) => {
        if (e.key === "Enter") {
            const newHistory = [...history, { type: "input", text: inputVal }];
            const result = handleCommand(inputVal);

            if (result.type === "clear") {
                setHistory([]);
            } else if (result.type === "exit") {
                closeWindow("terminal");
            } else {
                setHistory([...newHistory, result]);
            }

            if (inputVal.trim()) {
                const newCmdHistory = [...commandHistory, inputVal];
                setCommandHistory(newCmdHistory);
                setHistoryIndex(newCmdHistory.length);
            }

            setInputVal("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex > 0) {
                const nextIndex = historyIndex - 1;
                setHistoryIndex(nextIndex);
                setInputVal(commandHistory[nextIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const nextIndex = historyIndex + 1;
                setHistoryIndex(nextIndex);
                setInputVal(commandHistory[nextIndex]);
            } else if (historyIndex === commandHistory.length - 1) {
                setHistoryIndex(commandHistory.length);
                setInputVal("");
            }
        }
    };

    const renderHistoryItem = (item, index) => {
        if (item.type === "input") {
            return (
                <div key={index} className="flex items-center gap-1">
                    <span className="text-green-400 font-bold shrink-0">(base) @Tristan:~% </span>
                    <span className="text-yellow-200 font-semibold">{item.text}</span>
                </div>
            );
        } else {
            return (
                <div key={index} className="whitespace-pre-wrap text-gray-300 leading-relaxed my-1">
                    {item.text}
                </div>
            );
        }
    };

    return (
        <>
            <div className="window-header">
                <WindowControls target="terminal" />
                <h2>Terminal</h2>
            </div>

            <div 
                ref={terminalRef}
                onClick={handleTerminalClick}
                className="techstack"
            >
                <div className="flex flex-col gap-1">
                    {history.map((item, index) => renderHistoryItem(item, index))}
                    
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-green-400 font-bold shrink-0">(base) @Tristan:~% </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={onInputKeyDown}
                            className="flex-1 bg-transparent border-none outline-none text-yellow-200 font-semibold font-terminal p-0 m-0 caret-green-400"
                            autoFocus
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;