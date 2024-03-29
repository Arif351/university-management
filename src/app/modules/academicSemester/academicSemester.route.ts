import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.Validation';
import { academicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  academicSemesterController.createSemester
);
router.get('/:id', academicSemesterController.getSingleSemester);

router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
  academicSemesterController.updateSemester
);

router.delete('/:id', academicSemesterController.deleteSemester);

router.get('/', academicSemesterController.getAllSemester);

export const AcademicSemesterRoute = router;
