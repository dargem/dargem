import gsap from "gsap";
import { Draggable } from "gsap/all";

import { NavBar, Dock } from "#components";
import { TerminalWindow } from "#windows";
gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <div>
            <NavBar />
            <Dock />

            <TerminalWindow />
        </div>
    );
};

export default App;