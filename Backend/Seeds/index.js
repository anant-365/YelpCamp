require('dotenv').config()
const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../Models/Campground')

const dbConnect = function(){
  mongoose.connect(process.env.MONGO_URL)
  mongoose.connection.on("error",console.error.bind(console,'connection error'));
  mongoose.connection.once("open",()=>{
  console.log("database connected")
})
}

// dbConnect();        //ONLY RUN COMMENTED CODE IF NEED TO SEED THE DATABASE AGAIN.

const sample = (array)=>{
  return array[Math.floor(Math.random()*array.length)];
}

const seedDB = async ()=>{
  await Campground.deleteMany({})
  for(let i=0; i<50; i++){
    const random1000 = Math.floor(Math.random()*1000);
    const price = Math.floor(Math.random()*20)+30;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title:`${sample(descriptors)} ${sample(places)}`,
      price:price,
      image:`https://picsum.photos/400?random=${Math.random()}`,
      description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam autem cumque veniam. Fugit delectus esse debitis earum iusto commodi in.`
    })
    await camp.save();
  }
}

// seedDB().then(()=>{
  // mongoose.connection.close()     //ONLY RUN COMMENTED CODE IF NEED TO SEED THE DATABASE AGAIN.
// })

module.exports = dbConnect