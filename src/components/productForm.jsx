import React from "react";
import DropDownList from "./dropDownList";
import Input from "./Input";
import withLabel from "./withLabel";

const ProductForm = ({
  product,
  activities,
  onCreateProduct,
  onUpdateProduct,
}) => {
  const propsFor = {
    name: {
      name: "name",
      type: "text",
      defaultValue: product?.name,
      validation: { required: true, maxLength: 200 },
    },
    price: {
      name: "price",
      type: "number",
      defaultValue: product?.price,
      validation: { required: true, step: 0.01, min: 0.01 },
    },
    stock: {
      name: "stock",
      type: "number",
      defaultValue: product?.stock,
      validation: { required: true, min: 0 },
    },
    activity: {
      name: "activity",
      items: activities,
      valueProp: "_id",
      textProp: "name",
      value: product?.activity._id,
      validation: { required: true },
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log("formdata: ", formData);
    const obj = Object.fromEntries(formData);
    if (product) {
      onUpdateProduct(obj, product._id);
    } else onCreateProduct(obj);
  };

  const DropDownWithLabel = withLabel(DropDownList, "name");

  return (
    <form onSubmit={handleSubmit}>
      <Input {...propsFor.name} />
      <Input {...propsFor.price} />
      <Input {...propsFor.stock} />
      <DropDownWithLabel {...propsFor.activity} />
      <div>
        <textarea
          maxLength="1000"
          rows="5"
          name="description"
          defaultValue={product?.description}
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
