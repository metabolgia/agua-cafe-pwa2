import React from "react"
import { useState } from "react"

const perfiles = {
  metodo: {
    label: "Método de preparación",
    items: {
      espresso: { a: 2.0, b: 4.0, sabor: "Intensidad, dulzor y cuerpo" },
      moka: { a: 2.4, b: 5.0, sabor: "Más cuerpo y notas a chocolate" },
      aeropress: { a: 1.8, b: 3.2, sabor: "Equilibrio, más claridad" },
      v60: { a: 1.7, b: 3.2, sabor: "Alta claridad, acidez brillante" },
      kalita: { a: 2.0, b: 3.5, sabor: "Dulzor redondo, notas suaves" },
      switch: { a: 2.4, b: 5.0, sabor: "Cuerpo y limpieza" },
      pulsar: { a: 2.0, b: 3.5, sabor: "Buen balance y cuerpo" },
      prensa: { a: 2.5, b: 5.5, sabor: "Mucho cuerpo y textura" },
    },
  },
  tueste: {
    label: "Tipo de tueste",
    items: {
      claro: { a: 1.7, b: 3.0, sabor: "Acidez, florales y frutales" },
      medio: { a: 2.0, b: 3.5, sabor: "Balanceado, dulzor" },
      oscuro: { a: 2.4, b: 5.0, sabor: "Cacao, nuez, cuerpo" },
    },
  },
  sensorial: {
    label: "Perfil sensorial",
    items: {
      florales: { a: 1.5, b: 2.8, sabor: "Alta claridad, perfumado" },
      frutales: { a: 1.7, b: 3.2, sabor: "Ácido jugoso, ligero" },
      acidez: { a: 1.6, b: 2.5, sabor: "Brillante, jugoso, fresco" },
      dulzor: { a: 2.2, b: 4.0, sabor: "Redondo, caramelizado" },
      cacao: { a: 2.4, b: 5.0, sabor: "Profundo, amargo dulce" },
      nuez: { a: 2.0, b: 4.2, sabor: "Redondo, seco, tostado" },
    },
  },
}

export default function RecetarioAguaCafe() {
  const [litros, setLitros] = useState(1)
  const [tipo, setTipo] = useState<keyof typeof perfiles>("metodo")
  const [perfil, setPerfil] = useState("espresso")

  const actual = perfiles[tipo].items[perfil]
  const alcalinidad = (actual.a * litros * 40).toFixed(1)
  const dureza = (actual.b * litros * 40).toFixed(1)

  const renderEstrellas = (valor: number) =>
    "⭐".repeat(valor) + "☆".repeat(5 - valor)

  const rating = (tipo: string) => {
    switch (perfil) {
      case "v60":
      case "claro":
      case "florales":
      case "frutales":
      case "acidez":
        return { claridad: 5, cuerpo: 2, dulzor: 3, acidez: 5 }
      case "espresso":
      case "oscuro":
      case "cacao":
        return { claridad: 2, cuerpo: 5, dulzor: 4, acidez: 2 }
      case "dulzor":
      case "kalita":
        return { claridad: 3, cuerpo: 4, dulzor: 5, acidez: 2 }
      case "nuez":
      case "prensa":
        return { claridad: 2, cuerpo: 5, dulzor: 3, acidez: 1 }
      default:
        return { claridad: 3, cuerpo: 3, dulzor: 3, acidez: 3 }
    }
  }

  const stars = rating(perfil)

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Recetario de agua remineralizada</h1>

      <label className="block">
        Litros a preparar:
        <input
          type="number"
          value={litros}
          onChange={(e) => setLitros(Number(e.target.value))}
          className="border rounded p-1 ml-2 w-24"
        />
      </label>

      <div className="space-y-2">
        <label>Perfil:</label>
        <select
          value={tipo}
          onChange={(e) => {
            setTipo(e.target.value as keyof typeof perfiles)
            setPerfil(Object.keys(perfiles[e.target.value as keyof typeof perfiles].items)[0])
          }}
          className="border rounded p-1 w-full"
        >
          {Object.keys(perfiles).map((key) => (
            <option key={key} value={key}>
              {perfiles[key as keyof typeof perfiles].label}
            </option>
          ))}
        </select>

        <select
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
          className="border rounded p-1 w-full"
        >
          {Object.keys(perfiles[tipo].items).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-gray-100 p-4 rounded space-y-2 text-sm">
        <p><strong>Sabor esperado:</strong> {actual.sabor}</p>
        <p><strong>Dosis solución A:</strong> {(actual.a * litros).toFixed(2)} g</p>
        <p><strong>Dosis solución B:</strong> {(actual.b * litros).toFixed(2)} g</p>
        <p><strong>Alcalinidad estimada:</strong> {alcalinidad} ppm</p>
        <p><strong>Dureza estimada:</strong> {dureza} ppm</p>
      </div>

      <div className="bg-white border rounded p-4 space-y-1 text-sm">
        <p><strong>Tabla sensorial:</strong></p>
        <p>Claridad: {renderEstrellas(stars.claridad)}</p>
        <p>Cuerpo: {renderEstrellas(stars.cuerpo)}</p>
        <p>Dulzor: {renderEstrellas(stars.dulzor)}</p>
        <p>Acidez: {renderEstrellas(stars.acidez)}</p>
      </div>
    </div>
  )
}
