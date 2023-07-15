import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidation } from './student.validation';
const router = express.Router();

router.get('/:id', studentController.getSingleStudent);
router.get('/', studentController.getAllStudents);
router.delete('/:id/', studentController.deleteStudent);

router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  studentController.updateStudent
);

export const StudentRoute = router;
