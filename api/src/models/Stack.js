// skillsets and skill stacks
import mongoose from 'mongoose';

const StackSchema = {
  name: {
    type: String,
    default: 'unnamed skill',
    required: true,
  },
  desc: {
    type: String,
    default: 'unnamed description',
    required: true,
  },
  icon: String
};
const Stack = new mongoose.Schema(StackSchema, { timestamps: true });

export default mongoose.model('Stack', Stack); // <- 여기에 String으로 전달하는 인자가 실제 mongoose에서 사용할 이름/테이블 이름
