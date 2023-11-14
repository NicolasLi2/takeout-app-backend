import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @ts-ignore
export const createMenu = async (req, res) => {
    const { name, unitPrice, imageUrl, ingredients } = req.body;
    const result = await prisma.post.create({
        data: {
            name,
            unitPrice,
            imageUrl,
            ingredients,
        },
    });
    res.json(result);
};
