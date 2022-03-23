import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProducts } from "../contexts/productsContext";
import { useApi } from "../contexts/apiContext";
import ErrorList from "./ErrorList";
import { tryRequest } from "../utils";

const AdminPanel = () => {
  const { products, deleteProduct, getAllProducts } = useProducts();
  const { resetDatabase } = useApi();
  const [error, setError] = useState("");

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
    body.classList.add("dark");
  }, []);

  const SetDbToDefaulData = async () => {
    let error = await tryRequest(resetDatabase);
    if (error) setError(error);
    else {
      error = await tryRequest(getAllProducts);
      if (error) setError(error);
    }
  };

  const handleDeleteProduct = (id: string) => async () => {
    const error = await tryRequest(deleteProduct, id);
    if (error) setError(error);
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="admin-panel-actions">
        <button className="btn btn-secondary" onClick={SetDbToDefaulData}>
          Set database to default data
        </button>
        <Link className="btn btn-secondary" to="/productForm">
          New Item
        </Link>
      </div>
      {error && <ErrorList errors={[error]} />}
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
                <Link to={`/productForm/${product._id}`} data-testid="update">
                  <FontAwesomeIcon icon="edit" />
                </Link>
              </td>
              <td>
                <button
                  data-testid="delete"
                  type="button"
                  onClick={handleDeleteProduct(product._id)}
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
