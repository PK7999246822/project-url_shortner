//Importing valid-url & shortid packages
const validUrl = require('valid-url')
const shortid = require('shortid')

//Importing the urlModel
const URLModel = require("../models/urlModel")

//Creating a validation function
const isValid = function (value) {
    if (typeof (value) === undefined || typeof (value) === null) { 
        return false 
    }
    if (typeof (value) === "string" && (value).trim().length > 0) {
         return true 
    }
}

//Creating our first handler function
const URLshorten = async (req , res) => {
    try {
        const baseUrl = 'http://localhost:3000'

        const data = req.body
        if (Object.keys(data) == 0) {
            return res.status(400).send({status: false , message: "Please provide URL"})
        }
        const { longUrl } = data
       
        if (!isValid(longUrl)) {
            return res.status(400).send({status: false , message: "Please provide URL"})
        }

        if (!validUrl.isUri(longUrl)) { 
            return res.status(401).send({status: false , message: "Invalid base URL"})
        }

        const urlGenerated = shortid.generate()
        const urlCode = urlGenerated.trim().toLowerCase()

        let url = await URLModel.findOne({longUrl}).select({longUrl: 1 , shortUrl: 1 , urlCode: 1 , _id: 0})

        if (url) {
            res.status(200).send({status: true ,  data: url})
        }

        else {
            const shortUrl = baseUrl + '/' + urlCode

            data['shortUrl'] = shortUrl
            data['urlCode'] = urlCode
    
            const urlData = await URLModel.create(data)
            
            return res.status(201).send({status: true , data: urlData })
        }

    }
    catch (error){
        console.log(error)
        res.status(500).send({status: false , message: error.message})
    }
}

const redirection = async (req , res) => {
    try {
      const { urlCode } = req.params
      const url = await URLModel.findOne({
          urlCode: urlCode
      })
      if (!url) {
        return res.status(404).send({status: false , message: "No URL found" })
      }
      else {
         return res.status(303).redirect(url.longUrl)
      }

    }
    catch (error){
        console.log(error)
        res.status(500).send({status: false , message: error.message})
    }
}

module.exports = {
    URLshorten ,
    redirection
}