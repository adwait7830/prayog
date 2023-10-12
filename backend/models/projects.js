const mongoose = require("mongoose");

const projectSchema = mongoose.schema({

    Title : {
        type: String,
        required : true
    },

    Description : {
        type:String ,
        required : true
    },

    CoverImage : {
        type:String,
        required : true
    },

    Category : {
        type:String,
        required : true
    },

    views : {
        type:Number,
        default : 0
    },

    Img1 : {
        type:String,
        
    },

    Img2 : {
        type:String,
    },

    Img3 : {
        type:String,
    },

    Img4 : {
        type:String,
    },

    Img5 : {
        type:String,
    },

    Img6 : {
        type:String,
    },

    Summary : {
        type:Text,
        required : true
    }, 

    OwnerName : {
        type: String,
        required : true
    },

    OwnerCollege : {
        type:Text,
        required : true
    },

},  {    
        timestamp : true,
    }
);


module.exports = mongoose.model("Project", projectSchema);