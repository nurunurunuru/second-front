// src/components/Login/Login.js
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
    const { userSignIn, googleLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLogin = (data) => {
        userSignIn(data.email, data.password)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Login Successful",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setLoginError(error.message);
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Login Successful with Google",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setLoginError(error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-indigo-600 dark:from-dark dark:to-gray-900 text-black duration-200">
            <div className="hero-content flex-col">
                <div className="card w-full max-w-md shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800 text-gray-800 dark:text-black transform hover:shadow-2xl transition duration-300">
                    <h1 className="text-3xl font-bold text-center mt-6 text-indigo-600 dark:text-purple-400">Login</h1>
                    <form onSubmit={handleSubmit(handleLogin)} className="card-body p-8">
                        <div className="form-control mb-4">
                            <label className="label font-medium text-lg text-gray-700 dark:text-gray-300">Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    {...register("email", { required: "Enter a valid email" })}
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered pl-10 w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-600"
                                />
                            </div>
                            {errors.email && <span className="text-red-500 mt-2">{errors.email.message}</span>}
                        </div>
                        <div className="form-control mb-6">
                            <label className="label font-medium text-lg text-gray-700 dark:text-gray-300">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    {...register("password", { required: "Password is required" })}
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered pl-10 w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-600"
                                />
                            </div>
                            {errors.password && <span className="text-red-500 mt-2">{errors.password.message}</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded-md transition duration-200 font-semibold">LOGIN</button>
                        </div>
                        {loginError && <p className="text-red-500 text-center mt-2">{loginError}</p>}
                        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
                            New to the platform? <Link to="/signup" className="text-indigo-600 hover:underline dark:text-purple-400">Create an account</Link>
                        </p>
                        <div className="divider my-6 text-blue-500 text-center">OR</div>
                        <div className="form-control">
                            <button onClick={handleGoogleLogin} className="btn btn-outline bg-white hover:bg-gray-100 text-indigo-600 w-full py-3 rounded-md border border-indigo-600 hover:border-indigo-700 transition duration-200 font-semibold">
                              <FaGoogle className="inline mr-2"/>  CONTINUE WITH GOOGLE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
