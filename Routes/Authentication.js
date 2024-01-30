const express=require('express');

const app=express();
const bodyParse=require('body-parser');
const authenticationController=require('../Controller/Authentication');
const router=express.Router();
const LocalStrategy=require('passport-local').Strategy;
const passport=require('passport');
const {User}=require('../Model/model');





require('../Middleware/Authentication')();//initialize middleware4

passport.serializeUser((user, done)=>{
    console.log("serializing user")
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser((id,done)=>{
    console.log("deserializing user")
    console.log(id);
})
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));


//passport.deserializeUser(User.deserializeUser());


router.route('/login').post(passport.authenticate('local', { failureFlash: true }), authenticationController.login);
router.route('/register').post(authenticationController.register);
router.route('/profile').get(passport.authenticate('jwt', { session: false }), authenticationController.profile)


module.exports=router