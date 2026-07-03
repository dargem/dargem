import { WindowControls } from "#components/index.js";
import { marked } from "marked";

const MarkdownWindowContent = ({ title, content, windowKey }) => {
    const htmlContent = marked.parse(content || "");

    return (
        <>
            <div className="window-header">
                <WindowControls target={windowKey} />
                <h2>{title}.md</h2>
            </div>

            <div 
                className="markdown-body overflow-y-auto p-6 font-sans select-text"
                style={{ maxHeight: "calc(var(--window-height, 70vh) - 56px)" }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </>
    );
};

export default MarkdownWindowContent;
