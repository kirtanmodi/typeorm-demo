import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { UserService } from "./service/UserService.js";

export function createApp(): Express {
  const app = express();
  const userService = new UserService();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Health check route
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  // User routes
  app.get("/users", async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  });

  app.get("/users/:id", async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  });

  app.post("/users", async (req: Request, res: Response) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Error creating user", error });
    }
  });

  app.put("/users/:id", async (req: Request, res: Response) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Error updating user", error });
    }
  });

  app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.json({ success: result });
    } catch (error) {
      res.status(400).json({ message: "Error deleting user", error });
    }
  });

  return app;
}
