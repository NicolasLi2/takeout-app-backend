import multer from 'multer';

// const storage = multer.memoryStorage();
const storage = multer.memoryStorage();

// @ts-ignore
// const imageFileFilter = (req, file, cb) => {
//     // console.log(file);
//     if (!file.mimetype.startsWith('image')) {
//         cb(null, false);
//     }
//     cb(null, true);
// };

export const uploadImage = multer({ storage });
