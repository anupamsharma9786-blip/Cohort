const express = require('express')
const postModel = require('../model/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')



const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})



async function createPostController(req,res){
    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "TEst"
    })

    res.send(file)
}


module.exports = {
    createPostController
}