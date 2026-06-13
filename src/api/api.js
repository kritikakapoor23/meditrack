import axios from 'axios'

const BASE_URL = 'https://patient-management-system-59ds.onrender.com'

export const getAllPatients = async () => {
  const res = await axios.get(`${BASE_URL}/view`)
  return res.data
}

export const getPatient = async (id) => {
  const res = await axios.get(`${BASE_URL}/patient/${id}`)
  return res.data
}

export const createPatient = async (patient) => {
  const res = await axios.post(`${BASE_URL}/post`, patient)
  return res.data
}

export const updatePatient = async (id, patient) => {
  const res = await axios.put(`${BASE_URL}/edit/${id}`, patient)
  return res.data
}

export const deletePatient = async (id) => {
  const res = await axios.delete(`${BASE_URL}/delete/${id}`)
  return res.data
}

export const sortPatients = async (sortBy, order) => {
  const res = await axios.get(`${BASE_URL}/sort`, {
    params: { sort_by: sortBy, order }
  })
  return res.data
}