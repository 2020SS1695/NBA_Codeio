

"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/shadcn/lib/utils"
import { Button } from "@/shadcn/components/ui/button"
import { Calendar } from "@/shadcn/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover"
import { Evaluator } from "./evaluation"
import { Row } from "@tanstack/react-table"

interface DatePickerProps {
  initialDate?: Date
  rowValues: Row<Evaluator>
  onSelect?: (date: Date) => void
}

export function DatePicker({ initialDate, rowValues }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => {
            rowValues.original.date = value
            setDate(value)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
