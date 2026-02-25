import { useState } from "react"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts"

export default function Matrix() {
  const [projects, setProjects] = useState([
    { id: 1, name: "Robot Loading", impact: 8, complexity: 3 },
    { id: 2, name: "Vision Inspection", impact: 6, complexity: 7 },
  ])
แส
  const [newProject, setNewProject] = useState({
    name: "",
    impact: 5,
    complexity: 5,
  })

  const addProject = () => {
    if (!newProject.name.trim()) return

    const newItem = {
      id: Date.now(),
      ...newProject,
    }

    setProjects([...projects, newItem])
    setNewProject({ name: "", impact: 5, complexity: 5 })
  }

  const deleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const updateProject = (id, field, value) => {
    setProjects(
      projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    )
  }

  const chartData = projects.map((p) => ({
    x: p.complexity,
    y: p.impact,
    name: p.name,
  }))

  return (
    <div className="min-h-screen bg-slate-50 p-10 space-y-10">

      <div>
        <h2 className="text-3xl font-bold">
          Automation Portfolio Matrix
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT PANEL */}
        <div className="bg-white p-6 rounded-2xl shadow border space-y-6">

          <h3 className="font-semibold text-lg">Add New Project</h3>

          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            className="w-full border rounded-xl p-3"
          />

          <div>
            <label>Impact: {newProject.impact}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={newProject.impact}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  impact: +e.target.value,
                })
              }
              className="w-full"
            />
          </div>

          <div>
            <label>Complexity: {newProject.complexity}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={newProject.complexity}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  complexity: +e.target.value,
                })
              }
              className="w-full"
            />
          </div>

          <button
            onClick={addProject}
            className="w-full bg-slate-900 text-white py-3 rounded-xl"
          >
            Add Project
          </button>

          <div className="pt-4 border-t space-y-4">
            <h4 className="font-semibold">Current Projects</h4>

            {projects.map((p) => (
              <div
                key={p.id}
                className="border p-3 rounded-xl space-y-2"
              >
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) =>
                    updateProject(p.id, "name", e.target.value)
                  }
                  className="w-full border rounded p-2"
                />

                <div className="text-sm">
                  Impact: {p.impact}
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={p.impact}
                  onChange={(e) =>
                    updateProject(
                      p.id,
                      "impact",
                      +e.target.value
                    )
                  }
                  className="w-full"
                />

                <div className="text-sm">
                  Complexity: {p.complexity}
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={p.complexity}
                  onChange={(e) =>
                    updateProject(
                      p.id,
                      "complexity",
                      +e.target.value
                    )
                  }
                  className="w-full"
                />

                <button
                  onClick={() => deleteProject(p.id)}
                  className="w-full bg-red-500 text-white py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT MATRIX */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow border">

          <ResponsiveContainer width="100%" height={450}>
            <ScatterChart>

              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" domain={[0, 10]} />
              <YAxis type="number" dataKey="y" domain={[0, 10]} />

              <ReferenceLine x={5} stroke="#94a3b8" />
              <ReferenceLine y={5} stroke="#94a3b8" />

              <Tooltip />

              <Scatter
                data={chartData}
                fill="#0f172a"
              />

            </ScatterChart>
          </ResponsiveContainer>

        </div>
      </div>
    </div>
  )
}