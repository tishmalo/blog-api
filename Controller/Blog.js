//CRUD operations
const { Blog } = require('../Model/model');

exports.postBlog = async (req, res) => {

    
    try {

        const { title, body } = req.body; // Set default author if missing
        const author = req.user.id
        if (!title || !body) {
            return res.status(400).json({ error: 'Title and body are required.' });

        }

        const blog = new Blog({
            title,
            author,
            body,
        });

        await blog.save();


        return res.status(201).json({
            message: 'Blog posted successfully.',
            data: blog
        });




    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
    }
}

exports.editBlog = async (req, res) => {

    try {
        const id = req.params.id;
        const { title, body } = req.body;

        //get the blog by id
        const blog = await Blog.findById(id);

        console.log(blog)
        console.log(req.user)
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found.' });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized: You are not the author of this blog.' });
        }

        blog.title = title ?? blog.title;
        blog.body = body ?? blog.body;

        //const updatedBlog= Blog.findByIdAndUpdate(id, blog);
        await blog.save()

        return res.status(200).json({
            msg: 'Blog edited successfully.',
            data: blog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
    }



}

exports.deleteBlog = async (req, res) => {

    try {
        const id = req.params.id;

        //get the blog by id
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found.' });
        }

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized: You are not the author of this blog.' });
        }

        const deleteBlog = await Blog.findByIdAndDelete(id);

        return res.status(200).json({
            msg: 'Blog deleted successfully.',
            data: deleteBlog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
    }
}

exports.getAllBlogs = async (req, res) => {

    try {
        const blogs = await Blog.find();

        if (blogs && blogs.length > 0) {
            return res.status(200).json({
                message: 'Success',
                data: blogs
            });
        } else {
            return res.status(404).send({
                message: "data not found"
            })
        }




    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
    }

}

exports.getBlogById = async (req, res) => {

    try {
        const id = req.params.id;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            message: "Success",
            data: blog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal server error.',
            error: error
        });
    }
}