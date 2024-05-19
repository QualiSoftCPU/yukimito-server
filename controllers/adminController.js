const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const Booking = db.booking;
const Admin = db.admin;

const signup = (req, res) => {

 Admin.create({
   username: req.body.username,
   password: bcrypt.hashSync(req.body.password, 8),
   role: req.body.role
 })
   .then(admin => {
     res.send({ message: "Admin was registered successfully!" });
   })
   .catch(err => {
     res.status(500).send({ message: err.message });
   });
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving admin accounts" });
  }
};

const signin = (req, res) => {
 Admin.findOne({
   where: {
     username: req.body.username
   }
 })
   .then(admin => {
     if (!admin) {
       return res.status(404).send({ message: "Admin Not found." });
     }

     var passwordIsValid = bcrypt.compareSync(
       req.body.password,
       admin.password
     );

     if (!passwordIsValid) {
       return res.status(401).send({
         accessToken: null,
         message: "Invalid Password!"
       });
     }

     var token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
       expiresIn: 86400 // 24 hours
     });

     res.status(200).send({
       id: admin.id,
       username: admin.username,
       accessToken: token
     });
   })
   .catch(err => {
     res.status(500).send({ message: err.message });
   });
};

async function acceptBooking(req, res) {
  const { id } = req.params;

  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'accepted') {
      return res.status(400).json({ message: 'Booking already accepted' });
    }

    booking.status = 'accepted';
    await booking.save();
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error accepting booking' });
  }
}

async function rejectBooking(req, res) {
  const { id } = req.params;
  const { reasonForRejecting } = req.body;

  if (!reasonForRejecting) {
    return res.status(400).json({ message: 'Please provide a reason for rejection' });
  }

  try {
    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'rejected') {
      return res.status(400).json({ message: 'Booking already rejected' });
    }

    booking.status = 'rejected';
    booking.reasonOfRejection = reasonForRejecting;
    await booking.save();
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error rejecting booking' });
  }
}

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const validRoles = ['admin', 'superadmin'];

  if (!validRoles.includes(role)) {
    return res.status(400).send({ message: "Invalid role provided." });
  }

  try {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(404).send({ message: "Admin not found." });
    }

    admin.role = role;
    await admin.save();

    res.send({ message: "Admin role updated successfully." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};




module.exports = { signup, signin, acceptBooking, rejectBooking, updateRole, getAllAdmins };