import React, { useEffect } from "react";
import ProductForm from "./productForm";
import { NavLink, Link } from "react-router-dom";
import resetDatabase from "../resetDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminPanel = ({ products, onDeleteProduct }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.add("dark");
  }, []);

  return (
    <div className="admin-panel">
      <div className="admin-panel-actions">
        <button
          className="btn btn-secondary"
          onClick={() => {
            resetDatabase();
          }}
        >
          Set database to default data
        </button>
        <Link className="btn btn-secondary" to="/productForm">
          New Item
        </Link>
      </div>
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
                <Link to={`/productForm/${p._id}`}>
                  <FontAwesomeIcon icon="edit" />
                </Link>
              </td>
              <td>
                <button type="button" onClick={() => onDeleteProduct(p._id)}>
                  <FontAwesomeIcon icon="trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
