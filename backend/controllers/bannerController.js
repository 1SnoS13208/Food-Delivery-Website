import bannerModel from "../models/bannerModel.js";
import fs from 'fs';

// add banner
const addBanner = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const banner = new bannerModel({
        image: image_filename
    });
    try {
        await banner.save();
        res.json({ success: true, message: "Banner Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// list banners
const listBanners = async (req, res) => {
    try {
        const banners = await bannerModel.find({});
        res.json({ success: true, data: banners });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// remove banner
const removeBanner = async (req, res) => {
    try {
        const banner = await bannerModel.findById(req.body.id);
        fs.unlink(`uploads/${banner.image}`, () => {});
        await bannerModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Banner Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addBanner, listBanners, removeBanner };