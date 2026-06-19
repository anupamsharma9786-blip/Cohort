const express = require('express')
const postModel = require('../model/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')



const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})



async function createPostController(req,res){

    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({
            message: "Token Invalid , Unauthorized access"
        })
    }

    let decoded = null;

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch(err){
        return res.status(401).json({
            message: "User not Authorized"
        })
    }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "insta-clone/posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id

    })

    return res.status(201).json({
        message: "Post created successfully",
        post
    })
}

async function getPostController(req,res){

    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({
            message: "Token Invalid , Unauthorized access"
        })
    }

    let decoded = null;

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch(err){
        return res.status(401).json({
            message: "User not Authorized"
        })
    }

    const posts = await postModel.find({
        user: decoded.id
    })

    return res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}

async function getPostDetailsController(req,res){

    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({
            message: "Token Invalid , Unauthorized access"
        })
    }

    let decoded = null;

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch(err){
        return res.status(401).json({
            message: "User not Authorized"
        })
    }

    const postId = req.params.postId
    
    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.user.toString() == decoded.id.toString()

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden content"
        })
    }

    return res.status(200).json({
        message: "post fetched succesfully",
        post
    })
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}