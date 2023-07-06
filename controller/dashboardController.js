const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getDashboard = async (req, res) => {
  const userId = session.userId;
  if (!userId) {
    res.redirect('/');
    return;
  }

  try {
    const user = await prisma.User.findUnique({
      where: {
        id: userId,
      },
    });

    const allreservations = await prisma.reservation.findMany();

    const reserve = await prisma.reservation.findMany({
      where: {
        userId: userId,
      },
    });

    console.log(allreservations);
    res.render('dashboard', { user, allreservations, reserve });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error.');
  } finally {
    await prisma.$disconnect();
  }
};
