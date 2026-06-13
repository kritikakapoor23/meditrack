import { useNavigate } from 'react-router-dom'
import usePatients from '../hooks/usePatients'

const verdictStyles = {
  Normal: 'bg-green-100 text-green-800',
  Underweight: 'bg-blue-100 text-blue-800',
  Overweight: 'bg-amber-100 text-amber-800',
  Obese: 'bg-red-100 text-red-800',
}

const Dashboard = () => {
  const { patients, loading, error } = usePatients()
  const navigate = useNavigate()

  const total = patients.length
  const normal = patients.filter(p => p.verdict === 'Normal').length
  const underweight = patients.filter(p => p.verdict === 'Underweight').length
  const overweight = patients.filter(p => p.verdict === 'Overweight').length
  const obese = patients.filter(p => p.verdict === 'Obese').length

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Loading patients...</p>
      </div>
    </div>
  )
  if (error) return <p className="text-sm text-red-400 mt-10">{error}</p>

  const pct = (n) => total === 0 ? 0 : Math.round((n / total) * 100)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Overview</h1>
          <p className="text-sm text-gray-400 mt-0.5">Patient health summary</p>
        </div>
        <button onClick={() => navigate('/add')}
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Add patient
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total patients', value: total, color: 'border-blue-500 bg-blue-50', textColor: 'text-blue-700', sub: 'Registered records' },
          { label: 'Normal BMI', value: normal, color: 'border-green-500 bg-green-50', textColor: 'text-green-700', sub: `${pct(normal)}% of patients` },
          { label: 'Underweight', value: underweight, color: 'border-sky-400 bg-sky-50', textColor: 'text-sky-700', sub: `${pct(underweight)}% of patients` },
          { label: 'Overweight / Obese', value: overweight + obese, color: 'border-red-400 bg-red-50', textColor: 'text-red-600', sub: `${pct(overweight + obese)}% of patients` },
        ].map(({ label, value, color, textColor, sub }) => (
          <div key={label} className={`bg-white border border-gray-200 border-l-4 ${color} rounded-xl p-4 transition-shadow hover:shadow-md`}>
            <p className="text-xs text-gray-400 mb-1">{label}</p>
            <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
            <p className="text-xs text-gray-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">BMI distribution</p>
        <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
          {[
            { label: 'Normal', count: normal, color: 'bg-green-400' },
            { label: 'Underweight', count: underweight, color: 'bg-sky-400' },
            { label: 'Overweight', count: overweight, color: 'bg-amber-400' },
            { label: 'Obese', count: obese, color: 'bg-red-400' },
          ].filter(s => s.count > 0).map(s => (
            <div key={s.label} className={`${s.color} transition-all`} style={{ width: `${pct(s.count)}%` }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-3">
          {[
            { label: 'Normal', count: normal, color: 'bg-green-400' },
            { label: 'Underweight', count: underweight, color: 'bg-sky-400' },
            { label: 'Overweight', count: overweight, color: 'bg-amber-400' },
            { label: 'Obese', count: obese, color: 'bg-red-400' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${s.color}`} />
              <span className="text-xs text-gray-500">{s.label}</span>
              <span className="text-xs text-gray-400">{pct(s.count)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Recent patients</p>
          <button onClick={() => navigate('/patients')}
            className="text-xs text-blue-600 hover:underline">View all →</button>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['ID', 'Name', 'Age', 'City', 'BMI', 'Verdict'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patients.slice(0, 5).map(p => (
                <tr key={p.id} className="hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => navigate('/patients')}>
                  <td className="px-4 py-3 font-medium text-blue-700">{p.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="px-4 py-3 text-gray-500">{p.age}</td>
                  <td className="px-4 py-3 text-gray-500">{p.city}</td>
                  <td className="px-4 py-3 font-medium text-gray-700">{p.bmi}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${verdictStyles[p.verdict] || 'bg-gray-100 text-gray-600'}`}>
                      {p.verdict}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard