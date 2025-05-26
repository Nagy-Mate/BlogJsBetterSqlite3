import express from "express";
import cors from "cors";
import * as db from './Util/database.js';

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/blogs', (req, res)=>{
    try{
        const blogs = db.getBlogs();
        res.status(200).json(blogs);
    }catch(err){
        res.status(500).json({message: `${err}`});
    }

});

app.get('/blogs/:id', (req, res) =>{
    try{
        const blog = db.getBlog(req.params.id);
        if(!blog){
            return res.status(404).json({message: 'Blog not found'})
        }
        res.status(200).json(blog);
    }catch(err){
        res.status(500).json({message: `${err}`});
    }
});

app.post('/blogs', (req, res)=>{
    try{
        const {user, title, category, content, creationDate} = req.body;
        if(!user || !title || !category || !content || !creationDate){

            return res.status(404).json({message: 'Invalid credentials'})
        }
        const savedBlog = db.saveBlog(user, title, category, content, creationDate);
        if(savedBlog.changes != 1){
             return res.status(501).json({message: "Blog save failed!"})
        }
        res.status(201).json({id: savedBlog.lastInsertRowid});
    }catch(err){
        res.status(500).json({message: `${err}`});
    }
});

app.put('/blogs/:id', (req, res)=>{
    try{
        const {user, title, category, content, modificationDate} = req.body;
        if(!user || !title || !category || !content || !modificationDate){

            return res.status(404).json({message: 'Invalid credentials'})
        }
        const id = req.params.id;
        const blog = db.getBlog(id);
        const creationDate = blog.creationDate;

        const updatedBlog = db.updateBlog(id, user, title, category, content, creationDate, modificationDate);
        if(updatedBlog.changes != 1){
             return res.status(501).json({message: "Blog update failed!"})
        }
        res.status(200).json({id, user, title, category, content, creationDate, modificationDate});
    }catch(err){
        res.status(500).json({message: `${err}`});
    }
});

app.delete('/blogs/:id', (req, res)=>{
    try{
        const deletedBlog = db.deleteBlog(req.params.id);
        if(deletedBlog.changes != 1){
             return res.status(501).json({message: "Blog delete failed!"})
        }
        res.status(200).json({message: "Deleted successful"})
    }catch(err){
        res.status(500).json({message: `${err}`});
    }
});

app.listen(PORT, ()=>{
    console.log(`server runs on port: ${PORT}`)
});