const mongoose = require("mongoose");
require("dotenv").config();

const mongoDBURI = process.env.MONGODB_URI;

const connect = async () => {
    try {
        console.log("⌛ Connecting to MongoDB...");
        await mongoose.connect(mongoDBURI);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error", error);
    }
};

module.exports = { connect };
