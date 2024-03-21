import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    user: { 
      type: Schema.Types.ObjectId, ref: 'User', required: true
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;