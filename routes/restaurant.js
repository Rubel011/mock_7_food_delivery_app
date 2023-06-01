const express = require("express");
const { RestaurantModel } = require("../models/restaurantModel");

const restaurantRoute = express.Router();

restaurantRoute.get("/", async (req, res) => {
    try {
        let data = await RestaurantModel.find();
        res.status(200).json({ data })

    } catch (error) {
        res.status(401).json({ error: error.message })

    }
})

restaurantRoute.post("/add", async (req, res) => {
    try {
        let data = new RestaurantModel(req.body)
        await data.save();
        res.status(200).json({ "message": "data added success", data })

    } catch (error) {
        res.status(401).json({ error: error.message })

    }
})


restaurantRoute.get("/:id", async (req, res) => {
    try {
        let id = req.params.id
        let data = await RestaurantModel.findById(id);
        res.status(200).json({ "message": "restaurant data", data })

    } catch (error) {
        res.status(401).json({ error: error.message })

    }
})
restaurantRoute.get("/:id/menu", async (req, res) => {
    try {
        let id = req.params.id
        let data = await RestaurantModel.findById(id);
        res.status(200).json({ "message": "restaurant data", menus: data.menu })
    } catch (error) {
        res.status(401).json({ error: error.message })

    }
})
restaurantRoute.post("/:id/menu", async (req, res) => {
    try {
        let newItem = req.body;
        let id = req.params.id
        let data = await RestaurantModel.findByIdAndUpdate(id, { $push: { menu: newItem } }, { new: true }).then((restaurant) => {
            if (!restaurant) return res.status(404).json({ err: "restaurant not found" })
            return res.status(200).json(restaurant.menu)

        }).catch((err) => {
            res.status(404).json({ err: err.message })
        })

    } catch (error) {
        res.status(401).json({ error: error.message })

    }
})
// restaurantRoute.delete(":rid/menu/:mid", async (req, res) => {
//     try {
//         let rid=req.params.rid
//         let mid=req.params.mid
//         await RestaurantModel

//     } catch (error) {
//         res.status(401).json({ error: error.message })

//     }
// })
module.exports = { restaurantRoute }