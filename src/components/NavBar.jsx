import dayjs from "dayjs";

import { navLinks, navIcons } from "#constants";
import useWindowStore from "#store/window.js";

const NavBar = () => {

    const { openWindow, closeWindow, windows } = useWindowStore();

    const toggleApp = (type) => {
        // open window logic
        // if (!app.canOpen) return;

        const win = windows[type];
        if (win.isOpen) {
            closeWindow(type);
        } else {
            openWindow(type);
        }

        console.log(windows);
    };

    return (
        <nav className="text-xl">
            <div>
                <img src="/files/icons/portfolio.png" alt="logo" className="h-8"/>
                <p className="font-bold">My Portfolio</p>
                <ul>
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} onClick={() => toggleApp(type)}>
                            <p className="text-base">{name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <time className="text-white text-base">{dayjs().format('ddd D MMM h:mm A')}</time>
            </div>

            <div>
                <ul className="flex items-center gap-5 list-none">
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img 
                                src={img} 
                                className="icon-hover icon h-7 invert brightness-0" 
                                alt={`icon-${id}`}
                            />
                            
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
