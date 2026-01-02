import categoryModel from "../models/categoryModel.js";
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

// Add Category
const addCategory = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: "No image file provided" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'bkfood/uploads',
            resource_type: 'image'
        });

        // Delete the temporary file from local storage
        fs.unlink(req.file.path, () => {});

        const category = new categoryModel({
            name: req.body.name,
            image: result.secure_url // Save the Cloudinary URL
        });

        await category.save();
        res.json({ success: true, message: "Category Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding category" });
    }
}

// List Categories
const listCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.json({ success: true, data: categories });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error listing categories" });
    }
}

// Remove Category
const removeCategory = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.body.id);
        if (!category) {
            return res.json({ success: false, message: "Category not found" });
        }

        // Delete image from Cloudinary
        if (category.image) {
            const imageUrl = category.image;
            const parts = imageUrl.split('/');
            const publicIdWithExt = parts.slice(parts.indexOf('bkfood')).join('/');
            const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
            
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
            }
        }

        // Delete category from database
        await categoryModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Category Removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing category" });
    }
}

export { addCategory, listCategory, removeCategory };