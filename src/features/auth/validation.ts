import * as yup from "yup";

const email = yup
  .string()
  .trim()
  .required("Enter your email address")
  .email("Enter a valid email address");

const newPassword = yup
  .string()
  .required("Enter a password")
  .min(8, "Use at least 8 characters");

const confirmPassword = yup
  .string()
  .required("Confirm your password")
  .oneOf([yup.ref("password")], "Passwords don't match");

export const emailSchema = yup.object({ email });

export const loginSchema = yup.object({
  email,
  password: yup.string().required("Enter your password"),
});

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Enter your full name")
    .min(2, "Enter your full name"),
  email,
  password: newPassword,
  confirmPassword,
});

export const resetPasswordSchema = yup.object({
  password: newPassword,
  confirmPassword,
});
