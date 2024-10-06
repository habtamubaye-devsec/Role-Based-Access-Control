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
// Auto edit at 2025-11-26T17:47:28.734Z
// Auto edit at 2025-11-26T17:51:00.390Z
// Auto edit at 2025-11-26T17:56:29.298Z
// Auto edit at 2025-11-26T17:56:35.183Z
// Auto edit at 2025-11-26T17:56:36.392Z
