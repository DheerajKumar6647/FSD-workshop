import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div style={styles.container}>
            <div style={styles.box}>

                <h1>Welcome Dheeraj</h1>

                <p>You have successfully logged in.</p>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2"
    },

    box: {
        background: "white",
        padding: "50px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 5px 20px rgba(0,0,0,0.15)"
    }
};

export default Dashboard;