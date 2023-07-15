import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import httpStatus from 'http-status';
const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
// app.use('/api/v1/users/', UserRoute);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoute);
app.use('/api/v1/', router);

// testing API
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing new')
// })

app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found.',
      },
    ],
  });
  next();
});

// const academicSemester = {
//   year: '2033',
//   code: '01',
// };
// const testId = async () => {
//   const testId = await generateFacultyId();
//   console.log(testId);
// };
// testId();

export default app;
