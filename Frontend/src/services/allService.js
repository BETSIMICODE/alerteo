import axios from 'axios';
export const get = async (apiUrl) => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Failed", error);
    throw error;
  }
};
export const getById = async (id,apiUrl) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed  ${id}:`, error);
    throw error;
  }
};

export const create = async (data,apiUrl) => {
  try {
    const response = await axios.post(apiUrl, data);
    return response.data;
  } catch (error) {
    console.error("Failed ", error);
    throw error;
  }
};

export const update = async (id, data,apiUrl) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Failed ${id}:`, error);
    throw error;
  }
};

export const _delete = async (id,apiUrl) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    return null;
  } catch (error) {
    console.error(`Failed ${id}:`, error);
    throw error;
  }
};
