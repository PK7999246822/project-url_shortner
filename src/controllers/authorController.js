const jwt = require("jsonwebtoken")
const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    try{
    let data= req.body
    let savedData= await AuthorModel.create(data)
    res.status(201).send({ status: true , msg: savedData})
    }
    catch(error){
        console.log(error)
        res.status(500).send({ status : false , msg: error.message })
     }
}

const login = async function (req, res) {
    try {
        const mail = req.body.email
        const pass = req.body.password
        const data = req.body
        if (Object.keys(data)==0) return res.status(400).send({ status: false, msg: "No input provided" })

        const userMatch = await AuthorModel.findOne({ email: mail, password: pass })
        if (!userMatch) return res.status(400).send({ status: false, msg: "Email or Password is incorrect" })

        const token = jwt.sign({
            userId: userMatch._id.toString()
        }, "Secret-Key")

        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, msg: token })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}

module.exports.createAuthor= createAuthor;
module.exports.login = login;
