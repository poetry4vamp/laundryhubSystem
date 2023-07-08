const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getReservation = (req, res) => {
    res.render('reservation');
}

exports.postReservation = async (req, res) => {
    try {
        const {
            name,
            services,
            size,
            products,
            quantity,
            price,
            delivery,
            subtotal,
            deliveryfee,
            createdAt, // Corrected property name
            updatedAt, // Corrected property name
        } = req.body;

        const reserve = await prisma.reservation.create({
            data: {
                name,
                services,
                size,
                products,
                quantity,
                price,
                delivery,
                subtotal,
                deliveryfee,
                createdAt, // Corrected property name
                updatedAt, // Corrected property name
            },
        });

        console.log('Reservation created successfully!');
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
    res.redirect('/route/reservation');
};
