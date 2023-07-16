const mongoose = require('mongoose');


const DB = process.env.DATABASE;


mongoose.set('strictQuery',true)
const connectDB = async ()=>{
  try{
    const conn = await mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    console.log("Server is Connected")
  } catch(err){
    console.log('no connection');
    console.log(err)
  }
    
}

module.exports = connectDB