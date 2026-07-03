import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useMemo } from "react";

import { NavBar, Dock, Desktop } from "#components";
import { TerminalWindow, ResumeWindow, ContactWindow, MarkdownWindowContent, BlogsWindow } from "#windows";
import WindowWrapper from "#hoc/WindowWrapper";
import { markdownWindowsList } from "#store/window.js";

gsap.registerPlugin(Draggable);

const App = () => {
    const dynamicWindows = useMemo(() => {
        return markdownWindowsList.map(({ key, title, content }) => {
            const Component = () => (
                <MarkdownWindowContent title={title} content={content} windowKey={key} />
            );
            Component.displayName = `Markdown_${title}`;
            const Wrapped = WindowWrapper(Component, key);
            return { key, Wrapped };
        });
    }, []);

    return (
        <div>
            <NavBar />
            <Desktop />
            <Dock />

            <TerminalWindow/>
            <ContactWindow/>
            <ResumeWindow/>
            <BlogsWindow/>

            {dynamicWindows.map(({ key, Wrapped }) => (
                <Wrapped key={key} />
            ))}
        </div>
    );
};

export default App;