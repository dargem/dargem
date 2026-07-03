import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, setWindowPosition, setWindowSize, windows } = useWindowStore();
        const { isOpen, size, position, zIndex } = windows[windowKey];
        const ref = useRef(null);
        const resizeStateRef = useRef(null);

        const applySize = (el, nextSize) => {
            if (!el) return;

            if (nextSize) {
                el.style.width = `${nextSize.width}px`;
                el.style.height = `${nextSize.height}px`;
                el.style.maxWidth = "none";
            } else {
                el.style.width = "";
                el.style.height = "";
                el.style.maxWidth = "";
            }
        };

        const startResize = (event) => {
            event.preventDefault();
            event.stopPropagation();

            const el = ref.current;
            if (!el) return;

            focusWindow(windowKey);

            const startRect = el.getBoundingClientRect();
            const startX = event.clientX;
            const startY = event.clientY;

            resizeStateRef.current = {
                startRect,
                startX,
                startY,
            };

            const onMove = (moveEvent) => {
                const state = resizeStateRef.current;
                if (!state) return;

                const nextWidth = Math.max(360, Math.round(state.startRect.width + (moveEvent.clientX - state.startX)));
                const nextHeight = Math.max(260, Math.round(state.startRect.height + (moveEvent.clientY - state.startY)));

                el.style.width = `${nextWidth}px`;
                el.style.height = `${nextHeight}px`;
                el.style.maxWidth = "none";
            };

            const onUp = () => {
                window.removeEventListener("pointermove", onMove);
                window.removeEventListener("pointerup", onUp);

                const resizedEl = ref.current;
                if (resizedEl) {
                    const rect = resizedEl.getBoundingClientRect();
                    setWindowSize(windowKey, {
                        width: Math.round(rect.width),
                        height: Math.round(rect.height),
                    });
                }

                resizeStateRef.current = null;
            };

            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp, { once: true });
        };

        useGSAP(() => {
            const el = ref.current;
            if(!el || !isOpen) return;

            el.style.display = "block";
            applySize(el, size);

            if (position) {
                el.style.left = `${position.left}px`;
                el.style.top = `${position.top}px`;
                el.style.transform = "none";
            } else {
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                const winWidth = el.offsetWidth || 672;
                const winHeight = el.offsetHeight || 450;

                let randomX = (Math.random() - 0.5) * screenWidth / 8;
                randomX += randomX > 0 ? screenWidth / 15 : -screenWidth / 15; // Give an extra push away from the centre

                const randomY = (Math.random() - 0.5) * screenHeight / 8;

                const targetLeft = screenWidth / 2 - winWidth / 2 + randomX;
                const targetTop = screenHeight / 2 - winHeight / 2 + randomY;

                el.style.left = `${targetLeft}px`;
                el.style.top = `${targetTop}px`;
                el.style.transform = "none";

                setWindowPosition(windowKey, {
                    left: Math.round(targetLeft),
                    top: Math.round(targetTop),
                });
            }

            gsap.fromTo(el, { scale: 0.8, opacity: 0, y: 40}, { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: "power3.out" })
        }, [isOpen]);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            applySize(el, size);
        }, [isOpen, size?.width, size?.height]);

        
        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const handle = el.querySelector(".window-header");
            if (!handle) return;

            const [instance] = Draggable.create(el, {
                type: "left,top",
                handle,
                onPress: () => focusWindow(windowKey),
                onDragEnd: () => {
                    const rect = el.getBoundingClientRect();
                    setWindowPosition(windowKey, {
                        left: Math.round(rect.left),
                        top: Math.round(rect.top),
                    });
                },
            });

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
                style={{
                    zIndex,
                    "--window-height": size ? `${size.height}px` : "70vh",
                }}
                className="absolute"
            >
                <Component {... props}/>
                {isOpen && (
                    <div
                        className="window-resize-handle"
                        onPointerDown={startResize}
                        title="Resize"
                    />
                )}
            </section>
        );
    };
    
    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
};

export default WindowWrapper; 