import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose'


export const createPost = async (req,res) => {
    // res.send('post creation')
    const post = req.body;

    // console.log({post});
    const newPost = new PostMessage(post)

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json(error)
    }
}

export const getPosts = async (req,res) => {
    // res.send('it worksss')
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)

    } catch (error) {
        res.status(404).json(error)

    }
        
}

export const updatePost = async (req,res) => {
    // res.send('it worksss')
    const {id: _id} = req.params;
    const post = req.body;


    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post With That Id')


    try {
        const Updatedpost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
        res.status(200).json(Updatedpost)

    } catch (error) {
        res.status(404).json(error)

    }
        
}