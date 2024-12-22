import { useState } from 'react';
import CalenderGrid from '../components/CalenderGrid';
import Header from '../components/Header';

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({}); // Store events with dates as keys

  return (
    <div className="container mx-auto p-4">
      <Header />
      <CalenderGrid 
        events={events} 
        setEvents={setEvents} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate} 
      />
    </div>
  );
}

export default CalendarPage;
