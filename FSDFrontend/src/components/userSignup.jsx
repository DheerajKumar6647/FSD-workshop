import React, { useState } from "react";

const UserSignup = () => {

    const [user, setUser] = useState({
        userId: "",
        name: "",
        email: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user, // Spread operator used to copy the data  to change
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:4010/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: user.userId,
                name: user.name,
                email: user.email
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Response:", data);
            alert("User created successfully!");

            setUser({
                userId: "",
                name: "",
                email: ""
            });
        } else {
            alert("Failed to create user");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Backend server se connect nahi ho pa raha");
    }
};

    const handleSave = () => {
        console.log("Saved:", user);
        alert("Data saved successfully!");
    };

    const handleReset = () => {
        setUser({
            userId: "",
            name: "",
            email: ""
        });
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

                .signup-container {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #f2f2f2;
                }

                .signup-box {
                    width: 400px;
                    padding: 35px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                }

                h1 {
                    text-align: center;
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
                }
            `}</style>

            <div className="signup-container">
                <div className="signup-box">

                    <h1>Sign Up</h1>
                    <p className="subtitle">Create your account</p>

                    <form onSubmit={handleSubmit}>

                        <label>User ID</label>
                        <input
                            type="text"
                            name="userId"
                            value={user.userId}
                            onChange={handleChange}
                            placeholder="Enter User ID"
                        />

                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                        />

                        <div className="buttons">
                            <button type="submit">Submit</button>

                            <button type="button" onClick={handleSave}>
                                Save
                            </button>

                            <button type="button" onClick={handleReset}>
                                Reset
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
};

export default UserSignup;