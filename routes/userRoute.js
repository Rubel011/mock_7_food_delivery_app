const express = require("express");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken")
const { UserModel } = require("../models/userModel");
const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
    try {
        let data = await UserModel.find();
        res.send({ data })

    } catch (error) {
        res.send("home re")
    }
})

userRoute.post("/register", async (req, res) => {
    try {
        let { password,email } = req.body
        let user=await UserModel.find({email});
        if(user.length>0)return res.send({err:"you are already registered...login"})
        bcrypt.hash(password, 8, async (err, hash) => {
            if (err) return res.status(401).json({ err: "register bcrypt" })
            req.body.password = hash
            let data = new UserModel(req.body)
            await data.save();
            res.status(201).json({ "message": "resgister successful",data })
        });



    } catch (error) {
        res.status(401).json({ err: "register route not working", error: error.message })

    }
})

userRoute.patch("/login", async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await UserModel.find({ email });
        if (user.length == 0) return res.status(401).json({ err: "register yourself first" })
        bcrypt.compare(password, user[0].password, function (err, result) {
            if (result) {
                let token = jwt.sign({ user: user[0]._id }, process.env.accesskey, { expiresIn: '1h' });
                res.status(201).json({ "message": "successful login", token })

            } else {
                res.status(401).json({ err: "wrong credential" })
            }
        });

    } catch (error) {
        res.status(401).json({ err: "login route error", error: error.message })

    }
})


userRoute.post("/user/:id/reset", async (req, res) => {
    try {
        let id = req.params.id
        let { password, new_password } = req.body
        // console.log(id, password, new_password);

        let user = await UserModel.findOne({ _id: id });
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {

                bcrypt.hash(new_password, 8, async (err, hash) => {
                    if (err) return res.status(401).json({ err: "register bcrypt" })
                    let data = await UserModel.findByIdAndUpdate({ _id: id }, { password: hash });
                    res.status(204).json({ "message": "password reset successful", data })
                })

            } else {
                res.status(401).json({ err: "wrong credential" })
            }
        });




    } catch (error) {
        res.status(401).json({ error: error.message })

    }
})
module.exports = { userRoute }