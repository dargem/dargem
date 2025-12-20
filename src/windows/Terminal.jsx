import WindowWrapper from "#hoc/WindowWrapper";

const Terminal = () => {
    return <>
    <div id="window-header">
        <p>Window Controls</p>
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
            to computer graphics, concave polygon packing, machine learning and much more. 
            <br /><br />
            My preferred languages are Python and Java though I've started to enjoy using C++ in some more performance critical side projects.
            While I like Java it can be quite frustrating at times with stuff like it lacking stack based object allocation so I'm looking forwards to value classes from project Valhalla even if its not in JDK 26.
        </p>

    </div>
    </>;
};

const TerminalWindow = WindowWrapper(Terminal, 'terminal');

export default TerminalWindow;