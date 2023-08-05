'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require('express'));
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const academicFaculty_controller_1 = require('./academicFaculty.controller');
const academicFaculty_validation_1 = require('./academicFaculty.validation');
// import { AcademicFacultyValidation } from './academicFaculty.validations';
const router = express_1.default.Router();
router.post(
  '/create-faculty',
  (0, validateRequest_1.default)(
    academicFaculty_validation_1.AcademicFacultyValidation
      .createFacultyZodSchema
  ),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicFaculty_controller_1.AcademicFacultyController.createFaculty
);
// router.get(
//   '/:id',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.FACULTY
//   ),
//   AcademicFacultyController.getSingleFaculty
// );
// router.get(
//   '/',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.FACULTY
//   ),
//   AcademicFacultyController.getAllFaculties
// );
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    academicFaculty_validation_1.AcademicFacultyValidation
      .updatefacultyZodSchema
  ),
  //   auth(
  //     ENUM_USER_ROLE.SUPER_ADMIN,
  //     ENUM_USER_ROLE.ADMIN,
  //     ENUM_USER_ROLE.FACULTY
  //   ),
  academicFaculty_controller_1.AcademicFacultyController.updateFaculty
);
router.delete(
  '/:id',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN),
  academicFaculty_controller_1.AcademicFacultyController.deleteFaculty
);
exports.AcademicFacultyRoutes = router;
