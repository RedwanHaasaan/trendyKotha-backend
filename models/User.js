const {Schema,model}=require('mongoose');

const userSchema = new Schema({
    name:{
        type:String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:30,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        trim: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
        minlength:6,
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:'Profile',
    }
},
{
    timestamps:true,
}
)

const User = model('User',userSchema);

module.exports = User;