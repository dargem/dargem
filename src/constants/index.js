const navLinks = [
    {
        id: 1,
        name: "Projects",
        type: "finder",
    },
    {
        id: 3,
        name: "Contact",
        type: "contact",
    },
    {
        id: 4,
        name: "Resume",
        type: "resume",
    },
    {
        id: 5,
        name: "GitHub",
        type: "github",
    },
];

const navIcons = [
    {
        id: "wifi",
        img: "/files/icons/wifi.webp",
    },
    {
        id: "battery",
        img: "/files/icons/battery2.png",
    },
    {
        id: "power_off",
        img: "/files/icons/power.png"
    },
];

const dockApps = [
    {
        id: "finder",
        name: "Portfolio", // was "Finder"
        icon: "folder.png",
        canOpen: true,
        scale: 0.95,
    },
    {
        id: "terminal",
        name: "whoami", // was "Terminal"
        icon: "terminal.png",
        canOpen: true,
        scale: 0.95,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: "email.png",
        canOpen: true,
        scale: 1.1
    },
    {
        id: "blogs",
        name: "Blogs",
        icon: "icone-blog-et-blogger-bleu.png",
        canOpen: true,
        scale: 0.75
    },
    {
        id: "trash",
        name: "Archive", // was "Trash"
        icon: "bin.png",
        canOpen: false,
        scale: 1.03
    },
];

const blogPosts = [
    {
        id: 1,
        date: "Sep 2, 2025",
        title:
        "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
        image: "/files/images/blog1.png",
        link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
    },
    {
        id: 2,
        date: "Aug 28, 2025",
        title: "The Ultimate Guide to Mastering Three.js for 3D Development",
        image: "/files/images/blog2.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
    },
    {
        id: 3,
        date: "Aug 15, 2025",
        title: "The Ultimate Guide to Mastering GSAP Animations",
        image: "/files/images/blog3.png",
        link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
    },
];

const techStack = [
    {
        category: "Frontend",
        items: ["React.js", "Next.js", "TypeScript"],
    },
    {
        category: "Mobile",
        items: ["React Native", "Expo"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS", "Sass", "CSS"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "NestJS", "Hono"],
    },
    {
        category: "Database",
        items: ["MongoDB", "PostgreSQL"],
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub", "Docker"],
    },
];

const socials = [
    {
        id: 1,
        text: "Github",
        icon: "/files/icons/github.svg",
        bg: "#f4656b",
        link: "https://github.com/JavaScript-Mastery-Pro",
    },
    {
        id: 2,
        text: "Platform",
        icon: "/files/icons/atom.svg",
        bg: "#4bcb63",
        link: "https://jsmastery.com/",
    },
    {
        id: 3,
        text: "Twitter/X",
        icon: "/files/icons/twitter.svg",
        bg: "#ff866b",
        link: "https://x.com/jsmasterypro",
    },
    {
        id: 4,
        text: "LinkedIn",
        icon: "/files/icons/linkedin.svg",
        bg: "#05b6f6",
        link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
    },
];

const photosLinks = [
    {
        id: 1,
        icon: "/files/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/files/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/files/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/files/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/files/icons/gicon5.svg",
        title: "Favorites",
    },
];

const gallery = [
    {
        id: 1,
        img: "/files/images/gal1.png",
    },
    {
        id: 2,
        img: "/files/images/gal2.png",
    },
    {
        id: 3,
        img: "/files/images/gal3.png",
    },
    {
        id: 4,
        img: "/files/images/gal4.png",
    },
];

const linkedInWidgetId = '15379ab7-3a66-4053-a303-469240c62d27';

export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    photosLinks,
    gallery,
    linkedInWidgetId,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/files/icons/work.svg",
    kind: "folder",
    children: [
        // ▶ Project 1
        {
            id: 5,
            name: "Nike Ecommerce Website Application",
            icon: "/files/images/folder.png",
            kind: "folder",
            position: "top-10 left-5", // icon position inside Finder
            windowPosition: "top-[5vh] left-5", // optional: Finder window position
            children: [
                {
                    id: 1,
                    name: "Nike Project.txt",
                    icon: "/files/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "The Nike eCommerce website is a sleek and modern platform designed for shopping the latest Nike collections.",
                        "Instead of a simple online store, it delivers an immersive experience with bold visuals, interactive product displays, and smooth navigation.",
                        "Think of it like walking into a flagship Nike store—but right from your phone or laptop.",
                        "It's built with Next.js and Tailwind, ensuring fast performance, responsive design, and a clean, premium look.",
                    ],
                },
                {
                    id: 2,
                    name: "nike.com",
                    icon: "/files/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://youtu.be/fZdTYswuZjU?si=Awjl-pIst9e09_UU",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "nike.png",
                    icon: "/files/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/files/images/project-1.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/files/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },

        // ▶ Project 2
        {
            id: 6,
            name: "AI Resume Analyzer",
            icon: "/files/images/folder.png",
            kind: "folder",
            position: "top-52 right-80",
            windowPosition: "top-[20vh] left-7",
            children: [
                {
                    id: 1,
                    name: "AI Resume Analyzer Project.txt",
                    icon: "/files/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 right-10",
                    description: [
                        "AI Resume Analyzer is a smart tool that helps you perfect your resume with instant feedback.",
                        "Instead of guessing what recruiters want, you get AI-powered insights on keywords, formatting, and overall impact.",
                        "Think of it like having a career coach—pointing out strengths, fixing weaknesses, and boosting your chances of landing interviews.",
                        "It's built with Next.js and Tailwind, so it runs fast, looks professional, and works seamlessly on any device.",
                    ],
                },
                {
                    id: 2,
                    name: "ai-resume-analyzer.com",
                    icon: "/files/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://youtu.be/iYOz165wGkQ?si=R1hs8Legl200m0Cl",
                    position: "top-20 left-20",
                },
                {
                    id: 4,
                    name: "ai-resume-analyzer.png",
                    icon: "/files/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 left-80",
                    imageUrl: "/files/images/project-2.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/files/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 left-5",
                },
            ],
        },

        // ▶ Project 3
        {
            id: 7,
            name: "Food Delivery App",
            icon: "/files/images/folder.png",
            kind: "folder",
            position: "top-10 left-80",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Food Delivery App Project.txt",
                    icon: "/files/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.",
                        "Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.",
                        "Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.",
                        "It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.",
                    ],
                },
                {
                    id: 2,
                    name: "food-delivery-app.com",
                    icon: "/files/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://youtu.be/LKrX390fJMw?si=cExkuVhf2DTV9G2-",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "food-delivery-app.png",
                    icon: "/files/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/files/images/project-3.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: "/files/images/plain.png",
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },
    ],
};

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/files/icons/info.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "me.png",
            icon: "/files/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-5",
            imageUrl: "/files/images/adrian.jpg",
        },
        {
            id: 2,
            name: "casual-me.png",
            icon: "/files/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-28 right-72",
            imageUrl: "/files/images/adrian-2.jpg",
        },
        {
            id: 3,
            name: "conference-me.png",
            icon: "/files/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-52 left-80",
            imageUrl: "/files/images/adrian-3.jpeg",
        },
        {
            id: 4,
            name: "about-me.txt",
            icon: "/files/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-60 left-5",
            subtitle: "Meet the Developer Behind the Code",
            image: "/files/images/adrian.jpg",
            description: [
                "Hey! I’m Adrian 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
                "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
                "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.",
                "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
            ],
        },
    ],
};

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/files/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: "/files/images/pdf.png",
            kind: "file",
            fileType: "pdf",
        },
    ],
};

const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/files/icons/trash.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "trash1.png",
            icon: "/files/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-10",
            imageUrl: "/files/images/trash-1.png",
        },
        {
            id: 2,
            name: "trash2.png",
            icon: "/files/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-40 left-80",
            imageUrl: "/files/images/trash-2.png",
        },
    ],
};

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const markdownLinks = [
    // Add your GitHub README links here
    // { title: "Dargem", url: "https://github.com/tristan-vane/dargem/blob/main/README.md" }
    { title: "GeminiAPI", url: "https://github.com/dargem/copilot-gemini-wrapper/blob/main/README.md" },
    { title: "You're Absolutely Right", url: "https://github.com/dargem/you-re-absolutely-right/blob/main/README.md" },
    { title: "SIMD RNG", url: "https://github.com/dargem/Xoroshiro64StarSIMD/blob/main/README.md" }
];

const WINDOW_CONFIG = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    blogs: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: true, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    github: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG, markdownLinks };