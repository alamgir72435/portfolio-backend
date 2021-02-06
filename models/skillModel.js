const mongoose = require("mongoose");


const Contact = new mongoose.Schema({
    skillHeader:{
        type:String
    },
    skillDescription:{
        type:String
    },
    firstSkill:{
        percent:{
            type:String
        },
        name:{
            type:String
        },
        desc:{
            type:String
        }
    },
    secondSkill:{
        percent:{
            type:String
        },
        name:{
            type:String
        },
        desc:{
            type:String
        }
    },
    thirdSkill:{
        percent:{
            type:String
        },
        name:{
            type:String
        },
        desc:{
            type:String
        }
    },
    fourthSkill:{
        percent:{
            type:String
        },
        name:{
            type:String
        },
        desc:{
            type:String
        }
    },
    
}, {
    timestamps:true
})

const Skill = mongoose.model('skills',schema)
module.exports = Skill