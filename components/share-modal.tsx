"use client"

import { useState } from "react"
import { X, LinkIcon, Check } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  url?: string
  title?: string
}

export function ShareModal({ isOpen, onClose, url = "", title = "" }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")
  const shareTitle = title || "TV en Vivo - ANEUPI"

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Error al copiar:", err)
    }
  }

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`,
      bgColor: "bg-[#25D366]",
    },
    {
      name: "Facebook",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      bgColor: "bg-[#1877F2]",
    },
    {
      name: "X",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      bgColor: "bg-black",
    },
    {
      name: "Instagram",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
      url: `https://www.instagram.com/`,
      bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    },
    {
      name: "Gatito Plis",
      icon: "https://aneupi.com/assets/gatitoplis-CY6tDKz6.png",
      url: "https://aneupi.com/",
      bgColor: "bg-black",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#003952] border-2 border-yellow-400 text-white max-w-md">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Compartir en</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
              >
                <img
                  src={option.icon || "/placeholder.svg"}
                  alt={option.name}
                  className="w-8 h-8 object-contain"
                  style={option.name === "X" ? { filter: "invert(1)" } : {}}
                />
              </div>
              <span className="text-xs text-center text-gray-300 group-hover:text-white transition-colors">
                {option.name}
              </span>
            </a>
          ))}

          <button onClick={handleCopyLink} className="flex flex-col items-center gap-2 group">
            <div className="w-16 h-16 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
              {copied ? <Check className="w-8 h-8 text-green-400" /> : <LinkIcon className="w-8 h-8 text-white" />}
            </div>
            <span className="text-xs text-center text-gray-300 group-hover:text-white transition-colors">
              {copied ? "Copiado" : "Copiar enlace"}
            </span>
          </button>
        </div>

        {copied && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-lg text-sm text-center">
            Enlace copiado al portapapeles
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
