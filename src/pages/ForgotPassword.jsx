import Layout from "../layout/Layout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import signin from "../assets/signin2.svg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    newpassword: Yup.string().required("Password is required"),
    question: Yup.string().required("Answer is required"),
  });

  const initialValues = {
    email: "",
    question: "",
    newpassword: "",
  };

  const onSubmit = async (values) => {
    const { email, question, newpassword } = values;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/forgot-password`,
        {
          email,
          question,
          newpassword,
        }
      );
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password. Please try again");
    }
  };
  return (
    <Layout title={"Forgot Password - Wiki Store"}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
              <Form className="space-y-6">
                <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">
                  Forgot Password
                </h1>

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="newpassword"
                    type="password"
                    placeholder="New Password"
                    className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="new password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="question"
                    type="text"
                    placeholder="Enter Your Best Friend's Name"
                    className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="question"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300">
                  Update Password
                </button>
              </Form>
            </Formik>
          </div>
        </div>
        <div className=" bg-gray-100 flex items-center justify-center gap-2 ">
          <img src={signin} alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
