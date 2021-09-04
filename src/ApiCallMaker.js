import axios from "axios";

class ApiCallMaker {
  constructor(endpoint, items, setItems) {
    this.endpoint = endpoint;
    this.items = items;
    this.setItems = setItems;
  }

  get = async () => {
    const { data } = await axios.get(this.endpoint);
    console.log(data);
    this.setItems(data);
  };

  create = async (item) => {
    const { data } = await axios.post(this.endpoint, item);
    this.setItems(...this.items, data);
  };

  update = async (item, id) => {
    const { data } = await axios.put(`${this.endpoint}/${id}`, item);
    const index = this.items.indexOf(item);
    const items = [...this.items];
    items[index] = data;
    this.setItems(items);
  };

  delete = async (id) => {
    await axios.delete(`${this.endpoint}/${id}`);
    this.setItems(this.items.filter((i) => i._id !== id));
  };
}

export default ApiCallMaker;
