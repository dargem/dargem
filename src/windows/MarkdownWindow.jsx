import { WindowControls } from "#components/index.js";
import { marked } from "marked";

const MarkdownWindowContent = ({ title, content, windowKey }) => {
    const htmlContent = marked.parse(content || "");

    return (
        <>
            <div id="window-header">
                <WindowControls target={windowKey} />
                <h2>{title}.md</h2>
            </div>

            <div 
                className="markdown-body p-6 overflow-y-auto max-h-[70vh] font-sans select-text"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </>
    );
};

export default MarkdownWindowContent;
