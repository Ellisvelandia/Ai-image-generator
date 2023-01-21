const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./mongodb/connect.js');
const dalleRoutes = require("./routes/dalleRoutes.js")
const postRoutes = require("./routes/postRoutes.js")

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));


app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
  } catch (error) {
    console.log(error);
  }
}

startServer();
