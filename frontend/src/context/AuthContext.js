import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert2';

const AuthContext = createContext();
const getStoredTokens = () => {
    try {
        return JSON.parse(localStorage.getItem("authTokens")) || null;
    } catch {
        return null;
    }
};

const token = getStoredTokens() ? getStoredTokens().access : null;

let decodedToken;
if (token && typeof token === 'string' && token.split('.').length === 3) {
    try {
        decodedToken = jwtDecode(token);
    } catch (error) {
        console.error("Failed to decode token:", error);
    }
}
const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    return decoded.exp < currentTime;
};

const AuthProvider = ({ children }) => {
    const history = useHistory();

    const getStoredTokens = () => {
        try {
            return JSON.parse(localStorage.getItem("authTokens")) || null;
        } catch {
            return null;
        }
    };

    const decodeToken = (token) => {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    }

    const [authTokens, setAuthTokens] = useState(getStoredTokens);
    
    const [user, setUser] = useState(() => {
        if (authTokens && authTokens.access) {
            return jwtDecode(authTokens.access);
        } else {
            return null;
        }
    });
    

    const [loading, setLoading] = useState(true);

    const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await response.json();
        
        if (response.status === 200) {
            console.log("Logged In");
            setAuthTokens(data);
            const decodedUser = decodeToken(data.access);
            setUser(decodedUser);
            localStorage.setItem("authTokens", JSON.stringify(data));
            history.push("/");
            swal.fire({
                title: "Login Successful",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
            });
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "Username or password does not exist",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
            });
        }
    };

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        });
        if (response.status === 201) {
            history.push("/login");
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
            });
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occurred " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
            });
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history.push("/login");
        swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,
        });
    };

    useEffect(() => {
    if (authTokens && authTokens.access) {
        try {
            if (isTokenExpired(authTokens.access)) {
                console.error("Token has expired");
                localStorage.removeItem("authTokens");
                setUser(null);
            } else {
                const decodedUser = jwtDecode(authTokens.access);
                setUser(decodedUser);
            }
        } catch (error) {
            console.error("Failed to decode token:", error);
            setUser(null);
            localStorage.removeItem("authTokens");
        }
    } else {
        setUser(null);
    }
    setLoading(false);
}, [authTokens]);


    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };