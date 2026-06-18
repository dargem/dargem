import { INITIAL_Z_INDEX } from "#constants";
import { WINDOW_CONFIG } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const markdownFiles = import.meta.glob('../markdown/*.md', { query: '?raw', import: 'default', eager: true });

export const markdownWindowsList = Object.keys(markdownFiles).map((path) => {
    const filename = path.split('/').pop().replace('.md', '');
    const windowKey = `markdown-${filename.toLowerCase()}`;
    return {
        key: windowKey,
        title: filename,
        content: markdownFiles[path]
    };
});

const markdownWindows = {};
markdownWindowsList.forEach(({ key, title, content }) => {
    markdownWindows[key] = {
        isOpen: false,
        zIndex: INITIAL_Z_INDEX,
        data: {
            title,
            content
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
            win.data = null;
        }),

        focusWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            win.zIndex = state.nextZIndex++;
        }),
})));

export default useWindowStore;