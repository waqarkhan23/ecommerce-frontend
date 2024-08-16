import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Required"),
  phone: Yup.string()
    .min(10, "Must be at least 10 digits")
    .required("Required"),
  address: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Required"),
  question: Yup.string()
    .min(4, "Must be at least 10 characters")
    .max(10, "Must be at most 10 characters")
    .required("Required"),
});

export default validationSchema;
