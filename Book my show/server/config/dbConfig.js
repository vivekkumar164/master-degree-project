
const mongoose = require('mongoose');

mongoose.connect(process.env.dbUrl).then(()=>{
    console.log("DB connection established");
}).catch((err)=>{
    console.log("DB connection failed",err);
})

// mongoose.connect(process.env.dbUrl);

// const connection = mongoose.connection;

// connection.on('connected', () =>{
//     console.log("Connection unsuccessful:");
// })

// connection.on('error', () =>{
//     console.log("Connection unsuccessful:");
// })


