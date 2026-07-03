import { WindowControls } from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper";

import React, { useState, useEffect } from 'react';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const Blogs = () => {

    const [readmeText, setReadmeText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = "https://github.com/dargem/benchmark_fun/edit/main/README.md";
        fetch(url)
        .then((response) => {
            if (!response.ok) {
            throw new Error('Failed to fetch the README file');
            }
            return response.text(); // Read the response body as plain text
        })
        .then((data) => {
            setReadmeText(data);
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
            <div id="window-header">
                <WindowControls target="blogs"/>
                <h2>Benchmark Blogs</h2>
            </div>

            <p>
                A collection of benchmarks and interesting performance related C++ features. 
                Largely based on various optimizations I've heard about but was interested in finding the extend of the benefit.
            </p>

            <br/>

            <p>
                {readmeText}
            </p>
            {/* <Document file="/files/Resume.pdf">
                <Page pageNumber={1} 
                scale={1.15}
                renderTextlayer 
                renderAnnotationLayer 
            />
            </Document> */}

        </>
    )
};

const BlogsWindow = WindowWrapper(Blogs, 'blogs');

export default BlogsWindow;