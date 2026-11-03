import express from "express";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());

// Users
const userdata = [
    {
        id: 1,
        name: "cm",
        email: "c.m@abes.ac.in",
        password: "1234"
    }
];

// GET message
app.get("/msg", (req, res) => {
    res.status(200).json({
        message: "welcome user"
    });
});

// GET users
app.get("/user", (req, res) => {
    res.status(200).json({
        message: "Data Received",
        userdata
    });
});

// CREATE USER / SIGNUP
app.post("/create", (req, res) => {
    try {
        const { id, name, email, password } = req.body;

        const newuser = {
            id,
            name,
            email,
            password
        };

        userdata.push(newuser);

        console.log("New User:", newuser);

        res.status(201).json({
            message: "user created successfully",
            newuser
        });

    } catch (err) {
        console.error("Error:", err.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// LOGIN
app.post("/login", (req, res) => {
    try {
        const { id, password } = req.body;

        console.log("Login Request:", id, password);
        console.log("All Users:", userdata);

        const user = userdata.find(
            (u) => String(u.id) === String(id) && u.password === password
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid User ID or password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (err) {
        console.error("Login Error:", err.message);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// EDIT USER
app.put("/edit/:id", (req, res) => {
    const id1 = req.params.id;

    const index = userdata.findIndex(
        (u) => String(u.id) === String(id1)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "user not found"
        });
    }

    const { id, name, email, password } = req.body;

    userdata[index] = {
        id,
        name,
        email,
        password
    };

    res.status(200).json({
        message: "user updated successfully"
    });
});

// SERVER
app.listen(4010, () => {
    console.log("server is running on port 4010");
});