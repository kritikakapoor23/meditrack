import { useNavigate } from 'react-router-dom'

const verdictStyles = {
  Normal: 'bg-green-100 text-green-800',
  Underweight: 'bg-blue-100 text-blue-800',
  Overweight: 'bg-amber-100 text-amber-800',
  Obese: 'bg-red-100 text-red-800',
}

const PatientTable = ({ patients, onDelete }) => {
  const navigate = useNavigate()

  if (!patients.length) return (
    <div className="text-center py-16 text-gray-400 text-sm bg-white border border-gray-200 rounded-xl">
      No patients found.
    </div>
  )

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['ID', 'Name', 'Age', 'Gender', 'City', 'Height', 'Weight', 'BMI', 'Verdict', 'Actions'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {patients.map(p => (
              <tr key={p.id} className="hover:bg-blue-50 transition-colors group">
                <td className="px-4 py-3 font-medium text-blue-700">{p.id}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">{p.name}</td>
                <td className="px-4 py-3 text-gray-500">{p.age}</td>
                <td className="px-4 py-3 text-gray-500 capitalize">{p.gender}</td>
                <td className="px-4 py-3 text-gray-500">{p.city}</td>
                <td className="px-4 py-3 text-gray-500">{p.height}m</td>
                <td className="px-4 py-3 text-gray-500">{p.weight}kg</td>
                <td className="px-4 py-3 font-semibold text-gray-700">{p.bmi}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${verdictStyles[p.verdict] || 'bg-gray-100 text-gray-600'}`}>
                    {p.verdict}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => navigate(`/edit/${p.id}`)}
                      className="text-xs px-3 py-1 rounded-md border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors font-medium">
                      Edit
                    </button>
                    <button onClick={() => onDelete(p.id)}
                      className="text-xs px-3 py-1 rounded-md border border-red-100 bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PatientTable