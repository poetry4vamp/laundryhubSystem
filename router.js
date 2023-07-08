const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const credential = {
  email: "admin@gmail.com",
  password: "admin123",
};

const prisma = new PrismaClient();

// Login user
router.post('/login', (req, res) => {
  if (req.body.email == credential.email && req.body.password == credential.password) {
    req.session.user = req.body.email;
    res.redirect('/route/dashboard');
  } else {
    res.end("Invalid User.");
  }
});

// Route for dashboard
router.get('/dashboard', async (req, res) => {
  if (req.session.user) {
    try {
      // Retrieve the allreservations data from your database or source
      const allreservations = await getAllReservations(); // Replace with your logic to fetch reservations

      // Render the dashboard template and pass the allreservations variable
      res.render('dashboard', { user: req.session.user, allreservations: allreservations }); // Ensure the variable name matches

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error.');
    }
  } else {
    res.send("Unauthorized User.");
  }
});

async function getAllReservations() {
  try {
    const reservations = await prisma.reservation.findMany();
    return reservations;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch reservations.');
  }
}

// Route for home
router.get('/home', (req, res) => {
  if (req.session.user) {
    res.render('home');
  } else {
    res.send("Unauthorized User.");
  }
});

// Route for reservation
router.get('/reservation', (req, res) => {
  if (req.session.user) {
    res.render('reservation');
  } else {
    res.send("Unauthorized User.");
  }
});

// Route for logout
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.render('base', { title: "Express", logout: "Logout Successfully!" });
    }
  });
});

module.exports = router;
