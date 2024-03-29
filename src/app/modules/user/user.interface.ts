import { Model, Types } from 'mongoose';
import { IStudent } from '../Student/student.interface';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

// 1. Create an interface representing a document in MongoDB.
export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IAcademicFaculty;
  // admin?: Types.ObjectId | IAdmin;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
