const {Schema,model}=require('mongoose');

const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        trim: true,
        minlength:3,
        maxlength:30,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
        minlength:8,
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