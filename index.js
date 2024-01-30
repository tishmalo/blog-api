const express=require('express');
const bodyParse=require('body-parser');
const database=require('./Utils/database');
const session=require('express-session');


const app=express();
const port=process.env.PORT||3020;
app.use(express.json());
app.use(session({
    secret:process.env.SESSIONSECRET,
    resave:false,
    saveUninitialized:false,
    cookie: { secure: true, httpOnly: true, maxAge: 3600000 }, 

}))

//routers
const authenticationRouters=require('./Routes/Authentication');
const blogRouters=require('./Routes/Blogs');

app.use('/api/v1/authentication', authenticationRouters);

app.use('/api/v1/blogs', blogRouters);

app.get('/api/v1', (req, res)=>{
    res.status(200).send({
        message:"you have reached the homepage of the blog API"
    });
})

const startServer=async ()=>{
    try {
        await database.connect();
        console.log('database connected successfully');
    
        app.listen(port, ()=>{
            console.log(`listening on port: ${port}`)
        })
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);
    }
   
}

//check how the database has been disconnected
process.on('SIGINT', async () => {
    try {
        await database.disconnect();
        console.log('Disconnected from the database');
        process.exit(0);
    } catch (error) {
        console.error('Error disconnecting from the database:', error.message);
        process.exit(1);
    }
});

startServer();

