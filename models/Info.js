import mongoose from 'mongoose';

const InfoSchema = {
  stacks: {
    type: Array,
    default: []
  },
  indexMarkdown: {
    type: String,
    default: 'index page info goes here'
  },
}
const Info = new mongoose.Schema(InfoSchema, { timestamps: true })

const getLatest = async () => {
  const isAvail = await this.countDocuments();
  if (!isAvail) await this.create();
  const latest = await this.findOne().sort({created_at: -1});
  return latest;
}

Info.statics = {
  async updateStacks(newStacks) {
    const latest = await getLatest.call(this);
    latest.set('stacks', newStacks);
    return await latest.save();
  },
  async updateIndex(newIndex) {
    const latest = await getLatest.call(this);
    latest.set('indexMarkdown', newIndex);
    return await latest.save();
  },
  async getStacks() {
    const latest = await getLatest.call(this);
    return latest.stacks;
  },
  async getIndex() {
    const latest = await getLatest.call(this);
    return latest.indexMarkdown;
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

export default mongoose.model('Info', Info); // <- 여기에 String으로 전달하는 인자가 실제 mongoose에서 사용할 이름/테이블 이름