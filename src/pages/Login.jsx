import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../layout/Layout";
import signin from "../assets/signin2.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setUser, setToken } from "../store/userSlice/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    const { email, password } = values;
    // Make API call to authenticate user with provided email and password
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("userToken", response.data.token);
      toast.success("Logged in successfully!");
      // Redirect user to home page after successful login
      dispatch(login());
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      navigate(location.state || "/");
    } catch (error) {
      toast.error("invalid email or password.");
    }
  };
  return (
    <Layout title={"Login - Wiki Store"}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
              <Form className="space-y-6">
                <h1 className="text-3xl text-center font-bold text-gray-800 mb-6">
                  Login
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
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300">
                  Login
                </button>
              </Form>
            </Formik>
            <div>
              <p className="text-center text-gray-500 mt-3 ">
                Forgot Password?{" "}
                <span
                  className="text-blue-600 hover:text-blue-700 cursor-pointer"
                  onClick={() => navigate("/forgot-password")}>
                  Reset
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className=" bg-gray-100 flex items-center justify-center gap-2 ">
          <img src={signin} alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
