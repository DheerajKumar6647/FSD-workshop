import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:4010/login", {
                id: username,
                password
            });
            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                alert("Invalid User ID or password");
            } else {
                alert("Backend is not connecting to server");
            }
        }
    };

    const handleNewUser = () => {
    navigate("/signup");
    };

    return (
        <>
            <style>{`
                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                }

                .login-container {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #f2f2f2;
                }

                .login-box {
                    width: 400px;
                    padding: 35px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                }

                h1 {
                    text-align: center;
                    margin-bottom: 10px;
                }

                .subtitle {
                    text-align: center;
                    color: #666;
                    margin-bottom: 25px;
                }

                label {
                    display: block;
                    margin: 15px 0 6px;
                    font-weight: bold;
                }

                input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    font-size: 15px;
                }

                .buttons {
                    display: flex;
                    gap: 10px;
                    margin-top: 25px;
                }

                button {
                    flex: 1;
                    padding: 11px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 15px;
                }
            `}</style>

            <div className="login-container">
                <div className="login-box">

                    <h1>Login</h1>

                    <p className="subtitle">
                        Login to your account
                    </p>

                    <form onSubmit={handleLogin}>

                        <label>User ID</label>

                        <input
                            type="text"
                            placeholder="Enter User ID"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="buttons">

                            <button type="submit">
                                Login
                            </button>

                            <button
                                type="button"
                                onClick={handleNewUser}
                            >
                                New User
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};

export default Login;