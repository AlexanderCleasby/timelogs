


module.exports = {
    google:{
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    mlab:{
        uri:process.env.MLAB_URI,
        user:process.env.MLAB_USER,
        pw:process.env.MLAB_PW
    },
    session:{
        cookieKey:process.env.COOKIE_KEY
    }
}