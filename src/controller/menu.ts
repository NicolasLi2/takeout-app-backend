import { PrismaClient } from '@prisma/client';
import cloudinary from '../util/cloud.js';
import streamifier from 'streamifier';
const prisma = new PrismaClient();

// let imageUrl = '';
// let imageId = '';
// @ts-ignore
export const createMenu = async (req, res, next) => {
    const { productName, unitPrice, quantity } = req.body;
    const { file } = req;
    if (!file) return res.status(400).json({ error: 'Image file is missing!' });

    let cld_upload_stream = cloudinary.uploader.upload_stream(
        { folder: 'menu' },
        async function (error, results) {
            if (error) {
                console.log('cloud error');
                return res.status(400).json({ error });
            }
            // @ts-ignore
            const { secure_url, public_id } = results;
            // imageUrl = secure_url;
            // imageId = public_id;

            // TODO change price and quantity to number
            try {
                const result = await prisma.menu.create({
                    data: {
                        productName,
                        unitPrice,
                        quantity,
                        imageUrl: secure_url,
                        imageId: public_id,
                    },
                });
                res.json(result);
            } catch (error) {
                console.log('error:', error);
                // res.status(400).json({ message: error?.message })
            }
            // req.body.secure_url = secure_url;
            // req.body.public_id = public_id;
            // console.log('secure_url:', secure_url);
            // console.log('req.body.secure_url:', req.body.secure_url);
        }
    );
    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    next();
};

// @ts-ignore
// export const createMenu = async (req, res) => {
//     const { productName, unitPrice, quantity } = req.body;
//     // console.log(productName, unitPrice, quantity);
//     if (imageUrl && imageId) {
//         console.log('imageUrl:', imageUrl);
//         try {
//             const result = await prisma.menu.create({
//                 data: {
//                     productName,
//                     unitPrice,
//                     quantity,
//                     imageUrl,
//                     imageId,
//                 },
//             });
//             res.json(result);
//         } catch (error) {
//             console.log('error:', error);
//             // res.status(400).json({ message: error?.message })
//         }
//     }
// };

// @ts-ignore
export const getMenus = async (req, res) => {
    try {
        const response = await prisma.menu.findMany();
        res.status(200).json(response);
    } catch (error) {
        console.log('error:', error);
        // res.status(500).json({ msg: error.message })
    }
};
