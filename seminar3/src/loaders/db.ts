import mongoose from 'mongoose';
import config from '../config';
import Blog from '../models/Blog';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    mongoose.set('autoCreate', true);

    console.log('Mongoose Connected ...');

    Blog.createCollection().then(function (collection) {
      console.log('Blog Collection is created!');
    });
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
