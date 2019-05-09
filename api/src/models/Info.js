import mongoose from 'mongoose';

const InfoSchema = {
  indexMarkdown: {
    type: String,
    default: 'index page info goes here',
    required: true,
  },
};
const Info = new mongoose.Schema(InfoSchema, { timestamps: true });

Info.statics = {
  async getLatest() {
    const isAvail = await this.countDocuments() >= 1;
    if (!isAvail) await this.create({});
    const latest = await this.findOne().sort({ created_at: -1 });
    return latest;
  },
  async updateIndex(newIndex) {
    const latest = await this.getLatest();
    latest.set('indexMarkdown', newIndex);
    await latest.save();
    return latest.indexMarkdown;
  },
  async getIndex() {
    const latest = await this.getLatest();
    return latest.indexMarkdown;
  },
};

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

export default mongoose.model('Info', Info); // <- 여기에 String으로 전달하는 인자가 실제 mongoose에서 사용할 이름/테이블 이름
