import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const signUpValidationSchema = yup.object().shape({
  name: yup.string().required("Full Name is Required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const postValidationSchema = yup.object().shape({
  location: yup.string().required("Location is Required"),
  rating: yup
    .number()
    .min(0, ({ min }) => `Ratings must be at least ${min}`)
    .max(5, ({ max }) => `Ratings must be at most ${max}`)
    .required("Rating is required"),
  review: yup.string().required("Review Body is required"),
});

module.exports = {
  loginValidationSchema,
  signUpValidationSchema,
  postValidationSchema,
};
