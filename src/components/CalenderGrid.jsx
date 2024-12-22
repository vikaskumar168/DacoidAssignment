import { useState, useEffect } from "react";
import EventModal from "./EventModal";
import { getCalendarDays } from "./../utils/CalendarUtils";

function CalendarGrid() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const days = getCalendarDays(currentMonth);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === selectedEvent.id
            ? { ...selectedEvent, ...eventData }
            : event
        )
      );
    } else {
      const newEvent = { ...eventData, date: selectedDate, id: Date.now() };
      setEvents((prev) => [...prev, newEvent]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const getEventsForDate = (date) =>
    events.filter((event) => event.date.toDateString() === date.toDateString());

  // Static weekdays array
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Calculate blank cells for the first row of the calendar
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  const blankCells = Array.from({ length: firstDayOfMonth });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6">
      {/* Navigation for months */}
      <div className="flex justify-between mb-6 items-center">
        <button
          onClick={goToPreviousMonth}
          className="px-4 py-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600 transition"
        >
          Previous
        </button>
        <h2 className="text-2xl font-semibold">
          {currentMonth.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={goToNextMonth}
          className="px-4 py-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600 transition"
        >
          Next
        </button>
      </div>

      {/* Weekdays Row */}
      <div className="grid grid-cols-7 text-center text-gray-400 font-semibold mb-4">
        {weekdays.map((day, idx) => (
          <div key={idx} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {/* Blank cells for alignment */}
        {blankCells.map((_, idx) => (
          <div key={`blank-${idx}`} className="p-4"></div>
        ))}

        {/* Calendar Days */}
        {days.map((day, idx) => {
          const eventsForDay = getEventsForDate(day.date);
          return (
            <div
              key={idx}
              onClick={() => handleDayClick(day.date)}
              className={`p-4 border rounded-full cursor-pointer text-center 
                ${
                  selectedDate?.toDateString() === day.date.toDateString()
                    ? "bg-blue-600 text-white"
                    : day.isToday
                    ? "bg-gray-700 text-yellow-300"
                    : "bg-gray-800"
                } ${
                day.isWeekend ? "text-red-400" : "text-gray-300"
              } hover:bg-blue-500 transition-all duration-300 ${
                eventsForDay.length ? "ring-2 ring-blue-400" : ""
              }`}
            >
              {day.date.getDate()}
            </div>
          );
        })}
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        eventData={selectedEvent}
        events={getEventsForDate(selectedDate || new Date())}
      />
    </div>
  );
}

export default CalendarGrid;
