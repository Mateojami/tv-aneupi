"use client"

import type React from "react"

import { X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface OfferInterviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function OfferInterviewModal({ isOpen, onClose }: OfferInterviewModalProps) {
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission
    alert("Tu solicitud ha sido enviada exitosamente.")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#003952] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-yellow-400">
        <div className="flex items-center justify-between p-6 border-b border-yellow-400/30">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#F59E0B" }}>
            Ofrecer una Entrevista
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-300 mb-8">
            Completa la información para proponer una entrevista al equipo de ANEUPI Noticias.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Data Section */}
            <div>
              <h3
                className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-3"
                style={{ color: "#F59E0B", textDecoration: "none" }}
              >
                <span style={{ color: "#F59E0B", textDecoration: "none" }} className="text-2xl">
                  ​ Datos Personales
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input type="text" placeholder="Nombre completo" required className="bg-gray-800 border-gray-700" />
                <Input type="text" placeholder="Profesión" required className="bg-gray-800 border-gray-700" />
                <Input
                  type="text"
                  placeholder="Cédula o identificación"
                  required
                  className="bg-gray-800 border-gray-700"
                />
                <Input type="email" placeholder="Correo electrónico" required className="bg-gray-800 border-gray-700" />
                <div className="col-span-1 md:col-span-2">
                  <div className="w-full md:w-1/3 max-w-xs mx-auto">
                    <Input
                      type="tel"
                      placeholder="Teléfono de contacto"
                      required
                      className="bg-gray-800 border-gray-700 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Information Section */}
            <div>
              <h3
                className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-3"
                style={{ color: "#F59E0B", textDecoration: "none" }}
              >
                <span style={{ color: "#F59E0B", textDecoration: "none" }} className="text-2xl">
                   Información de Entrevista
                </span>
              </h3>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Tema o título de la entrevista"
                  required
                  className="bg-gray-800 border-gray-700"
                />
                <textarea
                  placeholder="Descripción breve del contenido o propósito"
                  required
                  className="w-full h-32 px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
                />
                <select
                  required
                  defaultValue=""
                  className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                >
                  <option value="" disabled>
                    Seleccione el tipo de entrevista
                  </option>
                  <option value="institucional" className="text-white">
                    Institucional
                  </option>
                  <option value="artistica" className="text-white">
                    Artística
                  </option>
                  <option value="deportiva" className="text-white">
                    Deportiva
                  </option>
                  <option value="politica" className="text-white">
                    Política
                  </option>
                  <option value="otro" className="text-white">
                    Otro
                  </option>
                </select>
                <Input
                  type="date"
                  required
                  className="bg-gray-800 border-gray-700 text-gray-500"
                  placeholder="Seleccione una fecha"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white shadow-lg">
                Enviar solicitud
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
