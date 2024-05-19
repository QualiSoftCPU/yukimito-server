const initializeApp = require('firebase/app').initializeApp
const getStorage = require('firebase/storage').getStorage;
const getDownloadURL = require('firebase/storage').getDownloadURL;
const uploadBytesResumable = require('firebase/storage').uploadBytesResumable;
const ref = require('firebase/storage').ref;
const config = require('../config/firebase.config');

initializeApp(config);

const storage = getStorage();

const uploadPhoto = async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `files/${req.file.originalname + "     " + dateTime}`)
    
    const metadata = {
      contentType: req.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("Successfully uploaded the file!");
    return (
      res.send({
        message: "File uploaded to firebase storage.",
        name: req.file.originalname,
        type: req.file.mimetype,
        downloadURL: downloadURL
      })
    )

  } catch (error) {
    
  }
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + ' ' + time;

  return dateTime
};

module.exports = {uploadPhoto};