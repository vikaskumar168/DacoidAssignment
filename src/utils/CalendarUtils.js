export const getCalendarDays = (currentMonth) => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  
    const days = [];
    for (let d = startOfMonth; d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      days.push({ date: new Date(d) });
    }
    return days;
  };
  