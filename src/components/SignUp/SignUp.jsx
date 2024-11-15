// src/components/SignUp/SignUp.js
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const SignUp = () => {
    const { createUser, updateUserName, googleLogin } = useContext(AuthContext);
    const [authError, setAuthError] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSignUp = (data) => {
        createUser(data.email, data.password)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Your account has been created",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                updateUserName(data.name)
                    .then(() => {
                        saveTheUser(data.name, data.email, data.userType);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((error) => {
                setAuthError(error.message);
            });
    };

    const saveTheUser = (name, email, userType) => {
        const user = { name, email, userType };
        fetch("http://localhost:7000/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledge) {
                    toast.success("Account created successfully!");
                    navigate("/login"); // Redirect to login page
                }
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Your account has been created using Google",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                navigate("/login"); // Redirect to login page
            })
            .catch((error) => {
                setAuthError(error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-gray-100 duration-200">
            <div className="hero-content flex-col">
                <div className="card w-full max-w-md shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800 text-gray-800 dark:text-black transform hover:shadow-2xl transition duration-300">
                    <h1 className="text-3xl font-bold text-center mt-6 text-indigo-600 dark:text-purple-400">Sign Up</h1>
                    <form onSubmit={handleSubmit(handleSignUp)} className="card-body p-8">
                        <div className="form-control mb-4">
                            <label className="label font-medium text-lg text-gray-700 dark:text-gray-300">Name</label>
                            <input {...register("name", { required: "Please enter your valid name" })}
                                   type="text" placeholder="Name" 
                                   className="input input-bordered w-full p-3 rounded-md" />
                            {errors.name && <span className='text-red-500 mt-2'>{errors.name.message}</span>}
                        </div>
                        <div className="form-control mb-4">
                            <label className="label font-medium text-lg text-gray-700 dark:text-gray-300">Email</label>
                            <input {...register("email", { required: "Please enter your valid email" })}
                                   type="email" placeholder="Email" 
                                   className="input input-bordered w-full p-3 rounded-md" />
                            {errors.email && <span className='text-red-500 mt-2'>{errors.email.message}</span>}
                        </div>
                        <div className="form-control mb-4">
                            <label className="label font-medium text-lg text-gray-700 dark:text-gray-300">Password</label>
                            <input {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be 8 characters long" } })}
                                   type="password" placeholder="Password" 
                                   className="input input-bordered w-full p-3 rounded-md" />
                            {errors.password && <span className='text-red-500 mt-2'>{errors.password.message}</span>}
                        </div>
                        <div className="form-control mb-6">
                            <label className="label font-medium text-lg text-gray-700 dark:text-gray-300">User Type</label>
                            <select {...register("userType")} className="select select-bordered w-full p-3 rounded-md">
                                <option value="buyer" defaultValue>Buyer</option>
                                <option value="seller">Seller</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button type='submit' className="btn bg-indigo-600 text-white w-full py-3 rounded-md">SIGN UP</button>
                        {authError && <p className='text-red-500 text-center mt-2'>{authError}</p>}
                        <p className='text-sm text-center mt-4 text-gray-600'>Already have an account? <Link className='text-indigo-600' to='/login'>Please Login</Link></p>
                        <div className="divider my-6 text-center dark:text-white duration-200">OR</div>
                        <button onClick={handleGoogleLogin} className="btn btn-outline w-full py-3 btn btn-outline bg-white hover:bg-gray-100 text-indigo-600  rounded-md border border-indigo-600 hover:border-indigo-700 transition duration-200 font-semibold">CONTINUE WITH GOOGLE</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
