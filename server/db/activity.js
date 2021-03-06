const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    user:String,
    beg: { type:Date,
         required:true
    },
    end: { type:Date, 
        required:true, 
        validate:[function(v){
        return v > this.beg
    }]},
    Activity:String,
    Note:String
})

const Activity = mongoose.model('activity', activitySchema )

module.exports = Activity