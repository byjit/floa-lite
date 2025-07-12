"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Framework = Record<"value" | "label", string>;

const multiSelectVariants = cva(
  "flex h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive: "border-destructive text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface MultiSelectProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof multiSelectVariants> {
  options: Framework[];
  value: Framework[];
  onChange: (value: Framework[]) => void;
  placeholder?: string;
}

const MultiSelect = React.forwardRef<HTMLInputElement, MultiSelectProps>(
  ({ options, value, onChange, placeholder, variant, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    const handleSelect = (framework: Framework) => {
      onChange([...value, framework]);
    };

    const handleRemove = (framework: Framework) => {
      onChange(value.filter((f) => f.value !== framework.value));
    };

    const filteredOptions = options.filter(
      (option) =>
        !value.some((v) => v.value === option.value) &&
        option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
      <CommandPrimitive>
        <div className="relative">
          <div
            className={cn(
              multiSelectVariants({ variant }),
              "flex min-h-[38px] flex-wrap items-center gap-1"
            )}
            onClick={() => setOpen(true)}
          >
            {value.map((framework) => (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(framework);
                  }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
            <CommandPrimitive.Input
              ref={ref}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              {...props}
            />
          </div>
          {open && filteredOptions.length > 0 && (
            <div className="absolute top-full z-10 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
              <CommandGroup className="h-full overflow-auto">
                {filteredOptions.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      handleSelect(framework);
                      setInputValue("");
                    }}
                    className="cursor-pointer"
                  >
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          )}
        </div>
      </CommandPrimitive>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
