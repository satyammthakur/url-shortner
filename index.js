import express from "express";
// import urlRoute from "./routes/url.route.js";
import dotenv from "dotenv";
import path from "path";
import { connectToMongoDB } from "./connect.js";
// import URL from "../models/url.model.js";
import URL from "./models/url.model.js";
import urlRoute from "./routes/url.route.js";
import staticRouter from "./routes/static.route.js";
dotenv.config();
const app = express();
app.use(express.json()); 

app.use("/url", urlRoute);
app.use("/" , staticRouter);

const PORT = 8001;
// app.use("/url" , urlRoute);
// app.use(express.json());

app.set("view engine" , "ejs" );
app.set('views' , path.resolve("./views"));


app.get("/test" , async (req,res)=>{    
    const allURLs = await URL.find({});
    return res.render("home" , {
        urls: allURLs,
    });
})
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


