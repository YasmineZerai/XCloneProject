import { Application } from "express";
import { validation } from "../Middleware/validate";
import { z } from "zod";
import { loginController } from "../Controllers/auth";
import { errorMiddleware } from "../Middleware/error";
import { authMiddleware } from "../Middleware/auth";

export default function configureAuth(app: Application) {
  app.post("/login", [
    validation(
      z.object({
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      })
    ),
    loginController,
  ]);
  // app.post('/register', [validation()])
  app.post("/logout", [authMiddleware]);
}
