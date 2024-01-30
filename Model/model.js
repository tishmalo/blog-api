const mongoose=require('mongoose');
//we will use passport js incase we want to implement other forms of authentication
const passportLocalMongoose=require('passport-local-mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User' 
    },
    body: { 
        type: String, 
        required: true 
    }
}, { timestamps: true }); 

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide a username']
    },
    password: {
        type: String,
        minlength: [8, 'Password should be at least 8 characters'],
    },
    email: {
        type: String,   
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        unique:true,
        lowercase: true,
        trim: true,
    },
    blogs: {
        type: [BlogSchema]
    }
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
const Blog = mongoose.model('Blog', BlogSchema);

module.exports={
    User,
    Blog
}