import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '../utils/cn'

export type CharacterVariant = {
  tag: string
  label: string
  sample: string
}

export const CHARACTER_VARIANTS: CharacterVariant[] = [
  { tag: 'cv08', label: 'Serifed uppercase I', sample: 'I II' },
  { tag: 'cv01', label: 'Alternate one', sample: '1 10 11' },
  { tag: 'cv09', label: 'Flat-top three', sample: '3 33 .31' },
  { tag: 'cv02', label: 'Open four', sample: '4 42 14' },
  { tag: 'cv03', label: 'Open six', sample: '6 60 16' },
  { tag: 'cv04', label: 'Open nine', sample: '9 90 19' },
  { tag: 'cv05', label: 'Lowercase l with tail', sample: 'l ll lab' },
  { tag: 'cv06', label: 'Simplified u', sample: 'u un urn' },
  { tag: 'cv07', label: 'Alternate German double s', sample: 'ß' },
  { tag: 'cv10', label: 'Capital G with spur', sample: 'G' },
  { tag: 'cv11', label: 'Single-story a', sample: 'a' },
  { tag: 'cv12', label: 'Compact f', sample: 'f' },
  { tag: 'cv13', label: 'Compact t', sample: 't' },
]

export function toFontFeatureSettings(enabled: Set<string>): string {
  const selected = CHARACTER_VARIANTS.filter((variant) =>
    enabled.has(variant.tag),
  ).map((variant) => `"${variant.tag}" 1`)

  return selected.length > 0 ? selected.join(', ') : 'normal'
}

type FontFeatureSettingsProps = {
  enabled: Set<string>
  onChange: (next: Set<string>) => void
  className?: string
}

const FontFeatureSettings = ({
  enabled,
  onChange,
  className,
}: FontFeatureSettingsProps) => {
  const [open, setOpen] = useState(false)
  const cssValue = useMemo(() => toFontFeatureSettings(enabled), [enabled])

  const toggle = (tag: string) => {
    const next = new Set(enabled)
    if (next.has(tag)) {
      next.delete(tag)
    } else {
      next.add(tag)
    }
    onChange(next)
  }

  const reset = () => onChange(new Set())

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Font feature settings"
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-[16px] transition-colors hover:bg-gray-100',
            className,
          )}
        >
          <span aria-hidden className="inline-block -scale-x-100">
            ✏️
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        sideOffset={12}
        avoidCollisions={false}
        className="w-[360px] overflow-hidden rounded-xl border border-gray-200 bg-white/95 p-0 text-slate-900 shadow-lg backdrop-blur-sm"
        style={{ fontFeatureSettings: 'normal' }}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h3 className="font-sans text-[15px] font-semibold tracking-tight">
            Font Feature Settings
          </h3>
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-gray-100 bg-gray-100 px-4 py-2.5 font-mono text-[12px] text-gray-700">
          font-feature-settings: {cssValue};
        </div>

        <div className="max-h-[280px] overflow-y-auto px-3 py-3">
          <p className="mb-2 px-1 text-[10px] font-medium uppercase tracking-[0.08em] text-gray-400">
            Character variants
          </p>
          <ul className="flex flex-col gap-0.5">
            {CHARACTER_VARIANTS.map((variant) => {
              const checked = enabled.has(variant.tag)
              return (
                <li key={variant.tag}>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(variant.tag)}
                      className="h-3.5 w-3.5 shrink-0 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                    <span className="w-10 shrink-0 font-mono text-[12px] text-gray-500">
                      {variant.tag}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-sans text-[13px] text-gray-800">
                      {variant.label}
                    </span>
                    <span
                      className="shrink-0 font-sans text-[13px] text-gray-500"
                      style={{
                        fontFeatureSettings: `"${variant.tag}" 1`,
                      }}
                    >
                      {variant.sample}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-gray-900 px-3 py-1 font-sans text-[13px] text-gray-900 transition-colors hover:bg-gray-50"
          >
            Reset
          </button>
          <a
            href="https://rsms.me/inter/#features"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1 font-sans text-[13px] text-gray-700 transition-colors hover:bg-gray-50"
          >
            Inter Features
            <span aria-hidden className="text-[11px]">
              ↗
            </span>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default FontFeatureSettings
