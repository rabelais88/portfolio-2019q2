import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const AdminSchema = {
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: String,
};
const Admin = new mongoose.Schema(AdminSchema);

Admin.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

Admin.statics = {
  async login(email, password) {
    const admin = await this.findOne({ email });
    if (!admin) return false;
    const isValid = await bcrypt.compare(password, admin.password);
    return isValid ? admin : false;
  },
};

export default mongoose.model('Admin', Admin);
