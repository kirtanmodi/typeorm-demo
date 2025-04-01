import "reflect-metadata";
import { AppDataSource } from "./data-source/index.js";
import { User } from "./entity/User.js";
import { createApp } from "./app.js";

async function main() {
  try {
    // Initialize the database connection
    await AppDataSource.initialize();
    console.log("Database connection established successfully");

    // Seed an admin user if none exists
    const userRepository = AppDataSource.getRepository(User);
    const adminCount = await userRepository.count({ where: { isAdmin: true } });

    if (adminCount === 0) {
      console.log("Creating admin user...");
      const admin = userRepository.create({
        email: "admin@example.com",
        firstName: "Admin",
        lastName: "User",
        password: "password123", // Will be hashed by entity hook
        isAdmin: true,
      });

      await userRepository.save(admin);
      console.log("Admin user created successfully");
    }

    // Create and start Express server
    const app = createApp();
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1);
  }
}

main();
