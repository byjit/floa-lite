"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type Option = {
  value: string
  label: string
}

interface SearchableSelectProps {
  options: Option[]
  placeholder?: string
  emptyMessage?: string
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

export function SearchableSelect({
  options,
  placeholder = "Select an option",
  emptyMessage = "No results found.",
  value,
  onValueChange,
  disabled = false,
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string | undefined>(value)

  React.useEffect(() => {
    if (value !== selected) {
      setSelected(value)
    }
  }, [value, selected])

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      setSelected(currentValue)
      onValueChange?.(currentValue)
      setOpen(false)
    },
    [onValueChange],
  )

  const selectedOption = React.useMemo(() => options.find((option) => option.value === selected), [options, selected])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn("flex max-w-[100px] justify-between px-0 hover:bg-transparent text-neutral-300 hover:text-foreground", className)}
          disabled={disabled}
        >
          <p className="text-xs">{selectedOption ? selectedOption.label : placeholder}</p>
          <ChevronDown className="h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} className="text-xs" />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {options.map((option, i) => (
                <CommandItem key={i} value={option.value} onSelect={handleSelect}>
                  <Check className={cn("h-4 w-4", selected === option.value ? "opacity-100" : "opacity-0")} />
                  <p className="text-xs">{option.label}</p>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
