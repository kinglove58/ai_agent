import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./ui/command";

interface CommandSelectProps {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  value,
  options,
  onSelect,
  onSearch = () => {},
  placeholder = "Select an option",
  isSearchable = true,
  className,
}: CommandSelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);
  const handleOpenChange = (open: boolean) => {
    onSearch("");
    setOpen(open);
  };
  return (
    <>
      <Button
        onClick={() => setOpen((v) => !v)}
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronDownIcon />
      </Button>
      <CommandResponsiveDialog
        open={open}
        onOpenChange={handleOpenChange}
        shouldFilter={!onSearch}
      >
        {isSearchable ? (
          <>
            <CommandInput placeholder="search..." onValueChange={onSearch} />
            <CommandList>
              <CommandEmpty>
                <span className="text-muted-foreground text-sm">
                  No results found.
                </span>
              </CommandEmpty>
              {options.map((opt) => (
                <CommandItem
                  key={opt.id}
                  onSelect={() => {
                    onSelect(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.children}
                </CommandItem>
              ))}
            </CommandList>
          </>
        ) : (
          <CommandList>
            <CommandEmpty>
              <span className="text-muted-foreground text-sm">
                No results found.
              </span>
            </CommandEmpty>
            {options.map((opt) => (
              <CommandItem
                key={opt.id}
                onSelect={() => {
                  onSelect(opt.value);
                  setOpen(false);
                }}
              >
                {opt.children}
              </CommandItem>
            ))}
          </CommandList>
        )}
      </CommandResponsiveDialog>
    </>
  );
};
