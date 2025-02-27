require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const commentRoutes = require('./routes/commentsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/comments', commentRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

