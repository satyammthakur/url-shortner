import express from "express";
import URL from "../models/url.model.js";

const router = express.Router();

router.get('/' , async(req,res)=>{
    const allurls = await URL.find({});
    return res.render("home" , {
        urls:allurls
    });
} )


export default router;