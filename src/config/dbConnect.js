const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Databse connected : ${connect.connection.host}, ${connect.connection.name}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }  
};

module.exports = dbConnect;// Auto edit at 2025-11-26T17:47:27.596Z
