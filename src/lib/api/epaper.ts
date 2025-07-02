// lib/api/epaper.ts
'use client';

import { EpaperData } from '@/types/epaper';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllEpapers = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
} = {}) => {
  const response = await axios.get(`${API_BASE_URL}/epaper/getAllEpapers`, { params });
  return response.data;
};

export const getEpaperById = async (id: number) => {
  console.log(id);
  
  const response = await axios.get(`${API_BASE_URL}/epaper/${id}`);
  return response.data;
};

export const createEpaper = async (data: EpaperData ) => {
  const response = await axios.post(`${API_BASE_URL}/epaper/create`, data,{withCredentials:true});

  return response.data;
};

export const updateEpaper = async (id: number, data: EpaperData) => {
  const response = await axios.put(`${API_BASE_URL}/epaper/${id}`, data,{withCredentials:true});
  return {data:response.data,message:response.statusText};
};

export const deleteEpaper = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/epaper/${id}`,{withCredentials:true});
  return response.data;
};