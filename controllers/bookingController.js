const db = require('../models');
const Booking = db.booking;
const Pet = db.pet;

async function createHomeCareBooking(req, res) {
  const { petList, checkIn, checkOut } = req.body;
  const checkInDate = new Date(req.body.checkIn);
  const checkOutDate = new Date(req.body.checkOut);
  let totalPrice =  0;

  if (!petList || !petList.length) {
      return res.status(400).send({ message: "Please provide one or more pets for the booking." });
  }

  if (!(checkInDate instanceof Date) || !(checkOutDate instanceof Date)) {
      return res.status(400).send({ message: 'Invalid date format. Please provide Date objects.' });
  }

  const missingPets = [];
  for (const petId of petList) {
      const pet = await Pet.findByPk(petId);

      if (!pet) {
          missingPets.push(petId);
          continue;
      }

      let rate =  0;
      switch (pet.size) {
          case 'extra-small':
              rate =  425;
              break;
          case 'small':
              rate =  475;
              break;
          case 'medium':
              rate =  525;
              break;
          case 'large':
              rate =  575;
              break;
          case 'extra-large':
              rate =  650;
              break;
      }

      const oneDay =  1000 *  60 *  60 *  24;
      const durationInDays = Math.ceil((checkOutDate - checkInDate) / oneDay);
      let petPrice = rate * durationInDays;

      totalPrice += petPrice;
  }

  if (missingPets.length <  0) {
      return res.status(404).send({ message: `Pets with IDs ${missingPets.join(', ')} not found.` });
  }

  try {
      await Booking.create({
          service_type: 'homeCare',
          petOwnerId: req.body.petOwnerId,
          checkIn: checkIn,
          checkOut: checkOut,
          total_price: totalPrice,
          petList: petList,
          status: 'pending'
      });
  } catch (error) {
      console.error('Failed to create booking:', error);
      return res.status(500).send({ message: 'Failed to create booking.' });
  }

  res.send({ message: `Home care booking created successfully! The total price is ${totalPrice}` });
}

async function createErrandsCareBooking(req, res) {
  const { petList, checkIn, checkOut } = req.body;
  const checkInDate = new Date(req.body.checkIn);
  const checkOutDate = new Date(req.body.checkOut);
  let totalPrice =  0;

  if (!petList || !petList.length) {
      return res.status(400).send({ message: "Please provide one or more pets for the booking." });
  }

  if (!(checkInDate instanceof Date) || !(checkOutDate instanceof Date)) {
      return res.status(400).send({ message: 'Invalid date format. Please provide Date objects.' });
  }

  const missingPets = [];
  for (const petId of petList) {
      const pet = await Pet.findByPk(petId);

      if (!pet) {
          missingPets.push(petId);
          continue;
      }

      let rate =  0;
      switch (pet.size) {
          case 'small':
          case 'medium':
              rate =  175;
              break;
          case 'large':
          case 'extra-large':
              rate =  200;
              break;
      }

      const durationInHours = Math.ceil((checkOutDate - checkInDate) / (1000 *  60 *  60));
      let additionalHours =  50 * Math.max(0, durationInHours -   4);
      let petPrice = rate + additionalHours;
      totalPrice += petPrice;
  }

  if (missingPets.length <  0) {
      return res.status(404).send({ message: `Pets with IDs ${missingPets.join(', ')} not found.` });
  }

  try {
      await Booking.create({
          service_type: 'errandsCare',
          petOwnerId: req.body.petOwnerId,
          checkIn: checkIn,
          checkOut: checkOut,
          total_price: totalPrice,
          petList: petList,
          status: 'pending'
      });
  } catch (error) {
      console.error('Failed to create booking:', error);
      return res.status(500).send(error.message);
  }

  res.send({ message: `Errands care booking created successfully! The total price is ${totalPrice}` });
}

async function createDayCareBooking(req, res) {
  const { petList, checkIn, checkOut } = req.body;
  const checkInDate = new Date(req.body.checkIn);
  const checkOutDate = new Date(req.body.checkOut);
  let totalPrice =  0;

  if (!petList || !petList.length) {
      return res.status(400).send({ message: "Please provide one or more pets for the booking." });
  }

  if (!(checkInDate instanceof Date) || !(checkOutDate instanceof Date)) {
      return res.status(400).send({ message: 'Invalid date format. Please provide Date objects.' });
  }

  const missingPets = [];
  for (const petId of petList) {
      const pet = await Pet.findByPk(petId);

      if (!pet) {
          missingPets.push(petId);
          continue;
      }

      let rate =  0;
      switch (pet.size) {
          case 'small':
          case 'medium':
              rate =  250;
              break;
          case 'large':
          case 'extra-large':
              rate =  275;
              break;
      }

      const durationInHours = Math.ceil((checkOutDate - checkInDate) / (1000 *  60 *  60));
      let additionalHours =  50 * Math.max(0, durationInHours - 10);
      let petPrice = rate + additionalHours;
      totalPrice += petPrice;
  }

  if (missingPets.length >  0) {
      return res.status(404).send({ message: `Pets with IDs ${missingPets.join(', ')} not found.` });
  }

  try {
      await Booking.create({
          service_type: 'dayCare',
          petOwnerId: req.body.petOwnerId,
          checkIn: checkIn,
          checkOut: checkOut,
          total_price: totalPrice,
          petList: petList,
          status: 'pending'
      });
  } catch (error) {
      console.error('Failed to create booking:', error);
      return res.status(500).send({ message: 'Failed to create booking.' });
  }

  res.send({ message: `Daycare booking created successfully! The total price is ${totalPrice}` });
}

async function getAllBookings(req, res) {
    try {
        const bookings = await Booking.findAll();
        res.send(bookings);
    } catch (error) {
        console.error('Failed to fetch bookings:', error);
        res.status(500).send({ message: 'Failed to fetch bookings.' });
    }
}

const getBooking = (req, res) => {
    Booking.findAll({ where: { petOwnerId: req.params.petOwnerId } })
        .then(booking => {
        res.send(booking);
        })     
        .catch(err => {
        res.status(500).send({ message: err.message });
        });
    }

const updateBooking = (req, res) => {
    Booking.update({
        status: req.body.status,
    }, { where: { id: req.params.bookingId } })
        .then(num => {
        if (num == 1) {
            res.send({ message: "Booking status was updated successfully." });
        } else {
            res.send({ message: `Cannot update Booking with id=${req.params.bookingId}. Maybe Booking was not found or req.body is empty!` });
        }
        })
        .catch(err => {
        res.status(500).send({ message: err.message });
        });
    }
     
async function cancelBooking(req, res) {
  const bookingId = req.params.bookingId;
  const userId = req.params.petOwnerId;

  try {
    const booking = await Booking.findOne({
      where: {
        id: bookingId,
        petOwnerId: userId
      }
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.destroy();
    res.json({ message: 'Successfully cancelled booking' });
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {  createHomeCareBooking, createErrandsCareBooking, createDayCareBooking, getBooking, updateBooking, getAllBookings, cancelBooking };
