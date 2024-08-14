const express = require('express');
const Campground = require('./Models/Campground')
const dbConnect = require('./Seeds/index');
// const { db } = require('./Models/Campground');

dbConnect();

const app = express();
const PORT = 5000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.get('/campground', async (req, res) => {
  try {
    const campgrounds = await Campground.find({});
    res.json([...campgrounds]);
  } catch (error) {
    console.error('Error fetching campgrounds:', error);
  }
});

app.put('/campground', async(req, res)=>{
  let id = req.body._id
  await Campground.findByIdAndUpdate(id,{location:req.body.location, title:req.body.title})
  res.send('it worked')
})

app.post('/campground',async (req, res) => {
  const campground = new Campground( req.body)
  await campground.save()
  res.send('it worked')
})

app.delete('/campground/:id', async(req, res)=>{
  const { id } = req.params;
  await Campground.findByIdAndDelete(id)
  console.log(id)
  res.send('it worked')
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});