import { z } from "zod";

// Create a schema for login form
const updateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

export default updateSchema;
