import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Home = () => {
    const { user, logout } = useContext(UserContext);
    return (
        <div className="text-center">
            <div className="text-8xl">🧒🏻</div>
            <h1>
                {user.name}
                <br />
                <span className="font-normal text-base">{user.email}</span>
            </h1>
            <button onClick={logout} className="bg-red-600 border border-gray-300 py-2.5 px-4 text-white cursor-pointer rounded hover:shadow-md">
                Logout
            </button>
        </div>
    );
};

export default Home;
