import axiosClient from './axiosClient'

export const getAllPatients = async () => {
  const res = await axiosClient.get('/view')
  return res.data
}

export const getPatient = async (id) => {
  const res = await axiosClient.get(`/patient/${id}`)
  return res.data
}

export const createPatient = async (patient) => {
  const res = await axiosClient.post('/post', patient)
  return res.data
}

export const updatePatient = async (id, patient) => {
  const res = await axiosClient.put(`/edit/${id}`, patient)
  return res.data
}

export const deletePatient = async (id) => {
  const res = await axiosClient.delete(`/delete/${id}`)
  return res.data
}

export const sortPatients = async (sortBy, order) => {
  const res = await axiosClient.get('/sort', {
    params: { sort_by: sortBy, order }
  })
  return res.data
}
