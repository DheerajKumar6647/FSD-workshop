import express from "express";
import cors from "cors";
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const app = express();
app.use(cors());
app.use(express.json());
const userdata = [{
    id : 1,
    name : "cm",
    email : "c.m@abes.ac.in"
}];
app.get("/msg" , (req , res) => {
    res.status(200).json({
        "message" : "welcome user"
    })
});

app.get("/user" , (req , res) =>{
    res.status(200).json({
        "message" : "Data Received" , userdata
    })
});

app.post("/create", async (req, res) => {
    try {
        const { id, name, email, password } = req.body;
        if (![id, name, email, password].every((value) => typeof value === "string" && value.trim())) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const passwordSalt = randomBytes(16).toString("hex");
        const passwordHash = (await scrypt(password, passwordSalt, 64)).toString("hex");

        const newuser = {
            id,
            name,
            email,
            passwordSalt,
            passwordHash
        };

        userdata.push(newuser);

        res.status(201).json({
            message: "user created successfully",
            newuser: { id, name, email }
        });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ message: "Could not create user" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { id, password } = req.body;
        if (typeof id !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "User ID and password are required" });
        }

        const user = userdata.find((entry) => String(entry.id) === id);
        if (!user?.passwordSalt || !user.passwordHash) {
            return res.status(401).json({ message: "Invalid User ID or password" });
        }

        const passwordHash = await scrypt(password, user.passwordSalt, 64);
        const storedHash = Buffer.from(user.passwordHash, "hex");
        if (!timingSafeEqual(passwordHash, storedHash)) {
            return res.status(401).json({ message: "Invalid User ID or password" });
        }

        res.status(200).json({
            message: "login successful",
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Could not log in" });
    }
});

app.put("/edit/:id" , (req,res)=>{
    const id1 = req.params.id;
    const index = userdata.findIndex((u) => u.id == id1);
    if(index == -1){
        res.end("user not found");
    }
    const {id,name,email} = req.body;
    userdata[index] = {id , name , email};
    res.status(201).json({"message" : "user updated successfully"});
})

app.listen(4010 , ()=>{
    console.log("server is running on port 4010");
})