import React, { useState, useEffect, useRef } from 'react';

const LinkedInWidget = ({ widgetId = null }) => {
    const [height, setHeight] = useState(600);

    const iframeRef = useRef(null);

    useEffect(() => {
        const handleMessage = (event) => {
            // Only accept messages that look like our height updates
            // AND originate from our iframe's contentWindow to avoid cross-talk.
            if (
                iframeRef.current &&
                event.source === iframeRef.current.contentWindow &&
                event.data &&
                typeof event.data === 'object' &&
                event.data.type === 'elfsight-height'
            ) {
                setHeight(event.data.height);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    if (!widgetId) {
        return (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4 mx-4 text-center">
                <p className="text-gray-500 text-sm">No LinkedIn widget ID provided.</p>
            </div>
        );
    }

    // The srcDoc now includes a ResizeObserver to tell the parent how tall it is.
    // This allows the iframe to grow with its content, eliminating the nested scrollbar.
    const srcDoc = `
        <!DOCTYPE html>
        <html>
        <head>
            <base target="_blank">
            <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
            <style>
                body { 
                    margin: 0; 
                    padding: 0; 
                    overflow: hidden; 
                    background: transparent;
                }
                #widget-container {
                    overflow: hidden;
                }
                .elfsight-app-${widgetId} { 
                    width: 100% !important; 
                    overflow: hidden !important;
                }
            </style>
        </head>
        <body>
            <div id="widget-container">
                <div class="elfsight-app-${widgetId}"></div>
            </div>
            <script>
                const widgetEl = document.querySelector('.elfsight-app-${widgetId}');
                const sendHeight = () => {
                    const rawHeight = widgetEl ? widgetEl.scrollHeight : document.documentElement.scrollHeight;
                    const safeHeight = Math.max(rawHeight, 320);
                    window.parent.postMessage({ type: 'elfsight-height', height: safeHeight }, '*');
                };

                const observer = new ResizeObserver(sendHeight);
                observer.observe(document.documentElement);
                if (widgetEl) {
                    observer.observe(widgetEl);
                }
                
                setInterval(sendHeight, 1000);
                window.onload = sendHeight;
            </script>
        </body>
        </html>
    `;

    return (
        <div className="linkedin-widget mt-4 mx-4 relative overflow-hidden" style={{ height: `${height}px` }}>
            <iframe
                title="LinkedIn Feed"
                srcDoc={srcDoc}
                ref={iframeRef}
                sandbox="allow-scripts allow-popups"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                style={{ border: 'none', display: 'block', overflow: 'hidden' }}
            />
        </div>
    );
};

export default LinkedInWidget;
