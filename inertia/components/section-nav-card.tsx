import type { LucideIcon } from "lucide-react"
import { ChevronRightIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

interface SectionNavCardProps {
  number: string
  title: string
  description: string
  href: string
  icon: LucideIcon
  stats: { label: string; value: string }[]
  accent: string
  bg: string
  border: string
}

export function SectionNavCard({
  number,
  title,
  description,
  href,
  icon: Icon,
  stats,
  accent,
  bg,
  border,
}: SectionNavCardProps) {
  return (
    <Card className={`border ${border}`}>
      <CardHeader>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg} mb-1`}>
          <Icon className={`size-5 ${accent}`} />
        </div>
        <CardTitle className="text-base">
          <span className={`text-xs font-semibold mr-1.5 ${accent}`}>{number}</span>
          {title}
        </CardTitle>
        <CardDescription className="text-xs leading-relaxed mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {stats.map((st) => (
              <div key={st.label}>
                <p className="text-lg font-bold">{st.value}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{st.label}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={href}>
              Abrir <ChevronRightIcon />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
