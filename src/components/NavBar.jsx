import { navLinks } from "#constants/index.js"

const NavBar = () => {
    return (
        <nav>
            <div>
                <img src="/files/images/endeavour_logo.svg" alt="logo" width="50px" height="50px"/>
                <p class="font-bold">My Portfolio</p>

                <ul>
                    {navLinks.map(({ id, name }) => (
                        <li key={id}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
