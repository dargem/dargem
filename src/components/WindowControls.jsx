import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
    const { closeWindow, setWindowSize, windows } = useWindowStore();
    const { size } = windows[target];

    const togglePresetSize = () => {
        if (size) {
            setWindowSize(target, null);
            return;
        }

        setWindowSize(target, {
            width: Math.round(window.innerWidth * 0.75),
            height: Math.round(window.innerHeight * 0.72),
        });
    };

    return <div id="window-controls">
        <div className="close" onClick={() => closeWindow(target)}/>
        <div className="minimize"/>
        <div className="maximize" onClick={togglePresetSize} title={size ? "Restore size" : "Expand"}/>
    </div>;
};

export default WindowControls;