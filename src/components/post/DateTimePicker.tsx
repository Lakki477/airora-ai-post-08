
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DateTimePickerProps {
  scheduleDate: Date | undefined;
  setScheduleDate: (date: Date | undefined) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  scheduleDate,
  setScheduleDate,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Schedule Date & Time</label>
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !scheduleDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={scheduleDate}
              onSelect={setScheduleDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Input
          type="time"
          className="w-[120px]"
          defaultValue="12:00"
        />
      </div>
    </div>
  );
};

export default DateTimePicker;
