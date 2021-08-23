import axios from "axios";

const endpoint = "";
const product = { name: "golf ball" };

const getProducts = async () => {
  const { data: product } = await axios.get(endpoint);
  console.log(data);
};

const createProduct = async (product) => {
  const { data } = await axios.post(endpoint, product);
  console.log(data);
};

const updateProduct = async (product) => {
  const { data } = await axios.put(`${endpoint}/${product.id}`, product);
  console.log(data);
};

const deleteProduct = async (id) => {
  await axios.delete(`${endpoint}/${id}`);
  console.log("deleted");
};

axios.interceptors.response.use(null, (error) => {
  const excpectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!excpectedError) {
    console.log("unexcpected error!");
    return Promise.reject(error);
  }

  return Promise.reject(error);
});
