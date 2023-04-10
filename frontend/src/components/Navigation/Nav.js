import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import NavItem from "./NavItem";
import "./Nav.css";
import Image from "../UI/Image";

const Nav = () => {
    const { user, logout } = useContext(UserContext);

    return (
        <nav className="nav flex flex-wrap items-center justify-between px-4 bg-black text-white">
            <Link className="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest" to="/">
                <Image className="h-10 mr-2 w-10" src="favicon.webp" width="40px" height="40px" />

                <span className="font-semibold text-xl tracking-tight">SpaceX Explorer</span>
            </Link>

            <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
            <label className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none" htmlFor="menu-btn">
                <span className="icon bg-grey-darkest flex items-center relative"></span>
            </label>

            <ul className="flex menu border-gray-500 border-b justify-end m-0 w-full md:border-none md:w-auto">
                <NavItem path="/" exact>
                    Home
                </NavItem>
                <NavItem path="/rockets">Rockets</NavItem>
                <NavItem path="/launches">Launches</NavItem>
                <Link className="bg-none text-white"></Link>
                {!user ? (
                    <Link className="bg-none text-white mt-2" to="/login">
                        <span className="font-semibold text-base tracking-wide">Login</span>
                    </Link>
                ) : (
                    <button
                        onClick={logout}
                        className="bg-red-600 border border-gray-300 py-2 px-4 text-white cursor-pointer rounded hover:shadow-md"
                    >
                        Logout
                    </button>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
