import React, { useState, useEffect } from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components/index.js";

const PullRequestIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" fill="currentColor">
        <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm3 0a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm0 9.5a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm8.5-.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM7.177 3.073 9.573.677A.25.25 0 0 1 10 .854V2.5h1a2.5 2.5 0 0 1 2.5 2.5v5.122a2.25 2.25 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354Z"></path>
    </svg>
);

const IssueIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" fill="currentColor">
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
    </svg>
);

const RepoIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" fill="currentColor">
        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
    </svg>
);

const FollowersIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" fill="currentColor">
        <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236 5.507 5.507 0 0 1 3.102-4.09A3.49 3.49 0 0 1 2 5.5ZM5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM12.5 8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0-3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm.25 4.75a.75.75 0 0 1 .75-.75 4.5 4.5 0 0 1 4.5 4.5.75.75 0 0 1-1.5 0 3 3 0 0 0-3-3 .75.75 0 0 1-.75-.75Z"></path>
    </svg>
);

const FALLBACK_PROFILE = {
    login: "dargem",
    name: "Tristan Dyson",
    avatar_url: "https://avatars.githubusercontent.com/u/210294408?v=4",
    html_url: "https://github.com/dargem",
    bio: "Undergrad studying Computer & Data Science at the University of Newcastle.",
    followers: 12,
    public_repos: 18,
};

const FALLBACK_ACTIVITY = [
    {
        id: 1,
        title: "clangd segfault during constant evaluation of #embed inside lambda initializer across headers",
        html_url: "https://github.com/llvm/llvm-project/issues/210869",
        number: 210869,
        created_at: "2026-08-20T12:00:00Z",
        state: "open",
    },
    {
        id: 2,
        title: "module/vision/Yolo: Optimize robot detection radius calculation",
        html_url: "https://github.com/NUbots/NUbots/pull/1782",
        number: 1782,
        created_at: "2026-06-13T05:58:53Z",
        state: "closed",
        pull_request: {
            merged_at: "2026-06-13T05:58:53Z"
        }
    },
    {
        id: 3,
        title: "Fix SIMD RNG seed initialization for Xoroshiro64Star",
        html_url: "https://github.com/dargem/Xoroshiro64StarSIMD/pull/2",
        number: 2,
        created_at: "2026-05-10T14:30:00Z",
        state: "closed",
        pull_request: {
            merged_at: "2026-05-10T14:30:00Z"
        }
    },
];

const CACHE_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

const Github = () => {
    const [profile, setProfile] = useState(null);
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCachedData, setIsCachedData] = useState(false);

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                // Check localStorage cache first
                const cachedProfile = localStorage.getItem("github_profile");
                const cachedActivity = localStorage.getItem("github_activity");
                const cachedTime = localStorage.getItem("github_last_fetched");

                if (cachedProfile && cachedActivity && cachedTime) {
                    const age = Date.now() - Number(cachedTime);
                    if (age < CACHE_EXPIRY_MS) {
                        setProfile(JSON.parse(cachedProfile));
                        setActivity(JSON.parse(cachedActivity));
                        setIsCachedData(true);
                        setLoading(false);
                        return;
                    }
                }

                // Fetch fresh data
                const [profileRes, activityRes] = await Promise.all([
                    fetch("https://api.github.com/users/dargem"),
                    fetch("https://api.github.com/search/issues?q=author:dargem&sort=created&order=desc&per_page=20")
                ]);

                if (profileRes.status === 403 || activityRes.status === 403) {
                    throw new Error("API_RATE_LIMIT");
                }

                if (!profileRes.ok || !activityRes.ok) {
                    throw new Error("API_ERROR");
                }

                const profileData = await profileRes.json();
                const activityData = await activityRes.json();

                // Save to cache
                localStorage.setItem("github_profile", JSON.stringify(profileData));
                localStorage.setItem("github_activity", JSON.stringify(activityData.items || []));
                localStorage.setItem("github_last_fetched", Date.now().toString());

                setProfile(profileData);
                setActivity(activityData.items || []);
                setIsCachedData(false);
            } catch (err) {
                console.error("GitHub API Error:", err);
                
                // Try to load stale cache as fallback
                const cachedProfile = localStorage.getItem("github_profile");
                const cachedActivity = localStorage.getItem("github_activity");

                if (cachedProfile && cachedActivity) {
                    setProfile(JSON.parse(cachedProfile));
                    setActivity(JSON.parse(cachedActivity));
                    setIsCachedData(true);
                    if (err.message === "API_RATE_LIMIT") {
                        setError("GitHub API rate limit exceeded. Showing cached data.");
                    } else {
                        setError("Failed to fetch fresh data. Showing cached data.");
                    }
                } else {
                    // No cache at all, use hardcoded fallbacks
                    setProfile(FALLBACK_PROFILE);
                    setActivity(FALLBACK_ACTIVITY);
                    setIsCachedData(true);
                    if (err.message === "API_RATE_LIMIT") {
                        setError("GitHub API rate limit exceeded. Showing offline fallback data.");
                    } else {
                        setError("Failed to fetch GitHub data. Showing offline fallback data.");
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        fetchGithubData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getRepoName = (htmlUrl) => {
        const parts = htmlUrl.replace("https://github.com/", "").split("/");
        return `${parts[0]}/${parts[1]}`;
    };

    return (
        <>
            <div className="window-header">
                <WindowControls target="github" />
                <h2>GitHub Activity</h2>
            </div>

            <div 
                className="overflow-y-auto p-6 font-sans select-text bg-gray-50 text-gray-900"
                style={{ maxHeight: "calc(var(--window-height, 70vh) - 56px)" }}
            >
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-500 font-medium">Loading GitHub data...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Rate Limit / Error Notice */}
                        {error && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 text-amber-800 text-sm">
                                <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="font-semibold">{error}</p>
                                    <p className="text-amber-700/90 mt-0.5">
                                        GitHub limits unauthenticated API requests to 60 per hour. You can view my full profile directly at{" "}
                                        <a href="https://github.com/dargem" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-amber-950">
                                            github.com/dargem
                                        </a>.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Profile & Commit Graph Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                            {/* Profile Info */}
                            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
                                <img 
                                    src={profile?.avatar_url} 
                                    alt={profile?.login} 
                                    className="w-24 h-24 rounded-full border-2 border-gray-200 shadow-sm"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{profile?.name || profile?.login}</h3>
                                    <a 
                                        href={profile?.html_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-600 hover:underline text-sm font-medium"
                                    >
                                        @{profile?.login}
                                    </a>
                                </div>
                                {profile?.bio && (
                                    <p className="text-sm text-gray-600 leading-relaxed max-w-xs">{profile?.bio}</p>
                                )}
                                <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
                                    <span className="flex items-center gap-1">
                                        <FollowersIcon className="w-4 h-4 text-gray-400" />
                                        <strong>{profile?.followers}</strong> followers
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <RepoIcon className="w-4 h-4 text-gray-400" />
                                        <strong>{profile?.public_repos}</strong> repos
                                    </span>
                                </div>
                            </div>

                            {/* Commit Graph */}
                            <div className="md:col-span-2 flex flex-col justify-between space-y-3">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                                        Contribution Graph
                                    </h4>
                                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center justify-center overflow-x-auto">
                                        <img 
                                            src="https://ghchart.rshah.org/dargem" 
                                            alt="dargem's GitHub contribution graph" 
                                            className="min-w-[600px] h-auto"
                                        />
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 text-right">
                                    Powered by <a href="https://github.com/rshah/githubchart-api" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">ghchart</a>
                                </div>
                            </div>
                        </div>

                        {/* Recent Issues & PRs Section */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800 text-base">Recent Issues & Pull Requests</h3>
                                <span className="text-xs bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full font-semibold">
                                    {activity.length} items {isCachedData && "(cached)"}
                                </span>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {activity.length === 0 ? (
                                    <p className="p-6 text-center text-gray-500">No recent public issues or pull requests found.</p>
                                ) : (
                                    activity.map((item) => {
                                        const isPR = !!item.pull_request;
                                        const repoName = getRepoName(item.html_url);
                                        
                                        // Determine state color, label, icon, and icon color
                                        let stateColor = "bg-gray-100 text-gray-700";
                                        let stateLabel = item.state;
                                        let IconComponent = IssueIcon;
                                        let iconColor = "text-green-600";
                                        
                                        if (isPR) {
                                            IconComponent = PullRequestIcon;
                                            if (item.pull_request?.merged_at || item.state === "closed") {
                                                stateColor = "bg-purple-100 text-purple-700 border border-purple-200";
                                                stateLabel = item.pull_request?.merged_at ? "Merged" : "Closed";
                                                iconColor = "text-purple-500";
                                            } else {
                                                stateColor = "bg-green-100 text-green-700 border border-green-200";
                                                stateLabel = "Open";
                                                iconColor = "text-green-600";
                                            }
                                        } else {
                                            IconComponent = IssueIcon;
                                            if (item.state === "open") {
                                                stateColor = "bg-green-100 text-green-700 border border-green-200";
                                                stateLabel = "Open";
                                                iconColor = "text-green-600";
                                            } else {
                                                stateColor = "bg-purple-100 text-purple-700 border border-purple-200";
                                                stateLabel = "Closed";
                                                iconColor = "text-purple-500";
                                            }
                                        }

                                        return (
                                            <a 
                                                key={item.id}
                                                href={item.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors group"
                                            >
                                                <div className="mt-1 shrink-0">
                                                    <IconComponent className={`w-5 h-5 ${iconColor}`} />
                                                </div>
                                                <div className="flex-1 min-w-0 space-y-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                                                            {repoName}
                                                        </span>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-xs text-gray-400">
                                                            #{item.number}
                                                        </span>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-xs text-gray-400">
                                                            {formatDate(item.created_at)}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                                <div className="shrink-0">
                                                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${stateColor}`}>
                                                        {stateLabel}
                                                    </span>
                                                </div>
                                            </a>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

const GithubWindow = WindowWrapper(Github, "github");

export default GithubWindow;