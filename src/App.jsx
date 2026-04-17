import gsap from "gsap";
import { Draggable } from "gsap/all";

import { NavBar, Dock } from "#components";
import { TerminalWindow, ResumeWindow, ContactWindow } from "#windows";
gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <div>
            <NavBar />
            <Dock />

            <TerminalWindow/>
            <ContactWindow/>
            <ResumeWindow/>
        </div>
    );
};

export default App;