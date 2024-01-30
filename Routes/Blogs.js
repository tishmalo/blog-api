const express=require('express');
const app=express();
const router=express.Router();
const blogController=require('../Controller/Blog');
const LocalStrategy=require('passport-local').Strategy;
const passport=require('passport');
const {User}=require('../Model/model');


require('../Middleware/Authentication')();//initialize middleware

app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());


router.route('/getBlog').get(blogController.getAllBlogs);
router.route('/getBlog/:id').get(passport.authenticate('jwt', {session:false}), blogController.getBlogById);
router.route('/postBlog').post(passport.authenticate('jwt', {session:false}), blogController.postBlog);
router.route('/editBlog/:id').put(passport.authenticate('jwt', {session:false}), blogController.editBlog);
router.route('/deleteBlog/:id').delete(passport.authenticate('jwt', {session:false}), blogController.deleteBlog);

module.exports=router;