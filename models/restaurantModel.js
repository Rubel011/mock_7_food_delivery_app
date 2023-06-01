const mongoose = require("mongoose")

const restaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: String, required: true }
    },
    menu: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true }
    }]


},{
    versionKey:false
})
const RestaurantModel = mongoose.model("restaurant", restaurantSchema);
module.exports = { RestaurantModel }