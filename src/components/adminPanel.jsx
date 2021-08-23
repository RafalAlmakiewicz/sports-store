import React from "react";
import ProductForm from "./productForm";
import { NavLink, Link } from "react-router-dom";

const AdminPanel = ({ onGetProducts, onDeleteProduct, onUpdateProduct }) => {
  return (
    <React.Fragment>
      <nav>
        <NavLink to="/productForm">New Item</NavLink>
      </nav>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <Link to={`/productForm/${p.id}`}>Update</Link>
                </td>
                <td>
                  <btn type="button" onclick={() => onDeleteProduct(p.id)}>
                    Delete
                  </btn>
                </td>
              </tr>
            ))}
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default AdminPanel;
