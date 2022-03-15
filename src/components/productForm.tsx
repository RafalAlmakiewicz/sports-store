import Input from "./Input";
import React from "react";
import { useParams } from "react-router";
import Select from "./select";
import { useActivities } from "../contexts/activitiesContext";
import { Product } from "../types";
import { useProducts } from "../contexts/productsContext";

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const { updateProduct, createProduct, products } = useProducts();
  const product = products.find((product) => product._id === id);
  const { activities } = useActivities();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const newProduct = {
      ...form,
      _id: product?._id,
      activity: activities.find((activity) => activity._id === form.activity),
    } as Product;
    if (product) {
      updateProduct(newProduct);
    } else createProduct(newProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="name"
        type="text"
        defaultValue={product?.name}
        validation={{ required: true, maxLength: 200 }}
      />
      <Input
        name="price"
        type="number"
        defaultValue={product?.price}
        validation={{ required: true, step: 0.01, min: 0.01 }}
      />
      <Input
        name="stock"
        type="number"
        defaultValue={product?.stock}
        validation={{ required: true, min: 0 }}
      />
      <Select
        name="activity"
        items={activities}
        valueProp="_id"
        textProp="name"
        defaultValue={product?.activity._id}
        validation={{ required: true }}
      />
      <div>
        <label>Description</label>
        <textarea
          maxLength={1000}
          rows={5}
          name="description"
          defaultValue={product?.description}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
