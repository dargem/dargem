import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useEffect, useMemo, useState } from "react";

import { NavBar, Dock, Desktop } from "#components";
import { TerminalWindow, ResumeWindow, ContactWindow, MarkdownWindowContent, BlogsWindow, GithubWindow } from "#windows";
import WindowWrapper from "#hoc/WindowWrapper";
import { markdownWindowsList } from "#store/window.js";

gsap.registerPlugin(Draggable);

const isMobileDevice = () => {
    if (typeof navigator === "undefined") {
        return false;
    }

    if (navigator.userAgentData?.mobile) {
        return true;
    }

    return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent)
        || (navigator.maxTouchPoints > 1 && window.innerWidth < 1024);
};

const MobileUnsupportedScreen = () => (
    <main className="min-h-dvh w-dvw overflow-hidden flex items-center justify-center px-6 text-center text-white">
        <div className="max-w-md rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Site unavailable</p>
            <h1 className="mt-4 text-3xl font-bold text-white">Mobile screen not supported</h1>
            <p className="mt-4 text-sm leading-6 text-slate-200">
                This portfolio is designed for desktop screens only. Please open it on a larger display to use the interactive windows.
            </p>
        </div>
    </main>
);

const App = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateMobileState = () => setIsMobile(isMobileDevice());

        updateMobileState();
        window.addEventListener("resize", updateMobileState);

        return () => window.removeEventListener("resize", updateMobileState);
    }, []);

    const dynamicWindows = useMemo(() => {
        return markdownWindowsList.map(({ key, title, content, url }) => {
            const Component = () => (
                <MarkdownWindowContent title={title} content={content} url={url} windowKey={key} />
            );
            const Wrapped = WindowWrapper(Component, key);
            return { key, Wrapped };
        });
    }, []);

    if (isMobile) {
        return <MobileUnsupportedScreen />;
    }

    return (
        <main>
            <NavBar />
            <Desktop />
            <Dock />

            <TerminalWindow/>
            <ContactWindow/>
            <ResumeWindow/>
            <BlogsWindow/>
            <GithubWindow/>

            {dynamicWindows.map((windowConfig) => {
                const WrappedWindow = windowConfig.Wrapped;
                return <WrappedWindow key={windowConfig.key} />;
            })}
        </main>
    );
};

export default App;