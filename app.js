import express from "express";
import path from "path";
import { User } from "./database/models/userModel.js";
import { connectDB } from "./database/connect.js";


const app = express()
connectDB()


app.use(express.static(path.join(path.resolve(), "/public")))
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(), "index.html"))
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.get("/product", (req, res) => {
    res.render("product.ejs")
})

app.get("/cart", (req, res) => {
    res.render("cart.ejs")
})

app.get("/productDetails", (req, res) => {
    res.render("productDetails.ejs")
})

app.get("/signUp", (req, res) => {
    res.render("signup.ejs")
})

app.get("/success", (req, res) => {
    res.render("successPage.ejs")
})

app.get("/loginSuccess", (req, res) => {
    res.render("loginSuccess.ejs")
})



app.post("/signUp", async (req, res) => {
    const {email, psw, psw_repeat} = req.body;

    const userExists = await User.findOne({email})
    if (userExists) {
        res.render("signup.ejs", {errorMessage: "User already exists"})
    }
    else if (psw != psw_repeat) {
        res.render("signup.ejs", {errorMessage: "Password do not match"})
    }
    else {
        await User.create({
            email: email,
            psw: psw,
            psw_repeat: psw_repeat
        })
        
        res.redirect("/success")
    }
})

app.post("/login", async (req, res) => {
    const {email, psw} = req.body;

    const userExists = await User.findOne({email})
    if (!userExists) {
        res.render("login.ejs", {errorMessage: "Not Registered"})
    }
    else {
        if (userExists.psw === psw) {
            res.redirect("/loginSuccess")
        }
        else {
            res.render("login.ejs", {errorMessage: "Invalid Password"})
        }
    }
})



app.listen(3000, () => {
    console.log(`Server running at 3000`)
})