"use client"

import { useState, useEffect } from "react"
import {
  X,
  Film,
  ChevronDown,
  Calendar,
  Music,
  Newspaper,
  Globe,
  Leaf,
  Sparkles,
  Mail,
  Star,
  ArrowRight,
} from "lucide-react"

type ReactionsState = {
  like: number
  love: number
  wow: number
  laugh: number
  sad: number
}
import Link from "next/link"
import { AuthModal } from "@/components/auth-modal"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const DEFAULTS: ReactionsState = { like: 0, love: 0, wow: 0, laugh: 0, sad: 0 }


export default function AneupiTV() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [entertainmentOpen, setEntertainmentOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)



  const featuredNews = {
    title: "Terrorismo en Ecuador | 19 coches bomba se han detectado en siete años",
    description:
      "Los últimos cuatro casos se han reportado en menos de tres semanas en Guayaquil. Desde 2018, los grupos criminales iniciaron con esta modalidad para causar pánico.",
    category: "LA NOTICIA A FONDO",
    date: "16 Oct 2025",
    image: "/action-movie-hero-background-dark-cinematic.jpg",
    badgeClass: "bg-blue-600",
  }

  const sidebarNews = [
    {
      title: "Dirigentes indígenas y el Gobierno llegan a un acuerdo y termina el paro en Imbabura",
      excerpt:
        "La reunión entre ambas partes se realizó este 15 de octubre en Otavalo. Hoy, la ciudad fue testigo del registro manifestaciones y la provincia de Imbabura empezó a retornar la normalidad.",
      image: "/generic-movie-poster.png?height=200&width=300&query=indigenous+protest+ecuador",
      category: "ECUADOR",
      date: "16 Oct 2025",
    },
    {
      title: "Indígenas de Imbabura dicen que hay grupos indígenas que desconocen el acuerdo con el Gobierno",
      excerpt:
        "Representantes de comunidades indígenas manifestaron su preocupación por sectores que no aceptan los términos del acuerdo.",
      image: "/generic-movie-poster.png?height=200&width=300&query=indigenous+meeting",
      category: "ECUADOR",
      date: "16 Oct 2025",
    },
    {
      title: "Ecuador acumula ocho prórrogas sin renovar contratos con operadoras telefónicas",
      excerpt:
        "Las empresas de telecomunicaciones operan bajo extensiones temporales mientras se define el marco regulatorio definitivo.",
      image: "/generic-movie-poster.png?height=200&width=300&query=telecommunications+phone",
      category: "ECUADOR",
      date: "15 Oct 2025",
    },
    {
      title: "Ecuador recibe una propuesta de EE. UU. para eliminar aranceles a productos agrícolas como el banano",
      excerpt:
        "La propuesta busca fortalecer las relaciones comerciales entre ambos países y beneficiar al sector agrícola ecuatoriano.",
      image: "/generic-movie-poster.png?height=200&width=300&query=banana+plantation+ecuador",
      category: "ECONOMÍA",
      date: "15 Oct 2025",
    },
    {
      title: "EE. UU.: El Gobierno Trump autorizó operaciones encubiertas en Venezuela, según The New York Times",
      excerpt:
        "Según reportes de prensa internacional, la administración estadounidense habría aprobado acciones de inteligencia en territorio venezolano.",
      image: "/action-movie-silhouette-city.jpg",
      category: "EE. UU.",
      date: "14 Oct 2025",
    },
    {
      title: "Reconstrucción del atentado en Guayaquil: cuándo, cómo y dónde actuaron los responsables",
      excerpt: "Autoridades investigan los detalles del ataque que conmocionó a la ciudad portuaria la semana pasada.",
      image: "/generic-movie-poster.png?height=200&width=300&query=crime+scene+investigation",
      category: "SEGURIDAD",
      date: "14 Oct 2025",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar Menu */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#003952] text-white transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="hover:opacity-70">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 overflow-y-auto max-h-[calc(100vh-88px)]">
          <Link
            href="/lo-ultimo"
            className="w-full flex items-center gap-3 p-4 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">LO ÚLTIMO</span>
          </Link>

          <Link
            href="/noticias"
            className="w-full flex items-center gap-3 p-4 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <Newspaper className="w-5 h-5" />
            <span className="font-medium">NOTICIAS</span>
          </Link>

          <Link
            href="/mundo"
            className="w-full flex items-center gap-3 p-4 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <Globe className="w-5 h-5" />
            <span className="font-medium">MUNDO</span>
          </Link>

          <Link
            href="/ecuaterra"
            className="w-full flex items-center gap-3 p-4 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <Leaf className="w-5 h-5" />
            <span className="font-medium">ECUATERRA</span>
          </Link>

          <Link
            href="/estilo"
            className="w-full flex items-center gap-3 p-4 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">ESTILO</span>
          </Link>

          <Link
            href="/newsletters"
            className="w-full flex items-center gap-3 p-4 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <Mail className="w-5 h-5" />
            <span className="font-medium">NEWSLETTERS</span>
          </Link>

          <Link
            href="/especiales"
            className="w-full flex items-center gap-3 p-4 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <Star className="w-5 h-5" />
            <span className="font-medium">ESPECIALES</span>
          </Link>

          <div className="border-t border-white/10 my-4"></div>

          <div>
            <button
              onClick={() => setEntertainmentOpen(!entertainmentOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <Film className="w-5 h-5" />
                <span className="font-medium">ENTRETENIMIENTO</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${entertainmentOpen ? "rotate-180" : ""}`} />
            </button>
            {entertainmentOpen && (
              <div className="ml-8 space-y-1">
                <Link
                  href="/cine"
                  className="block p-3 hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Film className="w-4 h-4" />
                    <span>Cine</span>
                  </div>
                </Link>
                <Link
                  href="/musica"
                  className="block p-3 hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Music className="w-4 h-4" />
                    <span>Música</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMenuOpen(false)} />}

      {/* Site Header */}
      <SiteHeader activeSection="home" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Featured story */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-[400px]">
                <img
                  src={featuredNews.image || "/placeholder.svg"}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 text-xs font-bold uppercase">
                  {featuredNews.category}
                </div>
              </div>
              <div className="p-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-900 leading-tight text-balance">
                  {featuredNews.title}
                </h1>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{featuredNews.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredNews.date}
                    </span>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Leer más <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Additional content below featured story */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Más Noticias</h2>
              <div className="space-y-6">
                {sidebarNews.slice(3).map((article, idx) => (
                  <article
                    key={idx}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex gap-4 p-4">
                      <div className="relative w-48 h-32 flex-shrink-0">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase mb-2">
                          {article.category}
                        </span>
                        <h3 className="text-lg font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors text-balance">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>
                        <button className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors">
                          Leer más <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar - News list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-900 border-b-2 border-blue-600 pb-2">Últimas Noticias</h2>
              <div className="space-y-6">
                {sidebarNews.slice(0, 3).map((article, idx) => (
                  <article key={idx} className="group cursor-pointer">
                    <div className="relative h-40 mb-3 overflow-hidden rounded">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="inline-block bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase mb-2">
                      {article.category}
                    </span>
                    <h3 className="text-base font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors leading-tight text-balance">
                      {article.title}
                    </h3>
                    <button className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-xs transition-colors">
                      Leer más <ArrowRight className="w-3 h-3" />
                    </button>
                    {idx < 2 && <div className="border-b border-gray-200 mt-4" />}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Site Footer */}
      <SiteFooter />
    </div>
  )
}
