import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";

const Terminal = () => {
    return <>
    <div className="window-header">
        <WindowControls target="terminal"/>
        <h2>Terminal</h2>
    </div>

    <div className="techstack">
        <span>
            <span className="font-bold">(base) @Tristan:~% td$ </span>
            whoami
            <br />
            td
            <br />
            <span className="font-bold">(base) @Tristan:~% td$ </span>
            actually though
            <br />
            I'm an undergrad at the University of Newcastle, studying a double in computer & data science.
            In my spare time I like learning topics that peak my fancy, ranging from:

            <br />
            <br />
            <ul className="list-disc list-inside pl-5">
                <li>Data orientated design</li>
                <li>Humanoid soccer robots</li>
                <li>Template metaprogramming</li>
                <li>Competitive programming</li>
                <li>Benchmarking programs</li>
                <li>Random number generators</li>
                <li>Questionable C++ "features"</li>
            </ul>
            
            <br />
            My languages are C++, Java, Python and R. My preference is C++ for my larger performance critical side projects and Java where performance isn't a concern. 
            Python I use for competitive programming as well as for my quick and dirty projects.
            R I like for statistical testing.

            <br />
            <br />
            Click on the navbar /or folders to create a window. 
            Each of the desktop folders are my personal projects,
            and in the trash bin lies projects I've scrapped.
            The blog consists of a large series of interesting benchmarks and C++ features.
            Click on the cross, or alternatively the terminal in the dock to close this.
        </span>

    </div>
    </>;
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');

export default TerminalWindow;