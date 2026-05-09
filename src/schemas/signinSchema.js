import * as Yup from "yup";

export const signinSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/\d/, "Password must contain a number")
    .required("Password is required"),
});

export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/[0-9]/, "OTP must contains only digits")
    .min(4, "OTP must be 4 digits")
    .max(4, "OTP must be 4 digits"),
});

export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const profileSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const updatePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Old Password is required")
    .min(8, "Old Password must be at least 8 characters")
    .matches(/[A-Z]/, "Old Password must contain an uppercase letter")
    .matches(/[a-z]/, "Old Password must contain a lowercase letter")
    .matches(/\d/, "Old Password must contain a number"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "New Password must be at least 8 characters")
    .matches(/[A-Z]/, "New Password must contain an uppercase letter")
    .matches(/[a-z]/, "New Password must contain a lowercase letter")
    .matches(/\d/, "New Password must contain a number"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
