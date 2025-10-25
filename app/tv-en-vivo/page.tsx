"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  X,
  Film,
  User,
  ChevronDown,
  Music,
  Newspaper,
  Globe,
  Leaf,
  Sparkles,
  Mail,
  Star,
  Play,
  ChevronLeft,
  ChevronRight,
  Check,
  MessageCircle,
  Send,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  MoreVertical,
  Maximize,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { AuthModal } from "@/components/auth-modal"

interface FloatingReaction {
  id: number
  emoji: string
  x: number
}

const channelComments = {
  0: [
    {
      id: 1,
      name: "ANEUPI Noticias",
      text: "Última hora: Nuevas medidas económicas anunciadas por el gobierno",
      time: "Hace 2 min",
      badge: true,
    },
    {
      id: 2,
      name: "ANEUPI Noticias",
      text: "Actualización del clima: Se esperan lluvias para el fin de semana",
      time: "Hace 5 min",
      badge: true,
    },
    {
      id: 3,
      name: "María López",
      text: "Excelente cobertura de las noticias nacionales",
      time: "Hace 8 min",
      badge: false,
    },
    {
      id: 4,
      name: "ANEUPI Noticias",
      text: "Entrevista exclusiva con el ministro de economía a las 8 PM",
      time: "Hace 12 min",
      badge: true,
    },
    { id: 5, name: "Carlos Ruiz", text: "Muy profesional la transmisión 👏", time: "Hace 15 min", badge: false },
  ],
  1: [
    {
      id: 1,
      name: "Deportes ANEUPI",
      text: "¡Golazo! Increíble jugada del equipo nacional",
      time: "Hace 1 min",
      badge: true,
    },
    { id: 2, name: "Juan Deportista", text: "Qué partidazo estamos viendo!", time: "Hace 3 min", badge: false },
    {
      id: 3,
      name: "Deportes ANEUPI",
      text: "Estadísticas del partido en tiempo real disponibles en nuestra app",
      time: "Hace 6 min",
      badge: true,
    },
    { id: 4, name: "Ana Futbolera", text: "El mejor canal deportivo sin duda", time: "Hace 10 min", badge: false },
    { id: 5, name: "Pedro Sánchez", text: "Vamos Ecuador! 🇪🇨⚽", time: "Hace 14 min", badge: false },
  ],
  2: [
    {
      id: 1,
      name: "Cultura ANEUPI",
      text: "Próximamente: Entrevista con el artista del año",
      time: "Hace 2 min",
      badge: true,
    },
    { id: 2, name: "Laura Artista", text: "Me encanta este programa cultural", time: "Hace 5 min", badge: false },
    {
      id: 3,
      name: "Cultura ANEUPI",
      text: "Recuerden seguirnos en redes sociales para más contenido",
      time: "Hace 8 min",
      badge: true,
    },
    { id: 4, name: "Roberto Músico", text: "Excelente selección musical", time: "Hace 12 min", badge: false },
    {
      id: 5,
      name: "Sofía Cultural",
      text: "Gracias por promover la cultura ecuatoriana",
      time: "Hace 18 min",
      badge: false,
    },
  ],
  3: [
    {
      id: 1,
      name: "Política ANEUPI",
      text: "Debate en vivo: Reforma tributaria y su impacto",
      time: "Hace 1 min",
      badge: true,
    },
    { id: 2, name: "Miguel Analista", text: "Muy buen análisis político", time: "Hace 4 min", badge: false },
    {
      id: 3,
      name: "Política ANEUPI",
      text: "Participen con sus preguntas usando #DebateANEUPI",
      time: "Hace 7 min",
      badge: true,
    },
    {
      id: 4,
      name: "Carmen Ciudadana",
      text: "Necesitamos más espacios de debate como este",
      time: "Hace 11 min",
      badge: false,
    },
    { id: 5, name: "José Político", text: "Información clara y objetiva 👍", time: "Hace 16 min", badge: false },
  ],
  4: [
    {
      id: 1,
      name: "Economía ANEUPI",
      text: "Bolsa de valores: Análisis de cierre de mercados",
      time: "Hace 2 min",
      badge: true,
    },
    { id: 2, name: "Inversora Pro", text: "Datos muy útiles para mis inversiones", time: "Hace 5 min", badge: false },
    {
      id: 3,
      name: "Economía ANEUPI",
      text: "Próximo segmento: Criptomonedas y su regulación",
      time: "Hace 9 min",
      badge: true,
    },
    {
      id: 4,
      name: "Empresario Digital",
      text: "El mejor canal de economía y finanzas",
      time: "Hace 13 min",
      badge: false,
    },
    {
      id: 5,
      name: "Analista Financiero",
      text: "Información precisa y actualizada",
      time: "Hace 17 min",
      badge: false,
    },
  ],
  5: [
    {
      id: 1,
      name: "Documentales ANEUPI",
      text: "Hoy: Especial sobre la biodiversidad del Ecuador",
      time: "Hace 3 min",
      badge: true,
    },
    { id: 2, name: "Naturaleza Fan", text: "Impresionantes imágenes de la Amazonía", time: "Hace 6 min", badge: false },
    {
      id: 3,
      name: "Documentales ANEUPI",
      text: "Este documental ganó el premio internacional",
      time: "Hace 10 min",
      badge: true,
    },
    {
      id: 4,
      name: "Ecologista Verde",
      text: "Contenido educativo de primera calidad",
      time: "Hace 14 min",
      badge: false,
    },
    {
      id: 5,
      name: "Estudiante Curioso",
      text: "Perfecto para mi proyecto de biología",
      time: "Hace 19 min",
      badge: false,
    },
  ],
}

export default function TVEnVivo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [entertainmentOpen, setEntertainmentOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [currentChannel, setCurrentChannel] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState("Ecuador")
  const [countryPanelExpanded, setCountryPanelExpanded] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [commentName, setCommentName] = useState("") // Declare commentName state
  const [liveComments, setLiveComments] = useState(channelComments[0])
  const [likes, setLikes] = useState(160)
  const [dislikes, setDislikes] = useState(3)
  const [userLiked, setUserLiked] = useState(false)
  const [userDisliked, setUserDisliked] = useState(false)
  const [showPlayerMenu, setShowPlayerMenu] = useState(false)
  const [videoQuality, setVideoQuality] = useState("1080p")
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([])
  const [reactionCounts, setReactionCounts] = useState({ "❤️": 0, "👍": 0, "😂": 0, "👏": 0 })

  useEffect(() => {
    setLiveComments(channelComments[currentChannel as keyof typeof channelComments] || channelComments[0])
    // Reset engagement for new channel
    setLikes(Math.floor(Math.random() * 300) + 100)
    setDislikes(Math.floor(Math.random() * 10) + 1)
    setUserLiked(false)
    setUserDisliked(false)
    setReactionCounts({
      "❤️": Math.floor(Math.random() * 50),
      "👍": Math.floor(Math.random() * 40),
      "😂": Math.floor(Math.random() * 30),
      "👏": Math.floor(Math.random() * 35),
    })
  }, [currentChannel])

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      const newComment = {
        id: liveComments.length + 1,
        name: "Usuario anónimo",
        text: commentText,
        time: "Ahora",
        badge: false,
      }
      setLiveComments([newComment, ...liveComments])
      setCommentText("")
    }
  }

  const handleLike = () => {
    if (userLiked) {
      setLikes(likes - 1)
      setUserLiked(false)
    } else {
      setLikes(likes + 1)
      setUserLiked(true)
      if (userDisliked) {
        setDislikes(dislikes - 1)
        setUserDisliked(false)
      }
    }
  }

  const handleDislike = () => {
    if (userDisliked) {
      setDislikes(dislikes - 1)
      setUserDisliked(false)
    } else {
      setDislikes(dislikes + 1)
      setUserDisliked(true)
      if (userLiked) {
        setLikes(likes - 1)
        setUserLiked(false)
      }
    }
  }

  const handleFullscreen = () => {
    const videoElement = document.getElementById("video-player")
    if (videoElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoElement.requestFullscreen()
      }
    }
    setShowPlayerMenu(false)
  }

  const handleQualityChange = (quality: string) => {
    setVideoQuality(quality)
    setShowPlayerMenu(false)
  }

  const handleReaction = (emoji: string) => {
    const newReaction: FloatingReaction = {
      id: Date.now(),
      emoji,
      x: Math.random() * 80 + 10, // Random position between 10% and 90%
    }
    setFloatingReactions((prev) => [...prev, newReaction])
    setReactionCounts((prev) => ({ ...prev, [emoji as keyof typeof prev]: prev[emoji as keyof typeof prev] + 1 }))

    // Remove reaction after animation completes
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id))
    }, 2000)
  }

  const countries = [
    { name: "Ecuador", flag: "🇪🇨", language: "Español", color: "from-yellow-400 to-blue-600" },
    { name: "Estados Unidos", flag: "🇺🇸", language: "English", color: "from-red-500 to-blue-700" },
    { name: "España", flag: "🇪🇸", language: "Español", color: "from-red-600 to-yellow-400" },
    { name: "México", flag: "🇲🇽", language: "Español", color: "from-green-600 to-red-600" },
    { name: "Colombia", flag: "🇨🇴", language: "Español", color: "from-yellow-400 to-blue-600" },
    { name: "Argentina", flag: "🇦🇷", language: "Español", color: "from-blue-400 to-blue-600" },
    { name: "Brasil", flag: "🇧🇷", language: "Português", color: "from-green-500 to-yellow-400" },
    { name: "Francia", flag: "🇫🇷", language: "Français", color: "from-blue-600 to-red-600" },
  ]

  const getSelectedCountryData = () => {
    return countries.find((c) => c.name === selectedCountry) || countries[0]
  }

  const liveChannels = [
    {
      title: "ANEUPI Noticias 24/7",
      description: "Transmisión en vivo de noticias nacionales e internacionales las 24 horas del día",
      thumbnail: "/news-studio-broadcast.jpg",
      viewers: "2.5K",
      isLive: true,
    },
    {
      title: "Deportes en Vivo",
      description: "Cobertura en directo de los principales eventos deportivos del país",
      thumbnail: "/sports-stadium-live.jpg",
      viewers: "1.8K",
      isLive: true,
    },
    {
      title: "Cultura y Entretenimiento",
      description: "Programas culturales, entrevistas y entretenimiento en vivo",
      thumbnail: "/tv-studio-entertainment.jpg",
      viewers: "950",
      isLive: true,
    },
    {
      title: "Debate Político",
      description: "Análisis y debate sobre los temas políticos más relevantes",
      thumbnail: "/political-debate-panel.jpg",
      viewers: "1.2K",
      isLive: true,
    },
    {
      title: "Economía y Negocios",
      description: "Información financiera y análisis económico en tiempo real",
      thumbnail: "/business-news-stock-market.jpg",
      viewers: "680",
      isLive: true,
    },
    {
      title: "Especiales Documentales",
      description: "Documentales y reportajes especiales sobre Ecuador y el mundo",
      thumbnail: "/documentary-filming.png",
      viewers: "520",
      isLive: true,
    },
  ]

  const scrollCarousel = (direction: "left" | "right") => {
    const carousel = document.getElementById("channels-carousel")
    if (carousel) {
      const scrollAmount = 300
      carousel.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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

      <div
        className={`fixed top-24 right-0 z-40 transition-all duration-300 ${countryPanelExpanded ? "w-80" : "w-16"}`}
      >
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border-l-2 border-yellow-500/30 shadow-2xl h-auto rounded-l-2xl overflow-hidden">
          {/* Toggle Button */}
          <button
            onClick={() => setCountryPanelExpanded(!countryPanelExpanded)}
            className="w-full p-4 flex items-center justify-center bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors border-b border-yellow-500/20"
          >
            {countryPanelExpanded ? (
              <ChevronRight className="w-6 h-6 text-yellow-400" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Globe className="w-6 h-6 text-yellow-400" />
                <div className="text-2xl">{getSelectedCountryData().flag}</div>
              </div>
            )}
          </button>

          {/* Expanded Content */}
          {countryPanelExpanded && (
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-yellow-400" />
                  Noticias por País
                </h3>
                <p className="text-gray-400 text-xs">Selecciona tu país</p>
              </div>

              {/* Current Selection Display */}
              <div className="mb-4 bg-gray-800/50 rounded-lg p-3 border border-yellow-500/20">
                <div className="flex items-center gap-2">
                  <div className="text-3xl">{getSelectedCountryData().flag}</div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{selectedCountry}</p>
                    <p className="text-gray-400 text-xs">{getSelectedCountryData().language}</p>
                  </div>
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </div>
              </div>

              {/* Country List */}
              <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
                {countries.map((country) => (
                  <button
                    key={country.name}
                    onClick={() => setSelectedCountry(country.name)}
                    className={`w-full p-3 flex items-center gap-3 rounded-lg transition-all duration-200 ${
                      selectedCountry === country.name
                        ? "bg-yellow-500/20 border-l-4 border-yellow-500"
                        : "hover:bg-gray-700/50 border-l-4 border-transparent"
                    }`}
                  >
                    <div className="text-2xl">{country.flag}</div>
                    <div className="flex-1 text-left">
                      <div className="text-white font-medium text-sm">{country.name}</div>
                      <div className="text-gray-400 text-xs">{country.language}</div>
                    </div>
                    {selectedCountry === country.name && <Check className="w-4 h-4 text-yellow-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <SiteHeader activeSection="tv-en-vivo" />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Left side - Video player and info */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div
              id="video-player"
              className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl mb-4"
            >
              <img
                src={liveChannels[currentChannel].thumbnail || "/placeholder.svg"}
                alt={liveChannels[currentChannel].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase rounded flex items-center gap-2 animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full" />
                EN VIVO
              </div>
              <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 text-sm rounded flex items-center gap-2">
                <User className="w-4 h-4" />
                {liveChannels[currentChannel].viewers} espectadores
              </div>
              <div className="absolute top-16 right-4 bg-black/70 text-white px-3 py-1 text-xs rounded">
                {videoQuality}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-gray-900 ml-1" />
                </div>
              </div>
              {floatingReactions.map((reaction) => (
                <div
                  key={reaction.id}
                  className="absolute bottom-0 text-4xl pointer-events-none animate-float-up"
                  style={{
                    left: `${reaction.x}%`,
                    animation: "floatUp 2s ease-out forwards",
                  }}
                >
                  {reaction.emoji}
                </div>
              ))}
            </div>

            {/* Video Title */}
            <h1 className="text-2xl font-bold mb-2">{liveChannels[currentChannel].title}</h1>
            <p className="text-gray-400 text-sm mb-4">{liveChannels[currentChannel].description}</p>

            {/* Engagement Buttons */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition-colors ${
                    userLiked ? "text-yellow-400" : ""
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-semibold">{likes}</span>
                </button>
                <div className="w-px h-6 bg-gray-700" />
                <button
                  onClick={handleDislike}
                  className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition-colors ${
                    userDisliked ? "text-yellow-400" : ""
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="font-semibold">Compartir</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                <Bookmark className="w-5 h-5" />
                <span className="font-semibold">Guardar</span>
              </button>

              <div className="relative ml-auto">
                <button
                  onClick={() => setShowPlayerMenu(!showPlayerMenu)}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                {showPlayerMenu && (
                  <div className="absolute right-0 bottom-full mb-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                    <button
                      onClick={handleFullscreen}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left"
                    >
                      <Maximize className="w-5 h-5" />
                      <span>Ver en pantalla completa</span>
                    </button>
                    <div className="border-t border-gray-700">
                      <div className="px-4 py-2 text-sm text-gray-400 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Calidad de transmisión
                      </div>
                      {["1080p", "720p", "480p"].map((quality) => (
                        <button
                          key={quality}
                          onClick={() => handleQualityChange(quality)}
                          className={`w-full flex items-center justify-between px-4 py-2 hover:bg-gray-700 transition-colors text-left ${
                            videoQuality === quality ? "text-yellow-400" : ""
                          }`}
                        >
                          <span className="ml-6">{quality}</span>
                          {videoQuality === quality && <Check className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Live Chat */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="bg-gray-900 p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-yellow-400" />
                    Comentarios en vivo
                  </h3>
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-900/50 p-3 border-b border-gray-700">
                <div className="flex items-center justify-around gap-2">
                  {Object.entries(reactionCounts).map(([emoji, count]) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(emoji)}
                      className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors group"
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform">{emoji}</span>
                      <span className="text-xs text-gray-400">{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {liveComments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2 text-sm">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-gray-300 font-bold flex-shrink-0 text-xs">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-semibold ${comment.badge ? "text-yellow-400" : "text-gray-400"}`}>
                          {comment.name}
                        </span>
                        {comment.badge && (
                          <span className="bg-yellow-500 text-gray-900 text-xs px-2 py-0.5 rounded font-bold">
                            ANEUPI
                          </span>
                        )}
                        <span className="text-gray-500 text-xs ml-auto">{comment.time}</span>
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed break-words">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-700 bg-gray-900">
                <form onSubmit={handleCommentSubmit} className="flex gap-2">
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-2">
                  Modo anónimo activado. Tus mensajes aparecerán como "Usuario anónimo".
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Channels carousel */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Canales Disponibles</h3>
          <div className="relative">
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div
              id="channels-carousel"
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-12"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {liveChannels.map((channel, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentChannel(idx)}
                  className={`flex-shrink-0 w-72 bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all hover:scale-105 ${
                    currentChannel === idx ? "ring-4 ring-yellow-400" : ""
                  }`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={channel.thumbnail || "/placeholder.svg"}
                      alt={channel.title}
                      className="w-full h-full object-cover"
                    />
                    {channel.isLive && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase rounded flex items-center gap-1">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        EN VIVO
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {channel.viewers}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold mb-1 text-sm leading-tight">{channel.title}</h4>
                    <p className="text-gray-400 text-xs line-clamp-2">{channel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  )
}
