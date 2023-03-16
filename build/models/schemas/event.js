"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
// create a trigger or cron job to update is Archived
let eventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    address: { type: String },
    isArchived: { type: Boolean, required: true, default: false },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { timestamps: true });
eventSchema.pre("findOneAndUpdate", function () {
    const update = this.getUpdate();
    if (!update) {
        return;
    }
    if (update.__v != null) {
        delete update.__v;
    }
    const keys = ["$set", "$setOnInsert"];
    for (const key of keys) {
        if (update[key] != null && update[key].__v != null) {
            delete update[key].__v;
            if (Object.keys(update[key]).length === 0) {
                delete update[key];
            }
        }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
});
module.exports = mongoose.model("event", eventSchema);
