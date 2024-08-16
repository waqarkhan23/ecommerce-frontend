import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../utils/ValidationSchema";
import Layout from "../layout/Layout";
import signup from "../assets/signup.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    question: "",
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
          address: values.address,
          phone: values.phone,
          question: values.question,
        }
      );
      if (response.status === 201) {
        toast.success("Registrated Successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className=" bg-gray-100 flex items-center justify-center gap-2 ">
          <img src={signup} alt="" />
        </div>
        <div className="flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
              <Form className="space-y-6">
                <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">
                  Register
                </h1>
                <div>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
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
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="address"
                    type="text"
                    placeholder="Address"
                    className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="question"
                    type="text"
                    placeholder="Your bestfriend's name"
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
                  Register
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
