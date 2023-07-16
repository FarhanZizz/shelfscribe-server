//app.ts
import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import { UserRoutes } from "./modules/user/user.routes";

app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
