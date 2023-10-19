import { Navigate } from "react-router-dom";

const Logout = () => {
    localStorage.removeItem("authTokens");

    return(
        <Navigate to="/login"
        replace
        state={{ message: "You have successfully logged out!" }}
        />
    )
}

export default Logout;