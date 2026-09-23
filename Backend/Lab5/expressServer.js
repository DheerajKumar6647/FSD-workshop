import express from "express";
import cors from "cors";
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

app.post("/create", (req, res) => {
    try {
        const { id, name, email } = req.body;

        const newuser = {
            id,
            name,
            email
        };

        userdata.push(newuser);

        res.status(201).json({
            message: "user created successfully",
            newuser
        });

    } catch (err) {
        console.error("Error:", err.message);

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