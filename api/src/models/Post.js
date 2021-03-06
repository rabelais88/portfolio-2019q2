import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const PostSchema = {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: [String],
};
const Post = new mongoose.Schema(PostSchema, { timestamps: true });

// custom method
// myModel.methods.changeTitle = function (newTitle) {
// this.name = newTitle;
// this.save();
// }

// static method
// myModel.statics = {
//   findUser(name) {
//   return this.findOne({name})
//   }
// }

// 나중에 await MyModel.changeTitle('this will be the new title'); 로 실행

Post.plugin(mongoosePaginate);
// https://www.npmjs.com/package/mongoose-paginate-v2

export default mongoose.model('Post', Post); // <- 여기에 String으로 전달하는 인자가 실제 mongoose에서 사용할 이름/테이블 이름
