import { INITIAL_Z_INDEX, WINDOW_CONFIG, markdownLinks } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const markdownFiles = import.meta.glob('../markdown/*.md', { query: '?raw', import: 'default', eager: true });

export const markdownWindowsList = [
    ...Object.keys(markdownFiles).map((path) => {
        const filename = path.split('/').pop().replace('.md', '');
        const windowKey = `markdown-${filename.toLowerCase()}`;
        return {
            key: windowKey,
            title: filename,
            content: markdownFiles[path]
        };
    }),
    ...markdownLinks.map((link) => {
        const windowKey = `markdown-${link.title.toLowerCase().replace(/\s+/g, '-')}`;
        return {
            key: windowKey,
            title: link.title,
            url: link.url
        };
    })
].sort((a, b) => a.title.localeCompare(b.title));

const markdownWindows = {};
markdownWindowsList.forEach(({ key, title, content, url }) => {
    markdownWindows[key] = {
        isOpen: false,
        size: null,
        position: null,
        zIndex: INITIAL_Z_INDEX,
        data: {
            title,
            content,
            url
        }
    };
});

const useWindowStore = create(
    immer((set) => ({
        windows: {
            ...WINDOW_CONFIG,
            ...markdownWindows
        },
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data=null) => set((state) => {
            const win = state.windows[windowKey];
            win.isOpen = true;
            win.zIndex = state.nextZIndex;
            win.data = data ?? win.data;
            state.nextZIndex++;
        }),

        closeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            win.isOpen = false;
            win.zIndex = INITIAL_Z_INDEX;
        }),

        focusWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            win.zIndex = state.nextZIndex++;
        }),

        setWindowSize: (windowKey, size) => set((state) => {
            state.windows[windowKey].size = size;
        }),

        setWindowPosition: (windowKey, position) => set((state) => {
            state.windows[windowKey].position = position;
        }),
})));

export default useWindowStore;