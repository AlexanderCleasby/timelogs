const router = require('express').Router()
const Activity = require('../db/activity')
const ActivityType = require('../db/activitytype')



router.post('/newactivity', (req, res, next) => {
    /*route to take create new activity for the time tracker
    requires a user to be authenticated, and several properties on the req.body:
        1. beg
        2. end
        3. Activity
    Optional:
        1. Note
    // JS date string format'1995-12-17T03:24:00'
    */
    //throw new Error('broke')
    //console.log(toDate(req.query.beg))
    console.log(req.body)


    new Activity({
        user: req.user._id,
        beg: req.body.beg,
        end: req.body.end,
        Activity: req.body.ActivityName,
        Note: req.body.Note
    }).save().then((newActivity) => {
        console.log('saved activity: ', newActivity.beg.toDateString())
        res.sendStatus(200)
    })

    
})

router.get('/getactivities', (req, res, next) => {

    let QueryDate = {
        start: new Date(parseInt(req.query.year), parseInt(req.query.month), parseInt(req.query.day)),
        end: new Date(parseInt(req.query.year), parseInt(req.query.month), parseInt(req.query.day) + 1)
    }

    console.log(req.user._id)
    console.log(QueryDate.start.toString())
    Activity.find({
            user: req.user._id,
            beg: {
                $gte: QueryDate.start,
                $lt: QueryDate.end
            }
        },
        (err, activities) => {
            console.log(activities)
            res.send(activities)
        }
    )


})

router.post('/newactivitytype', (req, res, next) => {
    console.log(req.body.activitytype)
    new ActivityType({
        user: req.user._id,
        activitytype: req.body.activitytype
    }).save().then((newActivityType) => {
        console.log('saved activity type: ', newActivityType.activitytype)
        res.sendStatus(200)    
    })
    
})
module.exports = router

router.get('/getactivitytypes', (req, res, next) => {
    ActivityType.find({
            user: req.user._id,
        },
        (err, activitytypes) => {
            res.send(activitytypes)
        })
})