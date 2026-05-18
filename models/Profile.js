const {Schema,model}=require('mongoose');
const Post = require('./Post');
const userSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
    },
    fullname:{
        type:String,
        trim:true,
        minlength:3,
        maxlength:100,
    },
    bio:{
        type:String,
        trim:true,
        maxlength:500,
        default:'',
    },
    profilepicture:{
        type:String,
        default:'',
    },
    links:{
        website:String,
        twitter:String,
        facebook:String,
        linkedin:String,
        github:String,
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:Post,
        }
    ],
    bookmarks:[
        {
            type:Schema.Types.ObjectId,
            ref:Post,
        }
    ]
},
{
    timestamps:true,
});

const Profile = model('Profile',userSchema);

module.exports = Profile;