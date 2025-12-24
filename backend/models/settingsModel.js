import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    deliveryFee: {type: Number, default: 5},
    taxRate: {type: Number, default: 0},
    isStoreOpen: {type: Boolean, default: true},
    estimatedDeliveryTime: {type: String, default: "30-45 min"}
}, { minimize: false }) 
// minimize: false ensures empty objects are saved if needed, though we have defaults.

const settingsModel = mongoose.models.settings || mongoose.model("settings", settingsSchema);

export default settingsModel;