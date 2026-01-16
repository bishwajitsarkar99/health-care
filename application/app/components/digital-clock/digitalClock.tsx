"use client";
import { useDigitalClock } from "@/hooks/useDigitalClock";
import { twMerge } from "tailwind-merge";

interface DigitalClockProps {
  className?: string;
}

export default function DigitalClock({ className }: DigitalClockProps) {
  const now = useDigitalClock();

  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const ampm = now.toLocaleTimeString("en-US", {
    hour12: true,
  }).slice(-2);

  return (
    <span className={className}>
      {formattedDate} : 
      <span>
        <span className={twMerge(
          "bg-linear-to-r from-emerald-800 to-amber-600 text-white",
          "ps-0.5 pe-0.5"
        )}>
          {formattedTime.replace(/\s?(AM|PM)/, "")}
          <span className="ms-1">
            {ampm}
          </span>
        </span>
      </span>
    </span>
  );
}
