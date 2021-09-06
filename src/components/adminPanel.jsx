import React from "react";
import ProductForm from "./productForm";
import { NavLink, Link } from "react-router-dom";
import resetDatabase from "../resetDatabase";

const AdminPanel = ({ products, onDeleteProduct }) => {
  console.log(products);
  return (
    <React.Fragment>
      <nav>
        <button
          onClick={() => {
            resetDatabase();
          }}
        >
          Set database to default data
        </button>
        <Link to="/productForm">New Item</Link>
      </nav>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Activity</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>{p.activity.name}</td>
              <td>
                <Link to={`/productForm/${p._id}`}>Update</Link>
              </td>
              <td>
                <button type="button" onClick={() => onDeleteProduct(p._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default AdminPanel;
