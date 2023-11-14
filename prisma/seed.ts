import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const alice = await prisma.user.upsert({
        where: { phone: '12345567' },
        update: {},
        create: {
            name: 'Alice',
            phone: '12345567',
            order: {
                create: [
                    {
                        totalPrice: 12.5,
                        time: new Date(),
                        menu: {
                            create: [
                                {
                                    name: 'baguette',
                                    unitPrice: 12.5,
                                    ingredients: ['tomato', 'bread'],
                                    imageUrl:
                                        'https://images.unsplash.com/photo-1568471173242-461f0a730452?q=80&w=1447&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });
    const bob = await prisma.user.upsert({
        where: { phone: '14345567' },
        update: {},
        create: {
            name: 'Bob',
            phone: '14345567',
            order: {
                create: [
                    {
                        totalPrice: 60.0,
                        time: new Date(),
                        menu: {
                            create: [
                                {
                                    name: 'brioche',
                                    unitPrice: 30.0,
                                    ingredients: ['tomato', 'bread', 'chicken'],
                                    imageUrl:
                                        'https://images.unsplash.com/photo-1604322796450-ec2c51485442?q=80&w=1385&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });
    console.log({ alice, bob });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
