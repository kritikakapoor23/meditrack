import { useState } from 'react'
import usePatients from '../hooks/usePatients'
import PatientTable from '../components/PatientTable'

const Patients = () => {
  const { patients, loading, error, removePatient, sortBy } = usePatients()
  const [sortField, setSortField] = useState('bmi')
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSort = async (field, order) => {
    setSortField(field)
    setSortOrder(order)
    await sortBy(field, order)
  }

  if (loading) return <p className="text-sm text-gray-400 mt-10">Loading...</p>
  if (error) return <p className="text-sm text-red-400 mt-10">{error}</p>

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-medium text-gray-800">All patients</h1>
          <p className="text-sm text-gray-400 mt-0.5">{patients.length} records found</p>
        </div>
        <div className="flex gap-2 items-center">
          <select
            value={sortField}
            onChange={e => handleSort(e.target.value, sortOrder)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white outline-none focus:border-blue-300">
            <option value="bmi">Sort by BMI</option>
            <option value="height">Sort by height</option>
            <option value="weight">Sort by weight</option>
          </select>
          <select
            value={sortOrder}
            onChange={e => handleSort(sortField, e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white outline-none focus:border-blue-300">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <PatientTable patients={patients} onDelete={removePatient} />
    </div>
  )
}

export default Patients