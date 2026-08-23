import { WindowControls } from "#components/index.js";
import { marked } from "marked";
import { useEffect, useState } from "react";
import { injectStandaloneMediaEmbeds } from "#utils/markdownEmbeds.js";

const MarkdownWindowContent = ({ title, content, url, windowKey }) => {
    const [markdown, setMarkdown] = useState(content || "");
    const [loading, setLoading] = useState(!!url && !content);

    useEffect(() => {
        if (url && !content) {
            const rawUrl = url
                .replace("github.com", "raw.githubusercontent.com")
                .replace("/blob/", "/");
            
            setLoading(true);
            fetch(rawUrl)
                .then((res) => res.text())
                .then((text) => {
                    setMarkdown(text);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching markdown:", err);
                    setMarkdown("Failed to load content from GitHub.");
                    setLoading(false);
                });
        }
    }, [url, content]);

    const htmlContent = marked.parse(injectStandaloneMediaEmbeds(markdown || ""));

    return (
        <>
            <div className="window-header">
                <WindowControls target={windowKey} />
                <h2>{title}.md</h2>
            </div>

            <div 
                className="markdown-body overflow-y-auto p-6 font-sans select-text"
                style={{ maxHeight: "calc(var(--window-height, 70vh) - 56px)" }}
            >
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400 animate-pulse">Loading content from GitHub...</p>
                    </div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                )}
            </div>
        </>
    );
};

export default MarkdownWindowContent;
