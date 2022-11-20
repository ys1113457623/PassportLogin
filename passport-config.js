const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
function initialize(passport,getUserByEmail){
    const authenticateUser = async (email,password,done) => { 

        const user = getUserByEmail(email)
        if(user == null){
            return done(null,false,{message: 'No user with that email'})
        }

        try{
            if(await bcrypt.compare(password, user.password)){

            } else {
                return done(null,false, {message : 'Password incorrect'})
            }
        } catch(e) {
            return done(e)
        }

    }
    passport.use(new LocalStrategy({usernameFiels: 'email'}),
    authenticateUser)
    passport.serializeUser((user,done) => { })
    passport.deserializUser((id,done) => { })
    
}

module.exports = initialize