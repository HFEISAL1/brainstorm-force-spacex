import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
const Login = () => {
    const { loginUser, wait, loggedInCheck } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!Object.values(formData).every((val) => val.trim() !== "")) {
            setErrMsg("Please fill in all required fields!");
            return;
        }

        const data = await loginUser(formData);
        if (data.success) {
            e.target.reset();
            setRedirect("Redirecting...");
            await loggedInCheck();
            return;
        }
        setErrMsg(data.message);
    };

    return (
        <div className="max-w-sm mx-auto px-0 pt-5 pb-12">
            <h2 className="text-center mt-2.5 uppercase text-3xl">Login</h2>
            <form className="flex flex-col flex-wrap" onSubmit={submitForm}>
                <label className="font-bold" htmlFor="email">
                    Email:
                </label>
                <input
                    className="p-2.5 text-base border border-gray-50 hover:border-gray-400 rounded focus:border-blue-600 mb-1.5"
                    type="email"
                    name="email"
                    onChange={onChangeInput}
                    placeholder="Your email"
                    id="email"
                    value={formData.email}
                    required
                />
                <label className="font-bold" htmlFor="password">
                    Password:
                </label>
                <input
                    className="p-2.5 text-base border border-gray-50 hover:border-gray-400 rounded focus:border-blue-600 mb-1.5"
                    type="password"
                    name="password"
                    onChange={onChangeInput}
                    placeholder="Password"
                    id="password"
                    value={formData.password}
                    required
                />
                {errMsg && <div className="text-red-600 border border-red-600 rounded p-2.5">{errMsg}</div>}
                {redirect ? (
                    redirect
                ) : (
                    <button
                        type="submit"
                        className="bg-blue-600 text-white border border-gray-200 rounded py-3 px-0 cursor-pointer shadow-xl mt-1.5 font-bold w-full disabled:bg-blue-300 disabled:hover:shadow-none"
                        disabled={wait}
                    >
                        Login
                    </button>
                )}
                <div className="text-center pt-2.5">
                    <Link to="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
