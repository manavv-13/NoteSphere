const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
},
title:{
    type:String,
    required:true,
},
content:{
    type:String,
    required:true
},
tag:{
    type:String,
    default:"General"
},
date:{
    type:Date,
    default:Date.now
},
});

const Note = mongoose.model('Note', noteSchema);
module.exports=Note;