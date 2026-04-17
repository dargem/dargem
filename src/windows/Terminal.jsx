import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";

const Terminal = () => {
    return <>
    <div id="window-header">
        <WindowControls target="terminal"/>
        <h2>Tech Stack</h2>
    </div>

    <div className="techstack">
        <p>
            <span className="font-bold">(base) @Tristan:~% td$ </span>
            whoami
            <br />
            td
            <br />
            <span className="font-bold">(base) @Tristan:~% td$ </span>
            actually though
            <br />
            Hey, I'm an undergrad at the University of Newcastle, studying a double in computer & data science.
            In my spare time I like learning topics that peak my fancy, from humanoid soccer robots as a member of NUBots, 
            to computer graphics, data orientated design, questionable C++ "features" like stateful metaprogramming and much more. 
            <br /><br />
            My languages are C++, Java, Python and R. My preference is C++ for my larger performance critical side projects and Java where performance isn't a concern. 
            Python I use for competitive programming where optimizing for big O complexity is all that matters and data analytics.
            R is my go to for any sort of statistical testing.            
        </p>

    </div>
    </>;
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');

export default TerminalWindow;