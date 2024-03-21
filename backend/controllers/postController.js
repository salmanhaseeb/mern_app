import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, body, image } = req.body;

  const user = await User.findById(req.user._id);

  const post = await Post.create({
    title,
    body,
    image,
    user: user._id
  });

  if (post) {
    res.status(201).json({
      title: post.title,
      body: post.body,
      image: post.image,
    });
  } else {
    res.status(400);
    throw new Error('Invalid post data');
  }
});


// @desc    Fetch user posts
// @route   GET /api/posts
// @access  Private
const getUserPosts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const userPosts = await Post.find({ user: user._id }).populate('user').exec();

  if (userPosts) {
    res.status(200).json(userPosts);
  } else {
    res.status(500);
    throw new Error('Someting went wrong.');
  }
});

// @desc    Fetch user post by id
// @route   GET /api/posts/:id
// @access  Private
const getUserPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user').exec();;

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error('Post not found.');
  }
});

// @desc    Update user post by id
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = req.body.title || post.title;
    post.body = req.body.body || post.body;

    const updatedPost = await post.save();

    res.json({
      _id: updatedPost._id,
      title: updatedPost.title,
      body: updatedPost.body,
    });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Delete user post by id
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if(post) {
    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' })
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

export {
  createPost,
  getUserPosts,
  getUserPostById,
  updatePost,
  deletePost
};