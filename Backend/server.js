const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api', (req, res) => {
  res.json({ message: "Hello from Express!" });
});
// app.get('/makeCampground', async (req, res) => {
//   const camp = new Campground({title:'My Backyard', description:'Cheap Camping'});
//   await camp.save();
//   res.send(camp)
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});