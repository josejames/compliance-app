import { usePage } from '@inertiajs/react'
import { BotMessageSquareIcon, ChevronDownIcon, RefreshCwIcon, SendIcon, SparklesIcon, XIcon } from 'lucide-react'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { cn } from '~/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = 'user' | 'assistant'

interface Message {
  id: number
  role: Role
  text: string
  timestamp: Date
}

// ─── Seed conversation ────────────────────────────────────────────────────────
// Gives life to the mockup; simulates a real session already in progress.

const SEED_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'assistant',
    text: '¡Hola! Soy **Lex IA**, tu asistente de cumplimiento normativo. Tengo acceso a todos los datos de tu organización y puedo ayudarte a:\n\n• Interpretar gaps de controles ISO 27001 y LFPDPPP\n• Priorizar riesgos según su nivel de criticidad\n• Redactar evidencias y políticas internas\n• Preparar la organización para auditorías externas\n\n¿En qué te puedo ayudar hoy?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
]

// ─── Mock AI replies ─────────────────────────────────────────────────────────
// Rotated round-robin so repeated sends always show a plausible response.

const MOCK_REPLIES = [
  'Basándome en los datos actuales de tu organización, el marco **ISO 27001:2022** tiene 25 controles en estado "No conforme" que representan el mayor riesgo acumulado. Te recomiendo priorizar los controles de la cláusula A.8 (Controles tecnológicos), especialmente A.8.7 (Protección contra malware) y A.8.24 (Uso de criptografía).',
  'Para la auditoría programada de **LFPDPPP** en abril, tienes 3 evidencias vencidas en el repositorio. Puedo generarte una lista de tareas con responsable y fecha sugerida si me confirmas el equipo disponible.',
  'El **riesgo R-042** "Acceso no autorizado a datos de clientes" tiene una valoración residual de **Alto** y lleva 18 días sin plan de mitigación asignado. ¿Quieres que cree una tarea y la asigne al responsable del proceso?',
  'Detecté que la **Política de Seguridad de la Información** no ha sido revisada en 14 meses (vence cada 12 meses según tu marco). ¿Quieres que genere un borrador actualizado basado en la versión actual?',
  'El índice de cumplimiento general es **82 %**, 4 puntos por encima del mes anterior. Los avances más significativos fueron en LFPDPPP (+6 pts) gracias a las 8 evidencias subidas la semana pasada. ¡Buen trabajo al equipo!',
  'Encontré **3 hallazgos abiertos** de la auditoría interna de febrero que vencen esta semana. Los responsables asignados aún no han registrado avances. ¿Envío un recordatorio automático?',
]

let replyIndex = 0
function getNextReply(): string {
  return MOCK_REPLIES[replyIndex++ % MOCK_REPLIES.length]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(date: Date) {
  return date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
}

/** Minimal markdown-ish renderer: bold (**text**) and line breaks */
function renderText(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    const parts = line.split(/\*\*(.+?)\*\*/g)
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < lines.length - 1 && <br />}
      </span>
    )
  })
}

// ─── Bubble ───────────────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <div className={cn('flex gap-2 text-sm', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {!isUser && (
        <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <SparklesIcon className="size-3.5" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[78%] rounded-2xl px-3.5 py-2.5 leading-relaxed',
          isUser
            ? 'rounded-tr-sm bg-primary text-primary-foreground'
            : 'rounded-tl-sm bg-muted text-foreground'
        )}
      >
        <p>{renderText(message.text)}</p>
        <p
          className={cn(
            'mt-1 text-[10px]',
            isUser ? 'text-primary-foreground/60 text-right' : 'text-muted-foreground'
          )}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  )
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-2 text-sm">
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <SparklesIcon className="size-3.5" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Suggested prompts ────────────────────────────────────────────────────────

const SUGGESTIONS = [
  '¿Cuál es mi nivel de cumplimiento hoy?',
  'Riesgos críticos sin mitigar',
  'Evidencias vencidas esta semana',
  '¿Qué auditorías vienen pronto?',
]

// ─── Main component ───────────────────────────────────────────────────────────

export function AiCompanion() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { url } = usePage()

  // Close chat on page navigation, mark as unread so the badge shows
  useEffect(() => {
    if (open) setOpen(false)
  // open is intentionally excluded to avoid re-closing on state changes
  }, [url])

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open])

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    // Simulate AI thinking delay (800ms – 1.6s)
    const delay = 800 + Math.random() * 800
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        text: getNextReply(),
        timestamp: new Date(),
      }
      setTyping(false)
      setMessages((prev) => [...prev, aiMsg])
      if (!open) setUnread((n) => n + 1)
    }, delay)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  function resetChat() {
    setMessages(SEED_MESSAGES)
    setUnread(0)
    replyIndex = 0
  }

  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'fixed bottom-5 right-5 z-50 flex size-13 items-center justify-center rounded-full shadow-lg ring-1 ring-foreground/10 transition-all duration-200 hover:scale-105 active:scale-95',
          open ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground'
        )}
        aria-label="Abrir asistente Lex IA"
      >
        {open ? (
          <ChevronDownIcon className="size-5" />
        ) : (
          <BotMessageSquareIcon className="size-5" />
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-white">
            {unread}
          </span>
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        className={cn(
          'fixed bottom-20 right-5 z-50 flex w-90 flex-col overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-foreground/10 transition-all duration-300 origin-bottom-right',
          open
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'scale-95 opacity-0 pointer-events-none'
        )}
        style={{ height: '520px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-border bg-card px-4 py-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <SparklesIcon className="size-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight">Lex IA</p>
            <p className="text-xs text-muted-foreground truncate">Asistente de Cumplimiento IA</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={resetChat}
              className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Nueva conversación"
            >
              <RefreshCwIcon className="size-3.5" />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Cerrar"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Context pill */}
        <div className="flex items-center gap-1.5 bg-primary/5 border-b border-border px-4 py-1.5">
          <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
          <p className="text-[11px] text-muted-foreground">
            Conectado a los datos de <strong className="text-foreground">Nexum Servicios Digitales</strong>
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions (shown only when last message is from assistant) */}
        {!typing && messages[messages.length - 1]?.role === 'assistant' && (
          <div className="flex flex-wrap gap-1.5 px-4 pb-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors leading-tight"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border bg-card px-3 py-2.5">
          <div className="flex items-end gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 transition-all">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pregunta algo sobre tu cumplimiento…"
              className="flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-muted-foreground max-h-24"
              style={{ scrollbarWidth: 'none' }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              className="mb-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <SendIcon className="size-3.5" />
            </button>
          </div>
          <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
            Lex IA puede cometer errores · Verifica siempre información crítica
          </p>
        </div>
      </div>
    </>
  )
}
