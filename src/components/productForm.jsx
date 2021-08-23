import React from "react";
import { getProduct } from "../getProducts";
import DropDownList from "./dropDownList";
import Input from "./Input";

const ProductForm = ({ categories, activities, match }) => {
  const product = getProduct(match.params.id);
  if (product) console.log("edytowany produkt: ", product.id);

  const propsFor = {
    name: {
      name: "name",
      type: "text",
      validation: { required: true, maxLength: 200 },
    },
    price: {
      name: "price",
      type: "number",
      validation: { required: true, step: 0.01, min: 0.01 },
    },
    stock: {
      name: "stock",
      type: "number",
      validation: { required: true, min: 0 },
    },
    activity: {
      name: "activity",
      items: activities,
      valueProp: "id",
      textProp: "name",
      validation: { required: true },
    },
  };

  return (
    <form>
      <Input {...propsFor.name} />
      <Input {...propsFor.price} />
      <Input {...propsFor.stock} />
      <DropDownList {...propsFor.activity} />
      <div>
        <textarea
          maxLength="1000"
          rows="5"
          name="description"
          defaultValue="description..."
        ></textarea>
      </div>
      <button type="submit">Add to store</button>
    </form>
  );
};

export default ProductForm;

{
  /* {<div>
        <label for="productName">Name</label>
        <input
          type="text"
          id="productName"
          name="productName"
          required
          maxLength="200"
        />
      </div>}
      <div>
        <label for="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          min="0.01"
          required
        />
      </div>
      <div>
        <label for="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          min="0"
          value="0"
          required
        />
      </div>
     
      <div>
        <label htmlFor="activity">Activity</label>
        <select required id="activity" name="activity">
          <option key="0" value="">
            please select activity
          </option>
          {activities.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="category">Activity</label>
        <select required id="category" name="category">
          <option key="0" value="">
            please select category
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div> */
}
