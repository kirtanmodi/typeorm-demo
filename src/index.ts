import "reflect-metadata";
import { AppDataSource } from "./data-source/index.js";
import { User } from "./entity/User.js";
import { createApp } from "./app.js";
import { Address, AddressType } from "./entity/Address.js";
import { BankDetails } from "./entity/BankDetails.js";

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

    // add a sample address
    const addressRepository = AppDataSource.getRepository(Address);
    const addressCount = await addressRepository.count();

    if (addressCount === 0) {
      console.log("Creating sample address...");
      const address = addressRepository.create({
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
        country: "USA",
        isPrimary: true,
        addressType: AddressType.HOME,
        userId: "07ee4905-904b-4fc6-8d65-67ac84eb7887",
      });

      // add a sample bank details
      const bankDetailsRepository = AppDataSource.getRepository(BankDetails);
      const bankDetailsCount = await bankDetailsRepository.count();

      if (bankDetailsCount === 0) {
        console.log("Creating sample bank details...");
        const bankDetails = bankDetailsRepository.create({
          bankName: "Bank of America",
          accountNumber: "1234567890",
          routingNumber: "123456789",
          swiftCode: "123456789",
          iban: "1234567890",
          accountHolderName: "John Doe",
          isPrimary: true,
          userId: "07ee4905-904b-4fc6-8d65-67ac84eb7887",
        });

        await bankDetailsRepository.save(bankDetails);
        console.log("Sample bank details created successfully");
      }

      await addressRepository.save(address);
      console.log("Sample address created successfully");
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
