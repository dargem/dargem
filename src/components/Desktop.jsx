import useWindowStore, { markdownWindowsList } from "#store/window.js";

const Desktop = () => {
    const { openWindow } = useWindowStore();

    return (
        <section id="home">
            <ul>
                {markdownWindowsList.map(({ key, title }, index) => {
                    // Position each folder icon in a column on the left
                    const topPosition = 40 + index * 140; // 40px, 160px, 280px, etc.
                    const leftPosition = 40; // 40px from the left

                    return (
                        <li
                            key={key}
                            className="group absolute select-none flex items-center flex-col cursor-pointer"
                            style={{ top: `${topPosition}px`, left: `${leftPosition}px` }}
                            onClick={() => openWindow(key)}
                        >
                            <img
                                src="/files/icons/folder.png"
                                alt={title}
                                className="w-20 h-20 object-contain p-1 rounded-md group-hover:bg-gray-950/10 transition-colors"
                            />
                            <p className="text-sm text-white text-center px-1.5 py-0.5 rounded-md group-hover:bg-blue-500 transition-colors max-w-40 mt-1">
                                {title}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default Desktop;
