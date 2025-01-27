const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CampgroundSchema = new Schema({
    username:String,
    title:String,
    price:Number,
    image:String,
    description:String,
    location:String
});

module.exports = mongoose.model('Campground', CampgroundSchema)