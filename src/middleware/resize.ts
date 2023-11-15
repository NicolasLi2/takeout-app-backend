import sharp from 'sharp';
import fs from 'node:fs';

// @ts-ignore
export const resizeImage = async (req, res, next) => {
    await sharp(req.file.buffer)
        .resize(128, 128, {
            fit: 'fill',
            position: sharp.gravity.center,
        })
        .toBuffer();
    next();
};
