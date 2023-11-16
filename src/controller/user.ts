// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// //@ts-ignore
// export const createUser = async (req, res, next) => {
//     const { phone, name } = req.body;

//     try {
//         await prisma.user.create({
//             data: {
//                 phone,
//                 name,
//             },
//         });
//     } catch (error) {
//         console.log('error:', error);
//     }
//     res.status(201).json({ message: 'success' });
// };
