"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validations_1 = require("./academicDepartment.validations");
const router = express_1.default.Router();
router.post('/create-department', (0, validateRequest_1.default)(academicDepartment_validations_1.AcademicDepartmentValidation.createAcademicDepartmentZodSchema), 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
academicDepartment_controller_1.AcademicDepartmentController.createDepartment);
router.get('/:id', academicDepartment_controller_1.AcademicDepartmentController.getSingleDepartment);
router.get('/', academicDepartment_controller_1.AcademicDepartmentController.getAllDepartments);
router.patch('/:id', (0, validateRequest_1.default)(academicDepartment_validations_1.AcademicDepartmentValidation.updateAcademicDepartmentZodSchema), 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
academicDepartment_controller_1.AcademicDepartmentController.updateDepartment);
router.delete('/:id', 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN),
academicDepartment_controller_1.AcademicDepartmentController.deleteDepartment);
exports.AcademicDepartmentRoutes = router;
