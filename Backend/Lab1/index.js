import {EventEmitter} from "node:events";
const task = new EventEmitter();

task.on("greet" , (name) =>{
    console.log(`hello , ${name}! Welcome to the session .`);
});
task.on("exit" , (reason) =>{
    console.log(`Session ending . Reason : ${reason}`);
});
task.on("greet" , () =>{
    console.log("Class startd by Chandrahas Mishra .");
});
task.on("exit" , () =>{
    console.log("Class startd by Chandrahas Mishra ");
});

task.on("start" , (course) =>{
    console.log(`${course} started`);
});
task.emit("greet" ,"Students");
task.emit("exit" , "Class completed");
task.emit("start" , "dsa");