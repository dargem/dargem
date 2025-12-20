import gsap from "gsap";
import { NavBar, Dock } from "#components";
import { TerminalWindow } from "#windows";
import { Draggable } from "gsap/all";
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