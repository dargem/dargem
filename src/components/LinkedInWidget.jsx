import React, { useEffect } from 'react';

const LinkedInWidget = ({ widgetId = null }) => {
    useEffect(() => {
        if (widgetId) {
            const script = document.createElement('script');
            script.src = "https://static.elfsight.com/platform/platform.js";
            script.async = true;
            script.setAttribute('data-use-service-core', '');
            document.body.appendChild(script);

            return () => {
                const existingScript = document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]');
                if (existingScript) {
                    document.body.removeChild(existingScript);
                }
            };
        }
    }, [widgetId]);

    if (!widgetId) {
        return (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4 mx-4 text-center">
                <p className="text-gray-500 text-sm">No LinkedIn widget ID provided.</p>
            </div>
        );
    }

    return (
        <div className="linkedin-widget mt-4 mx-4">
            <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy></div>
        </div>
    );
};

export default LinkedInWidget;
