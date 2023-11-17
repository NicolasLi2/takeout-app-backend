import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//@ts-ignore
export const createOrder = async (req, res, next) => {
    // console.log('req.body:', req.body);
    // const { totalPrice, userName, userPhone, userAddress, orderItem } =
    //     req.body;
    const { userName, userPhone, userAddress, priority, cart, extraPrice } =
        req.body;

    // orderItem: "productName"  "unitPrice" "quantity"
    const orderItem = cart.map((item: any) => ({
        productName: item.productName,
        unitPrice: parseFloat(item.unitPrice),
        quantity: parseInt(item.quantity),
    }));

    const totalPrice =
        cart.reduce(
            (sum: any, item: any) => sum + item.unitPrice * item.quantity,
            0
        ) + parseFloat(extraPrice);
    // console.log('totalPrice:', totalPrice);

    try {
        const result = await prisma.order.create({
            data: {
                totalPrice,
                userName,
                userPhone,
                userAddress,
                orderItem: {
                    create: orderItem,
                },
            },
        });
        res.status(201).json(result);
    } catch (error) {
        console.log('error:', error);
    }
};

//@ts-ignore
export const getOrder = async (req, res, next) => {
    try {
        const result = await prisma.order.findUnique({
            where: {
                id: Number(req.params.orderId),
            },
            include: {
                orderItem: true,
            },
        });
        res.status(201).json(result);
    } catch (error) {
        console.log('error:', error);
    }
};
