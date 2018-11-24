const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   name:{
       first: String,
       last:String
   },
   strategy:String,
   gid:String
})

const User = mongoose.model('user', userSchema )

module.exports = User;