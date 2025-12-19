import dayjs from "dayjs";

import { navLinks, navIcons } from "#constants";

const NavBar = () => {
    return (
        <nav>
            <div>
                <img src="/files/images/arch_logo.png" alt="logo" className="h-6"/>
                <p className="font-bold">My Portfolio</p>

                <ul>
                    {navLinks.map(({ id, name }) => (
                        <li key={id}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <time className="text-white">{dayjs().format('ddd D MMM h:mm A')}</time>
            </div>

            <div>
                <ul className="flex items-center gap-5 list-none">
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img 
                                src={img} 
                                className="icon-hover icon h-6 invert brightness-0" 
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
