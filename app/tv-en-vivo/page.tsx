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
  Leaf,
  Sparkles,
  Mail,
  Star,
  Play,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Send,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bell,
  Maximize,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { AuthModal } from "@/components/auth-modal"
import { OfferInterviewModal } from "@/components/offer-interview-modal"
import { ShareModal } from "@/components/share-modal"

interface FloatingReaction {
  id: number
  emoji: string
  x: number
}

interface CommentReaction {
  emoji: string
  count: number
  users: string[]
}

interface CommentReply {
  id: number
  name: string
  text: string
  time: string
  reactions: CommentReaction[]
}

interface Comment {
  id: number
  name: string
  text: string
  time: string
  badge: boolean
  reactions: CommentReaction[]
  replies: CommentReply[]
}

interface ProgramItem {
  id: number
  time: string
  title: string
  description: string
}

const channelComments = {
  0: [
    {
      id: 1,
      name: "ANEUPI Noticias",
      text: "Última hora: Nuevas medidas económicas anunciadas por el gobierno",
      time: "Hace 2 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 2,
      name: "ANEUPI Noticias",
      text: "Actualización del clima: Se esperan lluvias para el fin de semana",
      time: "Hace 5 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 3,
      name: "María López",
      text: "Excelente cobertura de las noticias nacionales",
      time: "Hace 8 min",
      badge: false,
      reactions: [],
      replies: [],
    },
    {
      id: 4,
      name: "ANEUPI Noticias",
      text: "Entrevista exclusiva con el ministro de economía a las 8 PM",
      time: "Hace 12 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 5,
      name: "Carlos Ruiz",
      text: "Muy profesional la transmisión 👏",
      time: "Hace 15 min",
      badge: false,
      reactions: [],
      replies: [],
    },
  ],
  1: [
    {
      id: 1,
      name: "Deportes ANEUPI",
      text: "¡Golazo! Increíble jugada del equipo nacional",
      time: "Hace 1 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 2,
      name: "Juan Deportista",
      text: "Qué partidazo estamos viendo!",
      time: "Hace 3 min",
      badge: false,
      reactions: [],
      replies: [],
    },
    {
      id: 3,
      name: "Deportes ANEUPI",
      text: "Estadísticas del partido en tiempo real disponibles en nuestra app",
      time: "Hace 6 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 4,
      name: "Ana Futbolera",
      text: "El mejor canal deportivo sin duda",
      time: "Hace 10 min",
      badge: false,
      reactions: [],
      replies: [],
    },
    {
      id: 5,
      name: "Pedro Sánchez",
      text: "Vamos Ecuador! 🇪🇨⚽",
      time: "Hace 14 min",
      badge: false,
      reactions: [],
      replies: [],
    },
  ],
  2: [
    {
      id: 1,
      name: "Cultura ANEUPI",
      text: "Próximamente: Entrevista con el artista del año",
      time: "Hace 2 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 2,
      name: "Laura Artista",
      text: "Me encanta este programa cultural",
      time: "Hace 5 min",
      badge: false,
      reactions: [],
      replies: [],
    },
    {
      id: 3,
      name: "Cultura ANEUPI",
      text: "Recuerden seguirnos en redes sociales para más contenido",
      time: "Hace 8 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 4,
      name: "Roberto Músico",
      text: "Excelente selección musical",
      time: "Hace 12 min",
      badge: false,
      reactions: [],
      replies: [],
    },
    {
      id: 5,
      name: "Sofía Cultural",
      text: "Gracias por promover la cultura ecuatoriana",
      time: "Hace 18 min",
      badge: false,
      reactions: [],
      replies: [],
    },
  ],
  3: [
    {
      id: 1,
      name: "Política ANEUPI",
      text: "Debate en vivo: Reforma tributaria y su impacto",
      time: "Hace 1 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 2,
      name: "Miguel Analista",
      text: "Muy buen análisis político",
      time: "Hace 4 min",
      badge: false,
      reactions: [],
      replies: [],
    },
    {
      id: 3,
      name: "Política ANEUPI",
      text: "Participen con sus preguntas usando #DebateANEUPI",
      time: "Hace 7 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 4,
      name: "Carmen Ciudadana",
      text: "Necesitamos más espacios de debate como este",
      time: "Hace 11 min",
      badge: false,
      reactions: [],
      replies: [],
    },
    {
      id: 5,
      name: "José Político",
      text: "Información clara y objetiva 👍",
      time: "Hace 16 min",
      badge: false,
      reactions: [],
      replies: [],
    },
  ],
  4: [
    {
      id: 1,
      name: "Economía ANEUPI",
      text: "Bolsa de valores: Análisis de cierre de mercados",
      time: "Hace 2 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 2,
      name: "Inversora Pro",
      text: "Datos muy útiles para mis inversiones",
      time: "Hace 5 min",
      badge: false,
      reactions: [],
      replies: [],
    },
    {
      id: 3,
      name: "Economía ANEUPI",
      text: "Próximo segmento: Criptomonedas y su regulación",
      time: "Hace 9 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 4,
      name: "Empresario Digital",
      text: "El mejor canal de economía y finanzas",
      time: "Hace 13 min",
      badge: false,
      reactions: [],
      replies: [],
    },
    {
      id: 5,
      name: "Analista Financiero",
      text: "Información precisa y actualizada",
      time: "Hace 17 min",
      badge: false,
      reactions: [],
      replies: [],
    },
  ],
  5: [
    {
      id: 1,
      name: "Documentales ANEUPI",
      text: "Hoy: Especial sobre la biodiversidad del Ecuador",
      time: "Hace 3 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 2,
      name: "Naturaleza Fan",
      text: "Impresionantes imágenes de la Amazonía",
      time: "Hace 6 min",
      badge: false,
      reactions: [],
      replies: [],
    },
    {
      id: 3,
      name: "Documentales ANEUPI",
      text: "Este documental ganó el premio internacional",
      time: "Hace 10 min",
      badge: true,
      reactions: [],
      replies: [],
    },
    {
      id: 4,
      name: "Ecologista Verde",
      text: "Contenido educativo de primera calidad",
      time: "Hace 14 min",
      badge: false,
      reactions: [],
      replies: [],
    },
    {
      id: 5,
      name: "Estudiante Curioso",
      text: "Perfecto para mi proyecto de biología",
      time: "Hace 19 min",
      badge: false,
      reactions: [],
      replies: [],
    },
  ],
}

const channelProgramming = {
  0: [
    {
      id: 1,
      time: "08:15",
      title: "ZonaDocu",
      description: "Baltimore - Nueva política contra la criminalidad de bandas",
    },
    {
      id: 2,
      time: "09:00",
      title: "¿Cómo te afecta?",
      description: "Qué efectos tiene el fentanilo sobre el cuerpo para dejarlo como un 'zombi'",
    },
    {
      id: 3,
      time: "09:30",
      title: "Primer plano",
      description: "Miedo en las calles - Cómo la violencia masculina incide en la vida de las mujeres",
    },
    {
      id: 4,
      time: "10:00",
      title: "Noticias Nocturnas",
      description: "Análisis de los temas más relevantes del día",
    },
    {
      id: 5,
      time: "11:00",
      title: "Reportaje Especial",
      description: "Investigación profunda sobre temas de interés nacional",
    },
  ],
  1: [
    {
      id: 1,
      time: "08:00",
      title: "Deportes Matutinos",
      description: "Resumen de los partidos internacionales de la noche anterior",
    },
    {
      id: 2,
      time: "09:30",
      title: "Liga Nacional En Vivo",
      description: "Transmisión en directo del partido más importante del día",
    },
    {
      id: 3,
      time: "12:00",
      title: "Análisis Deportivo",
      description: "Debate sobre el desempeño de nuestros equipos nacionales",
    },
  ],
  2: [
    {
      id: 1,
      time: "08:30",
      title: "Entrevistas Culturales",
      description: "Conversación con artistas y creadores ecuatorianos",
    },
    {
      id: 2,
      time: "10:00",
      title: "Festival de Música",
      description: "Lo mejor de la música nacional e internacional",
    },
  ],
  3: [
    {
      id: 1,
      time: "09:00",
      title: "Debate Político",
      description: "Análisis de la reforma tributaria y su impacto económico",
    },
    {
      id: 2,
      time: "11:00",
      title: "Diálogo Nacional",
      description: "Conversación sobre los temas políticos más relevantes",
    },
  ],
  4: [
    {
      id: 1,
      time: "08:00",
      title: "Bolsa de Valores",
      description: "Análisis de cierre de mercados y tendencias financieras",
    },
    {
      id: 2,
      time: "10:30",
      title: "Criptomonedas Hoy",
      description: "Regulación y oportunidades en el mercado cripto",
    },
  ],
  5: [
    {
      id: 1,
      time: "09:00",
      title: "Especial Biodiversidad",
      description: "Documental sobre la riqueza natural del Ecuador",
    },
    {
      id: 2,
      time: "11:00",
      title: "Amazonía en Riesgo",
      description: "Investigación sobre la deforestación y sus consecuencias",
    },
  ],
}

export default function TVEnVivo() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [entertainmentOpen, setEntertainmentOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [currentChannel, setCurrentChannel] = useState(0)
  const [commentText, setCommentText] = useState("")
  const [commentName, setCommentName] = useState("") // Declare commentName state
  const [liveComments, setLiveComments] = useState<Comment[]>([])
  const [likes, setLikes] = useState(160)
  const [dislikes, setDislikes] = useState(3)
  const [userLiked, setUserLiked] = useState(false)
  const [userDisliked, setUserDisliked] = useState(false)
  const [showPlayerMenu, setShowPlayerMenu] = useState(false)
  const [videoQuality, setVideoQuality] = useState("1080p")
  const [reminderSet, setReminderSet] = useState(false)
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([])
  const [reactionCounts, setReactionCounts] = useState({ "❤️": 0, "👍": 0, "😂": 0, "👏": 0 })
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [interviewModalOpen, setInterviewModalOpen] = useState(false)
  const [commentsVisible, setCommentsVisible] = useState(true) // Estado para controlar la visibilidad de los comentarios
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Added state to track if user is logged in
  const [shareModalOpen, setShareModalOpen] = useState(false) // Added state for share modal
  const [expandedPrograms, setExpandedPrograms] = useState<number[]>([])

  useEffect(() => {
    setLiveComments(channelComments[currentChannel as keyof typeof channelComments] || channelComments[0])

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
    if (!isLoggedIn) {
      const redirectUrl = new URL("https://aagale.com/inicio-sesion")
      window.location.assign(redirectUrl)
      return
    }
    if (commentText.trim()) {
      const newComment = {
        id: liveComments.length + 1,
        name: "Usuario anónimo",
        text: commentText,
        time: "Ahora",
        badge: false,
        reactions: [],
        replies: [],
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

    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id))
    }, 2000)
  }

  const handleCommentReaction = (commentId: number, emoji: string) => {
    setLiveComments((comments) =>
      comments.map((comment) => {
        if (comment.id === commentId) {
          const existingReaction = comment.reactions.find((r) => r.emoji === emoji)
          if (existingReaction) {
            return {
              ...comment,
              reactions: comment.reactions.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r)),
            }
          } else {
            return {
              ...comment,
              reactions: [...comment.reactions, { emoji, count: 1, users: [] }],
            }
          }
        }
        return comment
      }),
    )
  }

  const handleReplySubmit = (e: React.FormEvent, commentId: number) => {
    e.preventDefault()
    if (!isLoggedIn) {
      window.location.href = "https://aagale.com/inicio-sesion"
      return
    }
    if (replyText.trim()) {
      setLiveComments((comments) =>
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(),
                  name: "Usuario anónimo",
                  text: replyText,
                  time: "Ahora",
                  reactions: [],
                },
              ],
            }
          }
          return comment
        }),
      )
      setReplyText("")
      setReplyingTo(null)
    }
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

  const toggleProgramExpanded = (programId: number) => {
    setExpandedPrograms((prev) =>
      prev.includes(programId) ? prev.filter((id) => id !== programId) : [...prev, programId],
    )
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

      <div className={`fixed top-24 right-0 z-40 transition-all duration-300`}>
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border-l-2 border-yellow-500/30 shadow-2xl h-auto rounded-l-2xl overflow-hidden">
          {/* Toggle Button */}
          {/* Removed country panel toggle button */}

          {/* Expanded Content */}
          {/* Removed country panel expanded content */}
        </div>
      </div>

      <SiteHeader activeSection="tv-en-vivo" />

      <main className="container mx-auto px-4 py-8">
        <div
          className={`grid grid-cols-1 ${commentsVisible ? "lg:grid-cols-3" : "lg:grid-cols-1"} gap-6 mb-12 lg:items-start`}
        >
          {/* Left side - Video player and info */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Video Player */}
            <div id="video-player" className="relative h-[600px] bg-black rounded-lg overflow-hidden shadow-2xl mb-4">
              <img
                src={liveChannels[currentChannel].thumbnail || "/placeholder.svg"}
                alt={liveChannels[currentChannel].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase rounded flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <span>EN VIVO</span>
                </div>
                <div className="w-px h-4 bg-white/30" />
                <div className="flex items-center gap-1 text-white/90">
                  <User className="w-4 h-4" />
                  <span>{liveChannels[currentChannel].viewers}</span>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 text-xs rounded">
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

              {/* Control buttons */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={handleFullscreen}
                  className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all duration-200 text-white backdrop-blur-sm"
                  aria-label="Modo pantalla completa"
                >
                  <Maximize className="w-7 h-7" />
                </button>
                <button
                  onClick={() => setCommentsVisible(!commentsVisible)}
                  className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all duration-200 text-white backdrop-blur-sm"
                  aria-label="Mostrar/ocultar comentarios"
                >
                  <MessageCircle className="w-7 h-7" />
                </button>
              </div>
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

              <button
                onClick={() => setShareModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-semibold">Compartir</span>
              </button>

              <button
                onClick={() => setReminderSet((s) => !s)}
                aria-pressed={reminderSet}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  reminderSet
                    ? "bg-yellow-500 text-gray-900 shadow-lg ring-2 ring-yellow-400 transform scale-105"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="font-semibold">{reminderSet ? "Recordando" : "Recordar próxima transmisión"}</span>
              </button>
            </div>

            {/* Programming Section */}
            <div className="mb-8 bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-lg p-6 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white-400 mb-2">Programación</h2>
              <div className="text-sm text-yellow-400 mb-4 font-medium">miércoles | 05/11/2025</div>

              <div className="space-y-0">
                {(channelProgramming[currentChannel as keyof typeof channelProgramming] || []).map((program) => (
                  <div key={program.id} className="border-b border-gray-700 last:border-b-0">
                    <button
                      onClick={() => toggleProgramExpanded(program.id)}
                      className="w-full flex items-start gap-4 py-4 hover:bg-gray-800/50 transition-colors px-4 -mx-4"
                    >
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="text-right font-semibold text-yellow-400 whitespace-nowrap">{program.time}</div>
                        <div className="w-1 bg-yellow-400 rounded-full h-12 flex-shrink-0 mt-1" />
                        <div className="flex-1 min-w-0 text-left">
                          <h3 className="font-bold text-white text-lg leading-tight">{program.title}</h3>
                          <p className="text-gray-400 text-sm mt-1">{program.description}</p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-gray-400 flex-shrink-0 transition-transform ${
                          expandedPrograms.includes(program.id) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Live Chat */}
          <div
            className={`lg:col-span-1 transition-all duration-300 ${!commentsVisible ? "hidden lg:hidden" : ""} border-l-2 border-yellow-400`}
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="bg-gray-900 p-4 border-b border-gray-700">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-yellow-400" />
                  Comentarios
                </h3>
              </div>

              <div className="bg-gray-900/50 p-3 border-b border-gray-700">
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(reactionCounts).map(([emoji, count]) => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(emoji)}
                      className="flex items-center justify-between gap-3 px-3 py-1 rounded-xl border border-[#00536d] bg-gradient-to-b from-gray-800 to-gray-900 shadow-md hover:opacity-90 transition-all group"
                      aria-label={`Reaccionar ${emoji}`}
                    >
                      <span className="text-2xl">{emoji}</span>
                      <span className="text-sm text-gray-300 font-semibold">{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                {liveComments.map((comment, idx) => (
                  <div key={comment.id} className={`${idx > 0 ? "pt-2 border-t border-yellow-500/40 mt-2" : ""}`}>
                    <div className="flex items-start gap-3 text-sm bg-gray-800/50 rounded-lg p-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-gray-300 font-bold flex-shrink-0 text-xs">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-semibold ${comment.badge ? "text-yellow-400" : "text-gray-300"}`}>
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

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex -space-x-1">
                            {comment.reactions.map((reaction, rIdx) => (
                              <div
                                key={rIdx}
                                className="bg-gray-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                              >
                                <span>{reaction.emoji}</span>
                                <span className="text-gray-400">{reaction.count}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-1 ml-2">
                            <button
                              onClick={() => handleCommentReaction(comment.id, "❤️")}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              ❤️
                            </button>
                            <button
                              onClick={() => handleCommentReaction(comment.id, "👍")}
                              className="text-gray-400 hover:text-yellow-500 transition-colors"
                            >
                              👍
                            </button>
                          </div>
                          <button
                            onClick={() => setReplyingTo(comment.id)}
                            className="text-gray-400 hover:text-white text-xs ml-auto"
                          >
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>

                    {comment.replies.length > 0 && (
                      <div className="ml-10 space-y-2 border-l-2 border-gray-700 pl-4 mt-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-2 text-sm bg-gray-800/30 rounded-lg p-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-gray-300 font-bold flex-shrink-0 text-xs">
                              {reply.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-gray-400 text-xs">{reply.name}</span>
                                <span className="text-gray-500 text-xs ml-auto">{reply.time}</span>
                              </div>
                              <p className="text-gray-300 text-sm">{reply.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {replyingTo === comment.id && (
                      <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="ml-10 flex gap-2 mt-2">
                        <Input
                          placeholder="Escribe una respuesta..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 flex-1 text-sm"
                        />
                        <Button type="submit" size="sm" className="bg-gray-700 hover:bg-gray-600 text-white">
                          Responder
                        </Button>
                      </form>
                    )}
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
                <p className="text-xs text-gray-500 mt-2">Inicia sesión en Aagale para comentar.</p>
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
      <OfferInterviewModal isOpen={interviewModalOpen} onClose={() => setInterviewModalOpen(false)} />
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={liveChannels[currentChannel].title}
      />

      {/* Floating Interview Button */}
      <button
        onClick={() => setInterviewModalOpen(true)}
        className="fixed top-24 right-2 z-40 bg-[#003952] hover:bg-[#004a63] text-white px-2 py-2 rounded-full shadow-xl transition-all duration-200 flex items-center gap-2 border-2 border-yellow-500 hover:border-yellow-400 hover:scale-105 text-base"
      >
        <span className="text-xl">🎙️</span>
        <span className="font-semibold">Ofrecer Entrevista</span>
      </button>
    </div>
  )
}
