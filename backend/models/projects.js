const mongoose = require("mongoose");

const projectSchema = mongoose.schema({

    Title : {
        type: String,
        required : [true, "Please add the Title of the Project."]
    },

    Description : {
        type:String ,
        required : [true, "Please add the Description of the Project."]
    },

    CoverImage : {
        type:String,
        required : [true, "Please add the CoverImage of the Project."]
    },

    Stream : {
        type:String,
        required : [true, "Please add the Title of the Project."]
    },

    views : {
        type:Number,
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
        required : [true, "Please add the Summary of the Project."]
    }, 

    OwnerName : {
        type: String,
        required : [true, "Please add name of Owner of the Project."]
    },

    OwnerCollege : {
        type:Text,
        required : [true, "Please add your College."]
    },

},  {    
        timestamp : true,
    }
);


module.exports = mongoose.model("Project", projectSchema);