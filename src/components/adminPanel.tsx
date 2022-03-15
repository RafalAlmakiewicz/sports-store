import { useEffect } from "react";
import { Link } from "react-router-dom";
import resetDatabase from "../resetDatabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProducts } from "../contexts/productsContext";

const AdminPanel = () => {
  const { products, deleteProduct } = useProducts();

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
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
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.activity.name}</td>
              <td>
                <Link to={`/productForm/${product._id}`}>
                  <FontAwesomeIcon icon="edit" />
                </Link>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => deleteProduct(product._id)}
                >
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
