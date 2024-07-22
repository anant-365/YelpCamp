const express = require('express');
const Campground = require('./Models/Campground')
const dbConnect = require('./Seeds/index');
// const { db } = require('./Models/Campground');

dbConnect();

const app = express();
const PORT = 5000;

app.get('/campground', async (req, res) => {
  try {
    const campgrounds = await Campground.find({});
    res.json([...campgrounds]);
  } catch (error) {
    console.error('Error fetching campgrounds:', error);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});