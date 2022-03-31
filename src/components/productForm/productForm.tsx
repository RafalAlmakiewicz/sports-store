import Input from "../reusable/input";
import React, { useState } from "react";
import { useParams } from "react-router";
import Select from "../reusable/select";
import { useActivities } from "../../contexts/activitiesContext";
import { Product } from "../../types";
import { useProducts } from "../../contexts/productsContext";
import { Field, useValidation } from "../../hooks/useValidation";
import ErrorList from "../reusable/errorsList/errorsList";
import TextArea from "../reusable/textArea";
import formatPrice from "../../utils/formatPrice";
import tryRequest from "../../utils/tryRequest";
import styles from "./productForm.module.scss";
import { Link } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const { updateProduct, createProduct, products } = useProducts();
  const product = products.find((product) => product._id === id);
  const { activities } = useActivities();

  const [form, setForm] = useState({
    name: product?.name ? product.name : "",
    price: product?.price ? product.price.toString() : "0.00",
    stock: product?.stock ? product.stock : 0,
    activity: product?.activity ? product.activity._id : "",
    description: product?.description ? product.description : "",
  });

  const schema: Field[] = [
    {
      name: "name",
      required: true,
      maxLength: 200,
    },

    {
      name: "price",
      required: true,
      min: 0.01,
    },
    {
      name: "stock",
      min: 0,
      integer: true,
    },
    {
      name: "activity",
      required: true,
    },
    {
      name: "description",
      required: true,
      maxLength: 1000,
    },
  ];

  const { errors, validateAllTouched, shouldDisableSubmit, setErrors } =
    useValidation(schema, !!product);

  const validate = (touchedFieldName: keyof typeof form) => () => {
    validateAllTouched(
      touchedFieldName,
      Object.entries(form).map(([name, value]) => {
        return { name, value: String(value) };
      })
    );
  };

  const validatePrice: React.FocusEventHandler<HTMLInputElement> = (event) => {
    validate("price")();
    setForm({
      ...form,
      price: formatPrice(+event.target.value, false),
    });
  };

  const handleChange =
    (fieldName: keyof typeof form) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      let { value } = event.target;
      setForm({
        ...form,
        [fieldName]: value,
      });
    };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (!form.activity) return;
    const newProduct = {
      ...form,
      _id: product?._id,
      price: +form.price,
      activity: activities.find((activity) => activity._id === form.activity),
    } as Product;
    const request = product ? updateProduct : createProduct;
    const error = await tryRequest(request, newProduct);
    if (error) setErrors([error]);
  };

  const getHeader = () => (product ? "Update Product" : "Create Product");

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{getHeader()}</h2>
      <Link className="btn btn-primary" to="/admin">
        back
      </Link>
      <ErrorList errors={errors} />
      <Input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange("name")}
        onBlur={validate("name")}
      />
      <Input
        name="price"
        type="number"
        step={0.01}
        value={form.price}
        onChange={handleChange("price")}
        onBlur={validatePrice}
      />
      <Input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange("stock")}
        onBlur={validate("stock")}
      />
      <Select
        name="activity"
        items={activities}
        valueProp="_id"
        textProp="name"
        value={form.activity}
        onChange={handleChange("activity")}
        onBlur={validate("activity")}
      />
      <TextArea
        name="description"
        rows={4}
        cols={50}
        value={form.description}
        onChange={handleChange("description")}
        onBlur={validate("description")}
      />
      <button
        disabled={shouldDisableSubmit()}
        type="submit"
        className="btn-primary"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
