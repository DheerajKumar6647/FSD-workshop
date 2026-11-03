import express from 'express';
const app = express();
app.use(express.json());

app.get('/' ,(req , res)=>{
    res.send('Hello , world!');
});
app.get('/api/student' , (req))
app.listen(3000 , ()=>{
    console.log('server is running on port 3000');
})
