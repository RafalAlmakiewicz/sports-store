import axios from "axios";

class ApiCaller<T extends { _id: string }> {
  constructor(private endpoint: string) {}

  getAll = async () => {
    const { data } = await axios.get(this.endpoint);
    return data as T[];
  };

  create = async (oldItems: T[], newItem: T) => {
    newItem = (await axios.post(this.endpoint, newItem)).data;
    return [...oldItems, newItem];
  };

  update = async (oldItems: T[], newItem: T) => {
    const { data } = await axios.put(
      `${this.endpoint}/${newItem._id}`,
      newItem
    );
    const oldItem = oldItems.find((item) => item._id === newItem._id) as T;
    if (!oldItem)
      throw Error(
        "update failed - item to update is missing - invalid app state"
      );
    const index = oldItems.indexOf(oldItem);
    const newItems = [...oldItems];
    newItems[index] = data;
    return newItems;
  };

  delete = async (items: T[], id: string) => {
    await axios.delete(`${this.endpoint}/${id}`);
    return items.filter((item) => item._id !== id);
  };
}
export default ApiCaller;
