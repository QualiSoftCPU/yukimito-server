const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const petOwner = db.petOwner;
const { check, validationResult } = require("express-validator");
const initializeApp = require('firebase/app').initializeApp
const getStorage = require('firebase/storage').getStorage;
const getDownloadURL = require('firebase/storage').getDownloadURL;
const uploadBytesResumable = require('firebase/storage').uploadBytesResumable;
const ref = require('firebase/storage').ref;
const config = require('../config/firebase.config');

initializeApp(config);

const storage = getStorage();

const signup = async (req, res) => {
  check("username", "Username is required").notEmpty();
  check("ownerName", "Owner name is required").notEmpty();
  check("contactNumber", "Contact number is required").notEmpty();
  check("password", "Password is required").notEmpty().isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])/);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingUser = await petOwner.findOne({ where: { username: req.body.username } });

    if (existingUser) {
      return res.status(400).json({ errors: [{ field: "username", message: "Username is already taken" }] });
    }

        const passwordHash = await bcrypt.hash(req.body.password, 8);
        const newPetOwner = await petOwner.create({
          username: req.body.username,
          name: req.body.ownerName,
          contact_number: req.body.contactNumber,
          password: passwordHash,
        });

        res.send({ message: "Pet Owner was registered successfully!" });
      }
      catch (err)  {
        if (!error.response) {
          // network error
          this.errorStatus = 'Error: Network Error';
      } else {
          this.errorStatus = error.response.data.message;
      }
      };
  }


const signin = (req, res) => {
 petOwner.findOne({
   where: {
     username: req.body.username
   }
 })
   .then(petOwner => {
     if (!petOwner) {
       return res.status(404).send({ message: "Pet Owner Not found." });
     }

     var passwordIsValid = bcrypt.compareSync(
       req.body.password,
       petOwner.password
     );

     if (!passwordIsValid) {
       return res.status(401).send({
         accessToken: null,
         message: "Invalid Password!"
       });
     }

     let token = jwt.sign({ 
      id: petOwner.id,
      name: petOwner.name,
      username: petOwner.username,
      contact_number: petOwner.contact_number,
      email: petOwner.email }, 
      process.env.JWT_SECRET, {
       expiresIn: 86400 // 24 hours
     });

     res.status(200).send({
       id: petOwner.id,
       name: petOwner.ownerName,
       username: petOwner.username,
       contact_number: petOwner.contactNumber,
       email: petOwner.email,
       accessToken: token
     });
   })
   .catch(err => {
     res.status(500).send({ message: err.message });
   });
};

const getAllPetOwners = async (req, res) => {
  try {
    const allUsers = await petOwner.findAll(); // Retrieve all users from the database

    res.status(200).json(allUsers); // Send the retrieved users as a response
  } catch (err) {
    res.status(500).send({ message: err.message }); // Handle any errors that occur
  }
};

const getPetOwner = (req, res) => {

  const userId = req.params.petOwnerId;

  db.petOwner.findOne({
    where: {
      id: userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      // Return the retrieved user data as a response
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const updateProfile = (req, res) => {

  const ownerId = req.params.petOwnerId; 

  const updatedProfile = {
    name: req.body.ownerName,
    contact_number: req.body.contactNumber,
    email_address: req.body.email,
    username: req.body.username,
    address: req.body.address,
  };

  petOwner.update(updatedProfile, {
    where: { id: ownerId }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Profile was updated successfully." });
        console.log(updatedProfile);
      } else {
        res.send({ message: `Cannot update Profile with id=${ownerId}. Maybe Profile was not found or req.body is empty!` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating Profile with id=" + ownerId });
    });
};

const addProfilePicture = async (req, res) => {
  try {
    
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `files/${req.file.originalname + "     " + dateTime}`)
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    const { petOwnerId } = req.params;
    
    const petOwner = await db.petOwner.findByPk(petOwnerId);
    
    if (!petOwner) {
      return res.status(404).json({ message: 'PetOwner not found' });
    }

    await petOwner.update({
      profilePhoto: downloadURL
    });

    res.status(200).json(petOwner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;

  return dateTime
};

module.exports = { signup, signin, getPetOwner, updateProfile, addProfilePicture, getAllPetOwners};