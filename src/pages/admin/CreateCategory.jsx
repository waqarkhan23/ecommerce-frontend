import { useState } from "react";

import useFetchCategory from "../../Hooks/useFetchCategory";
import useDeleteCategory from "../../Hooks/useDeleteCategory";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAddCategory from "../../Hooks/useAddCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "./../../utils/api";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

const CreateCategory = () => {
  const { data: categories, isLoading, error } = useFetchCategory();
  const queryClient = useQueryClient();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: addCategory } = useAddCategory();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    // setName(category.name);
  };

  const { mutate: updateCategory } = useMutation({
    mutationFn: async ({ id, name }) => {
      try {
        await axios.put(`/category/update-category/${id}`, { name });
        toast.success("Category updated successfully!");
      } catch (error) {
        console.error("Error updating category:", error);
        toast.error("Error updating category!");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
  const handleSubmit = async (value, { resetForm }) => {
    if (selectedCategory) {
      updateCategory({ id: selectedCategory._id, name: value.name });
    } else {
      addCategory({ name: value.name });
      setSelectedCategory(null);
    }
    setSelectedCategory(null);
    resetForm();
  };

  const handleDelete = async (id) => {
    deleteCategory(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
      <Formik
        initialValues={{ name: selectedCategory ? selectedCategory.name : "" }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}>
        <Form className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div className="mb-4">
            <Field
              name="name"
              type="text"
              placeholder="Enter category name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="text-red-500 text-xs italic mt-1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
            {selectedCategory ? "Update" : "Add"} Category
          </button>
        </Form>
      </Formik>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : categories && categories.length > 0 ? (
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category._id}
              className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span>{category.name}</span>
              <div>
                <button
                  onClick={() => handleEdit(category)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-500 text-white p-1 rounded">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default CreateCategory;
