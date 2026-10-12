import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllPatients, deletePatient, sortPatients } from '../api/api'
import { useAuth } from '../context/AuthContext'

const usePatients = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const data = await getAllPatients()
      const arr = Object.entries(data).map(([id, info]) => ({ id, ...info }))
      setPatients(arr)
    } catch (err) {
      setError('Failed to fetch patients')
    } finally {
      setLoading(false)
    }
  }

  const removePatient = async (id) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
      return
    }
    try {
      await deletePatient(id)
      setPatients(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError('Failed to delete patient')
    }
  }

  const sortBy = async (field, order) => {
    try {
      const data = await sortPatients(field, order)
      setPatients(data.map(p => ({ id: p.id, ...p })))
    } catch (err) {
      setError('Failed to sort patients')
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  return { patients, loading, error, fetchPatients, removePatient, sortBy }
}

export default usePatients