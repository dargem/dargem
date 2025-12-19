import dayjs from "dayjs";

import { navLinks, navIcons } from "#constants";

const NavBar = () => {
    return (
        <nav className="mt-2 ml-2 mr-2">
            <div>
                <img src="/files/images/endeavour_logo.svg" alt="logo" className="w-6 h-6"/>
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
                <ul className="flex items-center gap-5 list-none">
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img 
                                src={img} 
                                className="icon-hover icon w-6 h-6" 
                                alt={`icon-${id}`}
                            />
                        </li>
                    ))}
                </ul>
                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    )
}

export default NavBar
