import express from "express";
import { handleGenerateNewShortURL , handleGetAnalytics } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        // console.log("Received request body:", req.body); // Debugging
        await handleGenerateNewShortURL(req, res);
    } catch (err) {
        console.error("Error in POST request:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/analytics/:shortId' , handleGetAnalytics);

export default router;
