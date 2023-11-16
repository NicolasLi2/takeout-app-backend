import express from 'express';
import {
    createMenu,
    deleteMenu,
    getMenuById,
    getMenus,
    updateMenu,
} from '../controller/menu.js';
import { uploadImage } from '../middleware/multer.js';
import { resizeImage } from '../middleware/resize.js';

const router = express.Router();

router.get('/get-menus', getMenus);
router.get('/get-menu/:menuId', getMenuById);
router.post(
    '/create-menu',
    uploadImage.single('productImage'),
    resizeImage,
    createMenu
);

router.delete('/delete-menu/:menuId', deleteMenu);
router.patch('/update-menu/:menuId', updateMenu);

export default router;
