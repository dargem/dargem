import useWindowStore from "#store/window.js";
import { useRef } from "react";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        return <section 
            id={windowKey} 
            style={{zIndex}}
            className="absolute"
        >
            <Component />
        </section>
    };
    
    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return <div>WindowWrapper</div>;
};

export default WindowWrapper; 