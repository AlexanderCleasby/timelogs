const router = require('express').Router()
const passport = require('passport')

router.get('/google',passport.authenticate('google', {
    scope:['profile']
}));

router.get('/google/callback/',passport.authenticate('google'),(req,res)=>{
    res.redirect('/')
})

router.get('/user', (req, res) => {
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

router.get('/logout', (req, res) => {
	if (req.user) {
            req.logout();
		return res.redirect('/')
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})


module.exports = router