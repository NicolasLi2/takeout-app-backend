import { PrismaClient } from '@prisma/client';
import cloudinary from '../util/cloud.js';
import streamifier from 'streamifier';

const prisma = new PrismaClient();

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

            try {
                await prisma.menu.create({
                    data: {
                        productName,
                        unitPrice: parseFloat(unitPrice),
                        quantity: parseInt(quantity),
                        imageUrl: secure_url,
                        imageId: public_id,
                    },
                });
            } catch (error) {
                console.log('error:', error);
                // res.status(400).json({ message: error?.message })
            }
        }
    );
    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    res.status(201).json({ message: 'success' });
};

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

// @ts-ignore
export const getMenuById = async (req, res) => {
    try {
        const response = await prisma.menu.findUnique({
            where: {
                id: Number(req.params.menuId),
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log('error:', error);
        // res.status(404).json({ msg: error.message })
    }
};

//@ts-ignore
export const deleteMenu = async (req, res) => {
    const id = Number(req.params.menuId);
    try {
        const response = await prisma.menu.findUnique({
            where: {
                id,
            },
        });
        let imageId = response?.imageId;
        if (imageId) {
            cloudinary.uploader
                .destroy(imageId)
                .then((result) => console.log(result));
        }
    } catch (error) {
        console.log('error:', error);
    }

    try {
        const product = await prisma.menu.delete({
            where: {
                id,
            },
        });
        res.status(200).json(product);
    } catch (error) {
        console.log('error:', error);
        // res.status(400).json({ msg: error.message })
    }
};

//@ts-ignore
export const updateMenu = async (req, res) => {
    const { unitPrice, quantity } = req.body;
    try {
        const product = await prisma.menu.update({
            where: {
                id: Number(req.params.menuId),
            },
            data: {
                unitPrice,
                quantity,
            },
        });
        res.status(200).json(product);
    } catch (error) {
        console.log('error:', error);
    }
};
