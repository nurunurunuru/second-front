
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const SignUp = () => {
    const { createUser, updateUserName } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { name, email, password, userType } = data;
        try {
            await createUser(email, password);
            await updateUserName(name);

            const user = { name, email, userType };
            await fetch('http://localhost:7000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder="Name" required />
            <input {...register('email')} placeholder="Email" required />
            <input {...register('password')} placeholder="Password" type="password" required />
            <select {...register('userType')} defaultValue="buyer">
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
