import mongoose from 'mongoose';

const PostSchema = {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: String,
};
const Post = new mongoose.Schema(PostSchema, { timestamps: true });

Post.statics = {
  async getLists(limit, id) {
    if (!limit) throw Error('[mongoose]Post.js - must set limit when querying');
    let posts = [];
    if (!id) posts = await this.find().limit(limit);
    else posts = await this.find({ _id: { $gt: id } }).limit(limit);
    const nextCursor = posts.length < 1 ? 0 : posts[posts.length - 1].id;
    const prevCursor = posts[0].id;
    const hasNext = !!(await this.findOne({ _id: { $gt: nextCursor }}));
    const hasPrev = !!(await this.findOne({ _id: { $lt: prevCursor }}));
    return {
      posts,
      prevCursor,
      nextCursor,
      hasNext,
      hasPrev,
    }
  }
}
// custom method
// myModel.methods.changeTitle = function (newTitle) {
// 	this.name = newTitle;
// 	this.save();
// }

// static method
// myModel.statics = {
//   findUser(name) {
//   	return this.findOne({name})
//   }
// }

// 나중에 await MyModel.changeTitle('this will be the new title'); 로 실행

export default mongoose.model('Post', Post); // <- 여기에 String으로 전달하는 인자가 실제 mongoose에서 사용할 이름/테이블 이름
