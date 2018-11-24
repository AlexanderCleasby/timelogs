const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activityTypeSchema = new Schema({
    user:String,
    activitytype:String
})

const ActivityType = mongoose.model('activityType', activityTypeSchema )

module.exports = ActivityType