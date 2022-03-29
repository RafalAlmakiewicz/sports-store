import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../contexts/productsContext";
import { useApi } from "../../contexts/apiContext";
import ErrorList from "../reusable/errorsList/errorsList";
import tryRequest from "../../utils/tryRequest";
import styles from "./adminPanel.module.scss";
import AdminPanelRow from "./adminPanelRow";

const AdminPanel = () => {
  const { products, deleteProduct, getAllProducts } = useProducts();
  const { resetDatabase } = useApi();
  const [error, setError] = useState("");

  const SetDbToDefaulData = async () => {
    let error = await tryRequest(resetDatabase);
    if (error) setError(error);
    else {
      error = await tryRequest(getAllProducts);
      if (error) setError(error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (products.length === 1) {
      setError("Must contain at least 1 product");
      return;
    }
    const error = await tryRequest(deleteProduct, id);
    if (error) setError(error);
  };

  return (
    <div className={styles.panel}>
      <h2>Admin Panel</h2>
      <p>
        I encourage to try create, update and delete products, and then data can
        be restored with button below.
      </p>
      <div className={styles.actions}>
        <button className="btn-primary" onClick={SetDbToDefaulData}>
          Set database to default data
        </button>
        <Link className="btn btn-primary" to="/productForm">
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
            <AdminPanelRow
              key={product._id}
              product={product}
              handleDeleteProduct={handleDeleteProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
