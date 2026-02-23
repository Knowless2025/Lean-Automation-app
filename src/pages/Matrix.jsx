import { useState } from "react"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function Matrix() {
  const [impact, setImpact] = useState(7)
  const [complexity, setComplexity] = useState(3)

  const data = [{ x: complexity, y: impact }]

  const getZone = () => {
    if (impact >= 5 && complexity <= 5)
      return { title: "Quick Win", color: "text-emerald-600" }

    if (impact >= 5 && complexity > 5)
      return { title: "Strategic Project", color: "text-blue-600" }

    if (impact < 5 && complexity <= 5)
      return { title: "Improve First", color: "text-amber-600" }

    return { title: "Don't Touch", color: "text-red-600" }
  }

  const zone = getZone()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-10 space-y-10">
      
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold">
          Automation Selection Matrix
        </h2>
        <p className="text-slate-500 mt-2">
          Evaluate project priority based on impact and complexity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT CONTROL CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-8">
          
          <div>
            <label className="block text-sm font-medium text-slate-600">
              Impact (Business Benefit)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={impact}
              onChange={(e) => setImpact(+e.target.value)}
              className="w-full mt-3"
            />
            <p className="text-sm mt-2 text-slate-500">
              Value: {impact}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">
              Complexity (Technical Difficulty)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={complexity}
              onChange={(e) => setComplexity(+e.target.value)}
              className="w-full mt-3"
            />
            <p className="text-sm mt-2 text-slate-500">
              Value: {complexity}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Recommendation
            </p>
            <p className={`text-2xl font-bold mt-1 ${zone.color}`}>
              {zone.title}
            </p>
          </div>
        </div>

        {/* RIGHT MATRIX CARD */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-slate-200 relative">

          {/* Quadrant Labels */}
          <div className="absolute top-6 left-10 text-emerald-600 font-semibold text-sm">
            Quick Win
          </div>

          <div className="absolute top-6 right-10 text-blue-600 font-semibold text-sm">
            Strategic
          </div>

          <div className="absolute bottom-10 left-10 text-amber-600 font-semibold text-sm">
            Improve
          </div>

          <div className="absolute bottom-10 right-10 text-red-600 font-semibold text-sm">
            Don't Touch
          </div>

          <ResponsiveContainer width="100%" height={420}>
            <ScatterChart margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>

              <CartesianGrid stroke="#e2e8f0" />

              <XAxis
                type="number"
                dataKey="x"
                domain={[0, 10]}
                tick={{ fill: "#64748b" }}
                label={{
                  value: "Complexity",
                  position: "insideBottom",
                  offset: -15,
                }}
              />

              <YAxis
                type="number"
                dataKey="y"
                domain={[0, 10]}
                tick={{ fill: "#64748b" }}
                label={{
                  value: "Impact",
                  angle: -90,
                  position: "insideLeft",
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
                formatter={(value, name) => [
                  value,
                  name === "x" ? "Complexity" : "Impact",
                ]}
              />

              {/* Divider Lines */}
              <Scatter
                data={[
                  { x: 5, y: 0 },
                  { x: 5, y: 10 },
                ]}
                line
                fill="transparent"
              />

              <Scatter
                data={[
                  { x: 0, y: 5 },
                  { x: 10, y: 5 },
                ]}
                line
                fill="transparent"
              />

              {/* Main Dot */}
              <Scatter
                data={data}
                shape={(props) => (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={12}
                    fill="#0f172a"
                  />
                )}
              />

            </ScatterChart>
          </ResponsiveContainer>

        </div>

      </div>
    </div>
  )
}