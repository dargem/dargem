import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        useGSAP(() => {
            const el = ref.current;
            if(!el || !isOpen) return;

            el.style.display = "block";

            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            
            const winWidth = el.offsetWidth || 672;
            const winHeight = el.offsetHeight || 450;

            let randomX = (Math.random() - 0.5) * screenWidth / 4;
            randomX += randomX > 0 ? screenWidth / 15 : -screenWidth / 15; // Give an extra push away from the centre

            const randomY = (Math.random() - 0.5) * screenHeight / 4;

            const targetLeft = Math.max(20, screenWidth / 2 - winWidth / 2 + randomX);
            const targetTop = Math.max(60, screenHeight / 2 - winHeight / 2 + randomY);

            el.style.left = `${targetLeft}px`;
            el.style.top = `${targetTop}px`;

            gsap.fromTo(el, { scale: 0.8, opacity: 0, y: 40}, { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: "power3.out" })
        }, [isOpen]);

        
        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, { onpress: () => focusWindow
            (windowKey)});

            return () => instance.kill();
        }, []);
        


        useLayoutEffect(()=> {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        return (
            <section 
                id={windowKey} 
                ref={ref}
                style={{ zIndex }}
                className="absolute"
            >
                <Component {... props}/>
            </section>
        );
    };
    
    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
};

export default WindowWrapper; 