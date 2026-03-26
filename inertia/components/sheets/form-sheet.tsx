/**
 * FormSheet – Reusable institutional data-entry side sheet.
 *
 * Usage:
 *   <FormSheet
 *     trigger={<Button size="sm"><PlusIcon />Nuevo riesgo</Button>}
 *     title="Nuevo Riesgo"
 *     description="Registre un nuevo riesgo identificado en la organización."
 *     onSubmit={handleSubmit}
 *   >
 *     {children}  ← your form fields go here
 *   </FormSheet>
 */

import React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "~/components/ui/sheet"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"

export interface FormSheetProps {
  /** Element that opens the sheet (usually a Button). */
  trigger?: React.ReactNode
  /** Short title shown in the sheet header. */
  title: string
  /** Optional subtitle / instruction text. */
  description?: string
  /** Called when the primary action button is clicked. */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  /** Label for the submit button. Defaults to "Guardar". */
  submitLabel?: string
  /** Show a destructive action (e.g. delete) in footer. */
  destructiveAction?: React.ReactNode
  /** Icon rendered next to the title. */
  icon?: React.ReactNode
  /** Accent stripe colour class (Tailwind bg-*). */
  accentClass?: string
  /** Controlled open state (optional). */
  open?: boolean
  /** Callback when controlled open state changes. */
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function FormSheet({
  trigger,
  title,
  description,
  onSubmit,
  submitLabel = "Guardar",
  destructiveAction,
  icon,
  accentClass = "bg-primary",
  open,
  onOpenChange,
  children,
}: FormSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex flex-col p-0 sm:max-w-md gap-0"
      >
        {/* Accent top stripe */}
        <div className={`h-1 w-full shrink-0 rounded-t-[inherit] ${accentClass}`} />

        {/* Header */}
        <SheetHeader className="px-5 pt-4 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {icon && (
                <span className="shrink-0 text-muted-foreground">{icon}</span>
              )}
              <div className="min-w-0">
                <SheetTitle className="text-base font-semibold leading-tight">
                  {title}
                </SheetTitle>
                {description && (
                  <SheetDescription className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    {description}
                  </SheetDescription>
                )}
              </div>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon-sm" className="shrink-0 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Cerrar</span>
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <Separator />

        {/* Scrollable body */}
        <form
          onSubmit={onSubmit ?? ((e) => e.preventDefault())}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="flex flex-col gap-4">{children}</div>
          </div>

          <Separator />

          {/* Footer */}
          <SheetFooter className="px-5 py-3 flex-row gap-2">
            {destructiveAction && (
              <span className="mr-auto">{destructiveAction}</span>
            )}
            <SheetClose asChild>
              <Button variant="outline" size="sm" type="button">
                Cancelar
              </Button>
            </SheetClose>
            <Button size="sm" type="submit">
              {submitLabel}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

/* ──────────────────────────────────────────────
   Convenience sub-components for field layout
   inside a FormSheet.
────────────────────────────────────────────── */

/** A labelled field row. */
export function SheetField({
  label,
  required,
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium leading-none">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

/** A horizontal group of two fields side-by-side. */
export function SheetFieldRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>
}

/** A section divider inside the sheet body. */
export function SheetSection({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      {title && (
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
      )}
      {children}
    </div>
  )
}
