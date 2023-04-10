import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
const Register = () => {
    const { registerUser, wait } = useContext(UserContext);
    const [errMsg, setErrMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const onChangeInput = (e) => {
        console.log({ e });
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!Object.values(formData).every((val) => val.trim() !== "")) {
            setSuccessMsg(false);
            setErrMsg("Please fill in all required fields!");
            return;
        }

        const data = await registerUser(formData);
        if (data.success) {
            e.target.reset();
            setSuccessMsg("You have successfully registered.");
            setErrMsg(false);
        } else if (!data.success && data.message) {
            setSuccessMsg(false);
            setErrMsg(data.message);
        }
    };

    return (
        <div className="max-w-sm mx-auto px-0 pt-5 pb-12">
            <h2 className="text-center mt-2.5 uppercase text-3xl">Sign Up</h2>
            <form className="flex flex-col flex-wrap" onSubmit={submitForm}>
                <label className="font-bold" htmlFor="firstName">
                    First Name:
                </label>
                <input
                    className="p-2.5 text-base border border-gray-50 hover:border-gray-400 rounded focus:border-blue-600 mb-1.5"
                    type="text"
                    name="firstName"
                    onChange={onChangeInput}
                    placeholder="Your First Name"
                    id="firstName"
                    value={formData.firstName}
                    required
                />
                <label className="font-bold" htmlFor="lastName">
                    Last Name:
                </label>
                <input
                    className="p-2.5 text-base border border-gray-50 hover:border-gray-400 rounded focus:border-blue-600 mb-1.5"
                    type="text"
                    name="lastName"
                    onChange={onChangeInput}
                    placeholder="Your Last Name"
                    id="lastName"
                    value={formData.lastName}
                    required
                />
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
                    placeholder="New password"
                    id="password"
                    value={formData.password}
                    required
                />
                {successMsg && <div className="text-white border border-gray-200 bg-green-400 rounded p-2.5">{successMsg}</div>}
                {errMsg && <div className="text-red-600 border border-red-600 rounded p-2.5">{errMsg}</div>}
                <button
                    type="submit"
                    className="bg-blue-600 text-white border border-gray-200 rounded py-3 px-0 cursor-pointer shadow-xl mt-1.5 font-bold w-full disabled:bg-blue-300 disabled:hover:shadow-none"
                    disabled={wait}
                >
                    Sign Up
                </button>
                <div className="text-center pt-2.5">
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
