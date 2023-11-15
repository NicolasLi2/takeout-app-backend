import express from 'express';
import { createMenu } from '../controller/menu.js';
import { uploadImage } from '../middleware/multer.js';
import { resizeImage } from '../middleware/resize.js';

const router = express.Router();

router.get('/');
router.post(
    '/create-menu',
    uploadImage.single('productImage'),
    // (req, res, next) => {
    //     console.log('req.file:', req?.file);
    //     next();
    // },
    resizeImage,
    // (req, res, next) => {
    //     console.log('after resize');
    //     next();
    // },
    // (req, res) => console.log('after cloud'),

    createMenu
);

export default router;
