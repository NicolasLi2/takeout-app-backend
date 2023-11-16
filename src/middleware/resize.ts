import sharp from 'sharp';
import fs from 'node:fs';

// @ts-ignore
export const resizeImage = async (req, res, next) => {
    req.file.buffer = await sharp(req.file.buffer)
        .resize(200, 200, {
            fit: 'fill',
            position: sharp.gravity.center,
        })
        .toBuffer();
    next();
};
