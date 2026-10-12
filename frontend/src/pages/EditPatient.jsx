import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPatient, updatePatient } from '../api/api'

const EditPatient = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '', city: '', age: '', gender: 'male', height: '', weight: ''
  })

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPatient(id)
        setForm({
          name: data.name,
          city: data.city,
          age: data.age,
          gender: data.gender,
          height: data.height,
          weight: data.weight
        })
      } catch {
        setError('Failed to load patient')
      } finally {
        setFetching(false)
      }
    }
    fetch()
  }, [id])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await updatePatient(id, {
        ...form,
        age: parseInt(form.age),
        height: parseFloat(form.height),
        weight: parseFloat(form.weight)
      })
      navigate('/patients')
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update patient')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'name', label: 'Full name', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'height', label: 'Height (metres)', type: 'number' },
    { name: 'weight', label: 'Weight (kg)', type: 'number' },
  ]

  if (fetching) return <p className="text-sm text-gray-400 mt-10">Loading patient...</p>

  return (
    <div className="max-w-xl flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-medium text-gray-800">Edit patient</h1>
        <p className="text-sm text-gray-400 mt-0.5">Updating record for {id}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map(({ name, label, type }) => (
            <div key={name} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                step={name === 'height' || name === 'weight' ? '0.01' : '1'}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300 text-gray-700"
              />
            </div>
          ))}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300 text-gray-700 bg-white">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="flex gap-3 mt-2">
            <button type="button" onClick={() => navigate('/patients')}
              className="flex-1 text-sm py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 text-sm py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : 'Update patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPatient