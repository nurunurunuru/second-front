import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

// API to check if user is an admin (you'll need to adjust the URL based on your backend)
const checkIfAdmin = async (email) => {
    try {
        const response = await fetch(`http://localhost:7000/users/admin/${email}`);
        const data = await response.json();
        return data.isAdmin;
    } catch (error) {
        console.error("Error fetching admin status:", error);
        return false;
    }
};

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUserName = (name) => {
        return updateProfile(auth.currentUser, { displayName: name });
    };

    const logOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                setUser(currentUser);
                // Fetch the user's admin status from the backend
                const adminStatus = await checkIfAdmin(currentUser.email);
                setIsAdmin(adminStatus);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const userInfo = {
        createUser,
        userSignIn,
        updateUserName,
        googleLogin,
        user,
        isAdmin, // Add the admin status here
        logOut,
        loading,
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
