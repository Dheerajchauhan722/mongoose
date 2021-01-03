const mongoose=require("mongoose");
var validator = require('validator');

// connection creation with studentdb
//then and catch is like if else
mongoose.connect("mongodb://localhost:27017/teacherdb",{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("connection successfull....")).catch((err)=>console.log(err));

//defining schema
const playlistSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase:true// mongoose inbuilt validators
    },
    ctype:String,
    videos:{
        type:Number,
        validate(value)// custum validators
        {
            if(value<0)
            {
                throw new Error("videos count cannot be negative");
            }
        }
    },
    author:String,
    email:{
        type:String,
        // required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }

    },
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }
})

//collection creation
const Playlist=new mongoose.model("Playlist",playlistSchema);

//create or insert document
const createDocument=async()=>{
    try{
        const reactPlaylist= new Playlist({
            name:"ny4",
            ctype:"Front end",
            videos:40,
            author:"Dheeraj",
            // email:"chau@gmail.com",
            active:true,
        })

        const NodePlaylist= new Playlist({
            name:"ifsmall_letters",
            ctype:"Back end",
            videos:40,
            author:"Dheeraj",
            email:"chauhandheeraj722@gmail.com",
            active:true,
        })
        
        const result=await Playlist.insertMany([reactPlaylist,NodePlaylist]);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
    
    
}
// async and await is better then promise so we did this
createDocument()


const getDocument=async ()=>{
    try{
        const read_result=await Playlist.find().select({name:1}).sort({name:-1});
    // const read_result=await Playlist.find({name:"Node JS"}).select({name:1}).limit(1);
    // atplace of limit we can use .countDocuments()
    console.log(read_result);
    }
    catch(err){
        console.log(err);
    }
    
}
// read documents
// getDocument();

const updateDocument=async (_id)=>{
    try{
        const update_result=await Playlist.findByIdAndUpdate({_id},{
            $set:{name:"Machine Learning"}
            
        },{
            new:true,
            useFindAndModify:false
        });
        console.log(update_result);
    }
    catch(err){
        console.log(err);
    }
}

// updateDocument("5fe9404ee6e5f5322c058156");


//delete the document
const deleteDocument=async (_id)=>{
    try{
        //findByIdAndDelete
        const delete_result=await Playlist.findByIdAndDelete({_id});
        console.log(delete_result);
    }catch(err){
        console.log(err);
    }
}

// deleteDocument("5fe94019018a873f7cea0aad");
