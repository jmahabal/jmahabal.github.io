import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover'
import { X } from 'lucide-react'

interface HonorificsPopoverProps {
  children: React.ReactNode
}

const HonorificsPopover: React.FC<HonorificsPopoverProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-72 p-0"
        align="start"
        side="bottom"
        sideOffset={5}
        avoidCollisions={false}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h3 className="text-lg font-semibold text-slate-900">Honorifics</h3>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="px-4 py-5">
            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Aaji
              </div>
              <div className="text-slate-600">grandmother</div>

              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Ajoba
              </div>
              <div className="text-slate-600">grandfather</div>

              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Atya
              </div>
              <div className="text-slate-600">father's sister</div>

              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Dada
              </div>
              <div className="text-slate-600">elder brother</div>

              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Kaka
              </div>
              <div className="text-slate-600">generic uncle</div>

              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Kaku
              </div>
              <div className="text-slate-600">dad's brother's wife</div>

              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Mama
              </div>
              <div className="text-slate-600">mother's brother</div>

              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Mami
              </div>
              <div className="text-slate-600">mother's brother's wife</div>

              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Maushi
              </div>
              <div className="text-slate-600">mother's sister</div>

              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Panji
              </div>
              <div className="text-slate-600">great-grandmother</div>

              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Panjoba
              </div>
              <div className="text-slate-600">great-grandfather</div>

              <div className="font-semibold text-slate-900 whitespace-nowrap">
                Tai
              </div>
              <div className="text-slate-600">elder sister</div>
            </div>
          </div>
          <div className="border-t border-slate-200 px-4 py-5">
            <div className="text-sm text-slate-600">
              You can address an older, non-relative as "maushi" or "kaku".
              Technically, "kaku" implies she's married (on your dad's side),
              since otherwise she's be called "atya" or not in the family.
              <br />
              <br />
              That said, broadly speaking, "kaka" and "kaku" are more generic.
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default HonorificsPopover
