import mongoose from "mongoose";

const logEventSchema = new mongoose.Schema({
    userId: String,
}, {
    timestamps: true,
});

const LogEvent = mongoose.model("LogEvent", logEventSchema);

export default LogEvent;