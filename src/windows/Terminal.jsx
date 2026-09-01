import { useState, useEffect, useRef } from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import useWindowStore, { markdownWindowsList } from "#store/window.js";

const VIRTUAL_FILES = {
    "about_me.txt": `I'm an undergrad at the University of Newcastle, studying a double in computer & data science. \
In my spare time I like learning topics that peak my fancy, ranging from:
  • Data orientated design
  • Humanoid soccer robots
  • Template metaprogramming
  • Competitive programming & Algorithms
  • Benchmarking programs
  • Random number generators
  • Modern and questionable C++ "features"`,

    "languages.txt": `My languages are C++, Java, Python and R. My preference is C++ for my larger performance critical side projects and Java where performance isn't a concern. \
Python I use for competitive programming, analytics and anything I don't mind being done quick and dirty. \
R is nice to use for statistical testing but I find not much else.`, 

    "instructions.txt": `To navigate the site click on the navbar or folders to create a window. \
Desktop folders contain markdown of my personal project. \
The blog consists of a large series of interesting benchmarks and C++ features. \
Click on the bottom right draggable or the green expand button to resize a window. \
To drag windows around, click and drag on the window's top bar. \
Click on the cross, or alternatively the terminal in the dock to close this. \
If you find the text too small, zoom in with Ctrl +/-. \
Alternatively print the md files through the command line. \
Use help to see what is available.
`
};

// Dynamically add markdown files to VIRTUAL_FILES
markdownWindowsList.forEach(({ title, content, url }) => {
    const filename = `${title}.md`;
    VIRTUAL_FILES[filename] = content || { url };
});


const handleCommand = async (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
        return { type: "output", text: "" };
    }

    // Regex to split by spaces but keep quoted strings together
    const parts = trimmed.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g).map(part => {
        if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
            return part.slice(1, -1);
        }
        return part;
    });

    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
        case "help":
            return {
                type: "output",
                text: `Available commands:
  help         - Show this help menu
  ls           - List files
  cat [file]   - Display file contents (use quotes for spaces)
  whoami       - Display current user info
  fastfetch    - Display system information
  clear        - Clear the terminal screen
  exit         - Close the terminal window`
            };
        case "fastfetch":
            return {
                type: "output",
                isFastfetch: true,
                text: `                  -\`                     tristan@archlinux
                 .o+\`                    -----------------
                \`ooo/                    OS: Arch Linux x86_64
               \`+oooo:                   Host: 83M0 (Legion 5 15AHP10)
              \`+oooooo:                  Kernel: Linux 7.1.9-zen1-2-zen
              -+oooooo+:                 Uptime: 9 mins
            \`/:-:++oooo+:                Packages: 8 (flatpak), 1612 (pacman)
           \`/++++/+++++++:               Shell: fish 4.8.1
          \`/++++++++++++++:              Display (N153JMA-G51): 1920x1200 in 15", 165 Hz [Built-in]
         \`/+++ooooooooooooo/\`            WM: Hyprland 0.56.2 (Wayland)
        ./ooosssso++osssssso+\`           Theme: Breeze-Dark [GTK2], Breeze [GTK3]
       .oossssso-\`\`\`\`/ossssss+\`          Icons: breeze-dark [GTK2/3/4]
      -osssssso.      :ssssssso.         Font: Google Sans Flex Medium (11pt) [GTK2/3/4]
     :osssssss/        osssso+++.        Cursor: breeze (24px)
    /ossssssss/        +ssssooo/-        Terminal: kitty 0.48.2
  \`/ossssso+/:-        -:/+osssso+-      Terminal Font: JetBrainsMonoNF-Regular (11pt)
 \`+sso+:-\`                 \`.-/+oso:     CPU: AMD Ryzen 7 260 (16) @ 5.10 GHz
\`++:.                           \`-/+/    GPU 1: NVIDIA GeForce RTX 5060 Max-Q / Mobile [Discrete]
.\`                                 \`/    GPU 2: AMD Radeon 780M Graphics [Integrated]
                                         Memory: 5.20 GiB / 14.92 GiB (35%)
                                         Swap: 0 B / 4.00 GiB (0%)
                                         Disk (/): 360.65 GiB / 475.94 GiB (76%) - btrfs
                                         Local IP (wlan0): 10.222.199.105/16
                                         Battery (L23D4PK4): 50% [AC Connected, Charging]
                                         Locale: en_US.UTF-8`
            };
        case "ls":
            return {
                type: "output",
                text: Object.keys(VIRTUAL_FILES).sort().join("    ")
            };
        case "cat":
            if (args.length === 0) {
                return { type: "output", text: "usage: cat [file]" };
            }
            const filename = args[0].toLowerCase();
            const actualKey = Object.keys(VIRTUAL_FILES).find(key => key.toLowerCase() === filename);
            if (actualKey) {
                const fileData = VIRTUAL_FILES[actualKey];
                if (typeof fileData === "string") {
                    return {
                        type: "output",
                        text: fileData
                    };
                } else if (fileData.url) {
                    try {
                        const rawUrl = fileData.url
                            .replace("github.com", "raw.githubusercontent.com")
                            .replace("/blob/", "/");
                        const response = await fetch(rawUrl);
                        if (!response.ok) throw new Error("Failed to fetch");
                        const text = await response.text();
                        // Cache it for next time
                        VIRTUAL_FILES[actualKey] = text;
                        return { type: "output", text };
                    } catch (err) {
                        return { type: "output", text: `cat: ${args[0]}: Error fetching from GitHub` };
                    }
                }
            }
            return { type: "output", text: `cat: ${args[0]}: No such file or directory` };
        case "whoami":
            return { type: "output", text: "tristan-dyson" };
        case "clear":
            return { type: "clear" };
        case "exit":
            return { type: "exit" };
        default:
            return { type: "output", text: `zsh: command not found: ${command}. Type 'help' for a list of commands.` };
    }
};

const Terminal = () => {
    const { closeWindow, windows } = useWindowStore();
    const [inputVal, setInputVal] = useState("");
    const [history, setHistory] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const [commandHistory, setCommandHistory] = useState([
        "whoami",
        "cat about_me.txt",
        "cat languages.txt",
        "cat instructions.txt"
    ]);
    const [historyIndex, setHistoryIndex] = useState(4);

    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const isTerminalOpen = windows.terminal.isOpen;

    // Run initial commands on first open
    useEffect(() => {
        const initialCommands = [
            "whoami",
            "cat about_me.txt",
            "cat languages.txt",
            "cat instructions.txt"
        ];
        
        const runInitial = async () => {
            const initialHistory = [];
            for (const cmd of initialCommands) {
                initialHistory.push({ type: "input", text: cmd });
                const result = await handleCommand(cmd);
                if (result.type !== "clear" && result.type !== "exit") {
                    initialHistory.push(result);
                }
            }
            setHistory(initialHistory);
        };
        
        runInitial();
    }, []);

    const focusTerminalInput = () => {
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true });
        }
    };

    useEffect(() => {
        if (isTerminalOpen) {
            focusTerminalInput();
        }
    }, [isTerminalOpen]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleTerminalClick = () => {
        focusTerminalInput();
    };

    const onInputKeyDown = async (e) => {
        if (e.key === "Enter") {
            const currentInput = inputVal;
            const newHistory = [...history, { type: "input", text: currentInput }];
            setHistory(newHistory);
            setInputVal("");

            const result = await handleCommand(currentInput);

            if (result.type === "clear") {
                setHistory([]);
            } else if (result.type === "exit") {
                closeWindow("terminal");
            } else {
                setHistory((prev) => {
                    // If the user cleared the screen while we were fetching, don't add the result
                    if (prev.length === 0 && result.type !== "clear") {
                         // This is a bit tricky, but usually we just want to append
                    }
                    return [...prev, result];
                });
            }

            if (currentInput.trim()) {
                const newCmdHistory = [...commandHistory, currentInput];
                setCommandHistory(newCmdHistory);
                setHistoryIndex(newCmdHistory.length);
            }
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
        } else if (item.isFastfetch) {
            const lines = item.text.split("\n");
            return (
                <div key={index} className="whitespace-pre-wrap text-gray-300 leading-relaxed my-1 font-terminal">
                    {lines.map((line, lineIdx) => {
                        const logoPart = line.slice(0, 41);
                        const infoPart = line.slice(41);

                        let renderedInfo;
                        if (infoPart.includes("@")) {
                            const parts = infoPart.split("@");
                            renderedInfo = (
                                <>
                                    <span className="text-[#89dceb] font-bold">{parts[0]}</span>
                                    <span className="text-gray-300">@</span>
                                    <span className="text-[#89dceb] font-bold">{parts[1]}</span>
                                </>
                            );
                        } else if (infoPart.includes(":")) {
                            const colonIndex = infoPart.indexOf(":");
                            const key = infoPart.slice(0, colonIndex + 1);
                            const value = infoPart.slice(colonIndex + 1);
                            renderedInfo = (
                                <>
                                    <span className="text-[#89dceb] font-bold">{key}</span>
                                    <span className="text-gray-300">{value}</span>
                                </>
                            );
                        } else {
                            renderedInfo = <span className="text-gray-300">{infoPart}</span>;
                        }

                        return (
                            <div key={lineIdx}>
                                <span className="text-[#89dceb] font-extrabold font-roboto" style={{ letterSpacing: "0.08em" }}>{logoPart}</span>
                                {renderedInfo}
                            </div>
                        );
                    })}
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
                <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={onInputKeyDown}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    aria-hidden="true"
                    tabIndex={-1}
                    className="fixed left-0 top-0 h-px w-px opacity-0 pointer-events-none"
                />
                <div className="flex flex-col gap-1">
                    {history.map((item, index) => renderHistoryItem(item, index))}
                    
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-green-400 font-bold shrink-0">(base) @Tristan:~% </span>
                        <span className="flex-1 min-h-[1em] whitespace-pre-wrap break-words text-yellow-200 font-semibold font-terminal p-0 m-0">
                            {inputVal}
                            {isInputFocused && (
                                <span className="terminal-caret" aria-hidden="true" />
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;