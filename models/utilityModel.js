const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    logo:{
        type:String,
        default:""
    },
    fullName:{
        type:String,
        default:"",
        
    },
    designation:{
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    },
    aboutPhoto:{
        type:String,
        default:""
    },
    facebook:{
        type:String,
        default:""
    },
    twitter:{
        type:String,
        default:""
    },
    instagram:{
        type:String,
        default:""
    },
    youtube:{
        type:String,
        default:""
    }
}, {
    timestamps:true
})

const Utility = mongoose.model('utility',schema)
module.exports = Utility