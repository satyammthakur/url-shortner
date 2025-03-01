import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectToMongoDB } from "./connect.js";
import URL from "./models/url.model.js";
import cookieParser from "cookie-parser";
import urlRoute from "./routes/url.route.js";
import userRoute from "./routes/user.route.js";
import staticRouter from "./routes/static.route.js";
import { restrictToLoggedInUserOnly , checkAuth } from "./middlewares/auth.middleware.js";


dotenv.config();
const app = express();
app.set("view engine" , "ejs" );
app.set('views' , path.resolve("./views")); 


app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user" , userRoute );
app.use("/" , checkAuth , staticRouter);

const PORT = 8001;




app.get('/:shortId' , async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push:{
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    })
    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    res.redirect(entry.redirectURL);
})

app.get('/' , (req,res)=>{
    res.send("hello from satyam")
})

connectToMongoDB(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DBNAME}retryWrites=true&w=majority`)
.then(()=>{
    console.log("connected to the db");
    app.listen(PORT , ()=>{
        console.log(`server started on the port: ${PORT} `);
    })
})
.catch((error) => {
    console.log("Connection failed");
    console.error("Error details:", error.message);
});


