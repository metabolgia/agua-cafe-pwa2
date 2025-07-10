import React from "react"
import ReactDOM from "react-dom/client"
import RecetarioAguaCafe from "./RecetarioAguaCafe"
import "./index.css"



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecetarioAguaCafe />
  </React.StrictMode>
)

function App() {
  useEffect(() => {
    // Este código se ejecuta una sola vez cuando se monta la app
    const splash = document.getElementById("splash")
    if (splash) splash.remove() // Elimina el div que bloquea la pantalla
  }, []) // El array vacío [] significa "solo una vez al montar"

  return <RecetarioAguaCafe />
}

export default App
