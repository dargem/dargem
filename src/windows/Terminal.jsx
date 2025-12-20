import WindowWrapper from "#hoc/WindowWrapper";

const Terminal = () => {
    return <>
    <div id="window-header">
        <p>Window Controls</p>
        <h2>Tech Stack</h2>
    </div>

    <div classname="techStack">
        <p>
            <span className="font-bold">@Tristan %</span>
            show tech stack
        </p>

    </div>
    </>;
};

const TerminalWindow = WindowWrapper(Terminal, 'Terminal');

export default TerminalWindow;