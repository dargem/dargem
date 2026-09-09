import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls, LinkedInWidget } from "#components/index.js";
import { linkedInWidgetId } from "#constants/index.js";
import { Mail, ExternalLink } from "lucide-react";

const GithubIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-11 5.373-11 12 0 5.303 3.438 9.8 8.205 11.385.5.082.682-.213.682-.477 0-.236-.008-.864-.011-1.69-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .268.18.58.688.482A10.019 10.019 0 0024 12.297c0-6.627-5.373-12-11-12"/>
    </svg>
);

const LinkedinIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

const Contact = () => {
    return <>
    <div className="window-header">
        <WindowControls target="contact"/>
        <h2>My Contacts</h2>
    </div>
    <div className="overflow-y-auto pb-6 bg-gray-50" style={{ maxHeight: "calc(var(--window-height, 70vh) - 56px)" }}>
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* GitHub Card */}
                <a 
                    href="https://github.com/dargem" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-white/10 rounded-lg">
                            <GithubIcon className="h-7 w-7 text-white" />
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-left text-white mb-0.5">GitHub</div>
                        <div className="text-xs text-slate-300 text-left pb-0 font-mono">@dargem</div>
                    </div>
                </a>

                {/* LinkedIn Card */}
                <a 
                    href="https://linkedin.com/in/tristan-dyson" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-white/10 rounded-lg">
                            <LinkedinIcon className="h-7 w-7 text-white" />
                        </div>
                        <ExternalLink className="w-4 h-4 text-blue-200 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-left text-white mb-0.5">LinkedIn</div>
                        <div className="text-xs text-blue-100 text-left pb-0">Tristan Dyson</div>
                    </div>
                </a>

                {/* Emails Card */}
                <div className="flex flex-col justify-between p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                            <Mail className="w-6 h-6" />
                        </div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-left text-gray-900 mb-2">Email Addresses</div>
                        <div className="space-y-1.5 text-left">
                            <a 
                                href="mailto:tristanxdyson@gmail.com" 
                                className="block text-xs text-emerald-600 hover:underline font-mono truncate"
                            >
                                tristanxdyson@gmail.com
                            </a>
                            <a 
                                href="mailto:c3412030@uon.edu.au" 
                                className="block text-xs text-emerald-600 hover:underline font-mono truncate"
                            >
                                c3412030@uon.edu.au
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <LinkedInWidget widgetId={linkedInWidgetId} />
    </div>
    </>;
};

const ContactWindow = WindowWrapper(Contact, 'contact');

export default ContactWindow;