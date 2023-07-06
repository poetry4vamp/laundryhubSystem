const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController');

router.get('/reservation', reservationController.getReservation);
router.post('/reservation', reservationController.postReservation);

module.exports = router;