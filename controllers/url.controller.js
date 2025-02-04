import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

export async function handleGenerateNewShortURL(req, res) {
    try {
        // console.log("Controller reached. Request body:", req.body); // Debugging

        const body = req.body;
        if (!body.url) {
            console.error("Missing URL in request body");
            return res.status(400).json({ error: "URL is required" });
        }

        const shortID = nanoid(8);
        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });

        // console.log("Short URL generated:", shortID);
        return res.json({ id: shortID });
    } catch (err) {
        console.error("Error in controller:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function handleGetAnalytics(req, res) {
    try {
        const { shortId } = req.params;
        
        if (!shortId) {
            return res.status(400).json({ error: 'Short ID is required' });
        }
        
        const result = await URL.findOne({ shortId });
        
        if (!result) {
            return res.status(404).json({ error: 'URL not found' });
        }
        
        return res.json({ 
            totalClicks: result.visitHistory.length, 
            analytics: result.visitHistory.slice(0, 100), // Limit to recent 100 clicks
        });
    } catch (error) {
        console.error('Analytics retrieval error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}