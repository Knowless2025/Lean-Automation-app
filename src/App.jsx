import { useState } from "react"
import ROI from "./pages/ROI"
import Matrix from "./pages/Matrix"

export default function App() {
  const [page] = useState("matrix")

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      {page === "roi" && <ROI />}
      {page === "matrix" && <Matrix />}
    </div>
  )
}