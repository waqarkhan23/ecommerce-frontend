import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useFetchCategory from "./../../Hooks/useFetchCategory";
import useAddProduct from "../../Hooks/useAddProduct";

const CreateProduct = () => {
  const { mutate: addProduct } = useAddProduct();
  const initialValues = {
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: undefined,
  };
  const { data: categories, isLoading, error } = useFetchCategory();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error fetching categories: {error.message}</p>;
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    price: Yup.number().positive("Must be positive").required("Required"),
    category: Yup.string().required("Required"),
    stock: Yup.number()
      .integer("Must be an integer")
      .min(0, "Must be 0 or greater")
      .required("Required"),
    description: Yup.string().required("Required"),
    image: Yup.mixed().required("Required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Submitting values:", values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("stock", values.stock);
    formData.append("description", values.description);
    formData.append("image", values.image);

    addProduct(formData, {
      onSuccess: () => {
        setSubmitting(false);
        resetForm();
      },
    });
    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl  p-6 m-2 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Product Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  name="category"
                  as="select"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  name="stock"
                  type="number"
                  placeholder="Stock"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>
            <div>
              <Field
                name="description"
                as="textarea"
                placeholder="Product Description"
                rows="4"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <input
                type="file"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                {isSubmitting ? "Adding..." : "Add Product"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
