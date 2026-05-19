//title,body,author,tags,thumbnail,readingTime,Likes,comments
const {Schema,model}=require('mongoose');

const postSchema=new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:150,
    },
    body:{
        type:String,
        required:true,
        trim:true,
        minlength:10,
        maxlength:5000,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    tags:{
        type:[String],
        required:true,
    },
    thumbnail:{
        type:String,
        default:'',
    },
    readingTime:{
        type:String,
        default:0,
    },
    likes:[Schema.Types.ObjectId],
    dislikes:[Schema.Types.ObjectId],
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:'Comment',
        }
    ],
},
{
    timestamps:true,
}
);

const Post=model('Post',postSchema);
module.exports=Post;