import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const newPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/\d/, "Password must contain a number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/\d/, "Password must contain a number")
    .required("Password is required"),
});

export const NumberSchema = Yup.object().shape({
  number: Yup.string()
    .matches(/^\+?\d{10,14}$/, "PhoneNumber is not valid") // Adjust regex as needed
    .required("PhoneNumber is required"),
});

// export const amountSchema = Yup.object().shape({
//   amount: Yup.number()
//     .typeError("Amount must be a number")
//     .min(0, "Amount must be a positive number")
//     .required("Amount is required"),
// });
