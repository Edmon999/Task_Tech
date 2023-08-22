import { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {  Checkbox, FormControlLabel } from "@mui/material";

import './DateRange.css'

export const DateRange: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handleStartDateChange = (date: Date | null) => {
    setSelectedStartDate(date);
    if (selectedEndDate && date && selectedEndDate <= date) {
      setSelectedEndDate(null);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (selectedStartDate && date && date <= selectedStartDate) {
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(date);
    }
  };

  const handleInProgressChange = () => {
    setInProgress(!inProgress);
  };

  const currentDate = new Date();

  const calculateElapsedTime = () => {
    if (selectedEndDate) {
      const endDateMiliseconds = new Date(selectedEndDate).getTime();
      const currentDateMiliseconds = currentDate.getTime();
      const diffMilliseconds = currentDateMiliseconds - endDateMiliseconds;

      const days = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diffMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((diffMilliseconds % (1000 * 60)) / 1000);

      return `${days}:${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return "0:00:00:00";
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="date-range-container">
        <DatePicker
          label="Start Date"
          value={selectedStartDate}
          onChange={handleStartDateChange}
          shouldDisableDate={(date) => date > currentDate}
        />
        {!inProgress && (
          <DatePicker
            label="End Date"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            shouldDisableDate={(date) =>
              date <= (selectedStartDate as Date) || date > currentDate
            }
          />
        )}
        <FormControlLabel
          control={
            <Checkbox checked={inProgress} onChange={handleInProgressChange} />
          }
          label="In Progress"
        />
        {inProgress && <div>Time Elapsed: {calculateElapsedTime()}</div>}
      </div>
    </LocalizationProvider>
  );
};
