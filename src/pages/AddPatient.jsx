import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPatient } from '../api/api'

const AddPatient = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    id: '', name: '', city: '', age: '', gender: 'male', height: '', weight: ''
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await createPatient({
        ...form,
        age: parseInt(form.age),
        height: parseFloat(form.height),
        weight: parseFloat(form.weight)
      })
      navigate('/patients')
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create patient')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'id', label: 'Patient ID', placeholder: 'e.g. P001', type: 'text' },
    { name: 'name', label: 'Full name', placeholder: 'e.g. Rohan Sharma', type: 'text' },
    { name: 'city', label: 'City', placeholder: 'e.g. Delhi', type: 'text' },
    { name: 'age', label: 'Age', placeholder: 'e.g. 28', type: 'number' },
    { name: 'height', label: 'Height (metres)', placeholder: 'e.g. 1.75', type: 'number' },
    { name: 'weight', label: 'Weight (kg)', placeholder: 'e.g. 70', type: 'number' },
  ]

  return (
    <div className="max-w-xl flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-medium text-gray-800">Add patient</h1>
        <p className="text-sm text-gray-400 mt-0.5">Fill in the details to register a new patient</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map(({ name, label, placeholder, type }) => (
            <div key={name} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required
                step={name === 'height' || name === 'weight' ? '0.01' : '1'}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300 text-gray-700 placeholder-gray-300"
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
              {loading ? 'Saving...' : 'Save patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPatient