import { WindowControls } from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper";

import React, { useState, useEffect } from 'react';
import { marked } from "marked";

const createHeadingId = (text, counts) => {
    const baseId = (text || "")
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    const nextCount = counts.get(baseId) ?? 0;
    counts.set(baseId, nextCount + 1);

    return nextCount === 0 ? baseId : `${baseId}-${nextCount}`;
};

const renderMarkdownWithHeadingIds = (markdown) => {
    const normalizedMarkdown = (markdown || "").replace(
        /\[\[no_unique_address\]\]/g,
        "\\[\\[no_unique_address\\]\\]"
    );
    const html = marked.parse(normalizedMarkdown);
    const document = new DOMParser().parseFromString(html, "text/html");
    const counts = new Map();

    document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
        heading.id = createHeadingId(heading.textContent, counts);
    });

    const tableOfContentsHeading = Array.from(document.querySelectorAll("h1")).find(
        (heading) => heading.textContent?.trim() === "Table of Contents"
    );

    if (tableOfContentsHeading?.nextElementSibling?.tagName === "UL") {
        tableOfContentsHeading.nextElementSibling
            .querySelectorAll("li > p")
            .forEach((paragraph) => paragraph.replaceWith(...paragraph.childNodes));
    }

    return document.body.innerHTML;
};

const Blogs = () => {

    const [readmeText, setReadmeText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [worked, setWorked] = useState(null);

    useEffect(() => {
        const url = "https://raw.githubusercontent.com/dargem/benchmark_fun/main/README.md";
        fetch(url)
        .then((response) => {
            if (!response.ok) {
            throw new Error('Failed to fetch the README file');
            }
            setWorked(false);
            return response.text(); // Read the response body as plain text
        })
        .then((data) => {
            setReadmeText(data);
            setWorked(true);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setReadmeText(`Failed to fetch the README file from GitHub. View at ${url}`);
            setLoading(false);
        });
    }, []);


    return (
        <>
            <div className="window-header">
                <WindowControls target="blogs"/>
                <h2>Benchmark Blogs</h2>
            </div>

            { worked 
                ? <div 
                    className="markdown-body overflow-y-auto p-6 font-sans select-text"
                    style={{ maxHeight: "calc(var(--window-height, 70vh) - 56px)" }}
                    dangerouslySetInnerHTML={{ __html: renderMarkdownWithHeadingIds(readmeText) }}/> 
                : <p className="p-6">{readmeText}</p> }

        </>
    )
};

const BlogsWindow = WindowWrapper(Blogs, 'blogs');

export default BlogsWindow;