const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getDashboard = async (req, res) => {
  const userId = req.session.userId; // Assuming user ID is stored in the session
  if (!userId) {
    res.redirect('/');
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const allreservations = await prisma.reservations.findMany(); // Fetch all reservations

    const reserves = await prisma.reservations.findMany({
      where: {
        userId: userId,
      },
    });

    console.log(allreservations);
    res.render('dashboard', { user, allreservations: allreservations, reserves }); // Pass allreservations variable
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error.');
  } finally {
    await prisma.$disconnect();
  }
};
