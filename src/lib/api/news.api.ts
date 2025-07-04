
import axios from 'axios';

const API_URL = 'http://localhost:7700/api/news';

export const fetchNews = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/getNewsForDashboard`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};




export const deleteNews = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`,{withCredentials:true});
    return response.data;
  } catch (error) {
    console.error('Error deleting news:', error);
    throw error;
  }
};