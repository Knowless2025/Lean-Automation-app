import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function ROI() {
  const [manpower, setManpower] = useState(3)
  const [salary, setSalary] = useState(18000)
  const [investment, setInvestment] = useState(800000)

  const annualSaving = manpower * salary * 12
  const payback =
    annualSaving > 0 ? (investment / annualSaving).toFixed(2) : 0

  const chartData = [
    { name: "Investment", value: investment },
    { name: "Annual Saving", value: annualSaving },
  ]

  const paybackColor =
    payback <= 2
      ? "text-emerald-600"
      : payback <= 3
      ? "text-amber-600"
      : "text-red-600"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-10">
      {/* Page Title */}
      <div>
        <h2 className="text-3xl font-bold">ROI Calculator</h2>
        <p className="text-slate-500 mt-2">
          Evaluate automation investment before decision
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE - INPUT CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-lg font-semibold">
            Input Parameters
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-600">
              Manpower (people)
            </label>
            <input
              type="number"
              value={manpower}
              onChange={(e) => setManpower(+e.target.value)}
              className="mt-2 w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">
              Salary per Month (THB)
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(+e.target.value)}
              className="mt-2 w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">
              Investment (THB)
            </label>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(+e.target.value)}
              className="mt-2 w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* RIGHT SIDE - SUMMARY CARD */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <h3 className="text-xl font-semibold mb-6">
            Financial Summary
          </h3>

          {/* Numbers */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm text-slate-500">
                Annual Saving
              </p>
              <p className="text-4xl font-extrabold mt-1 tracking-tight">
                ฿{annualSaving.toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-500">
                Payback Period
              </p>
              <p className={`text-4xl font-extrabold mt-1 ${paybackColor}`}>
                {payback} Years
              </p>
            </div>
          </div>

          {/* Chart */}
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fill: "#64748b" }} />
            <YAxis tick={{ fill: "#64748b" }} />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#0f172a"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}