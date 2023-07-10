const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const QRCode = require('qrcode');

const credential = {
  email: "admin@gmail.com",
  password: "admin123",
};

const prisma = new PrismaClient();

// Route for base/login
router.get('/base', (req, res) => {
    res.render('base');
  });

// Login user
router.post('/login', (req, res) => {
  if (req.body.email == credential.email && req.body.password == credential.password) {
    req.session.user = req.body.email;
    res.redirect('/dashboard');
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

// Route for charts
router.get('/charts', (req, res) => {
  if (req.session.user) {
    res.render('charts');
  } else {
    res.send("Unauthorized User.");
  }
});

// Route for home
router.get('/home', (req, res) => {
  if (req.session.user) {
    res.render('home');
  } else {
    res.send("Unauthorized User.");
  }
});

// Route for reservation
router.get('/reservation', async (req, res) => {
  if (req.session.user) {
    try {
      res.render('reservation', { qrCodeUrl: null }); // Set qrCodeUrl to null initially
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error.');
    }
  } else {
    res.send("Unauthorized User.");
  }
});

// Route for submitting reservation
router.post('/reservation', async (req, res) => {
  if (req.session.user) {
    try {
      const {
        name,
        services,
        size,
        products,
        quantity,
        delivery,
        datetime,
      } = req.body;

      const price = parseFloat(req.body.price);
      const subtotal = parseFloat(req.body.subtotal);
      const deliveryfee = parseFloat(req.body.deliveryfee);

      const reservation = await prisma.reservation.create({
        data: {
          name,
          services,
          size,
          products,
          quantity,
          price: price || null,
          delivery,
          subtotal: subtotal || null,
          deliveryfee: deliveryfee || null,
          datetime: new Date(datetime),
        },
      });

      // Generate the QR code
      const qrCodeData = JSON.stringify(req.body);
      const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
      console.log('Reservation created successfully!');
      res.render('reservation', { qrCodeUrl: qrCodeUrl, reservation: reservation });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error.');
    }
  } else {
    res.send("Unauthorized User.");
  }
});

// Route for deleting a reservation
router.post('/reservation/delete', async (req, res) => {
  if (req.session.user) {
    try {
      const reservationId = req.body.id;

      // Delete the reservation based on the provided reservationId
      await prisma.reservation.delete({
        where: {
          id: reservationId,
        },
      });

      console.log('Reservation deleted successfully!');
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error.');
    }
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
          res.redirect('/');
      }
  });
});

module.exports = router;
