import { useEffect, useState } from "react";

function EventModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  eventData = {},
  events,
}) {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  // Update modal fields when eventData changes (edit mode)
  useEffect(() => {
    if (eventData) {
      setEventName(eventData.name || "");
      setStartTime(eventData.startTime || "");
      setEndTime(eventData.endTime || "");
      setDescription(eventData.description || "");
    }
  }, [eventData]);

  // Handle Save Event
  const handleSave = () => {
    if (!eventName || !startTime || !endTime) {
      alert("Please fill out all required fields.");
      return;
    }
    onSave({ name: eventName, startTime, endTime, description });
    resetFields();
    onClose();
  };

  // Reset all input fields
  const resetFields = () => {
    setEventName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full text-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-100">Manage Events</h2>

        {/* List Existing Events */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-300">Events for the Day</h3>
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2"
              >
                <div>
                  <h4 className="font-semibold text-gray-100">{event.name}</h4>
                  <p className="text-sm text-gray-400">
                    {event.startTime} - {event.endTime}
                  </p>
                </div>
                <button
                  onClick={() => onDelete(event.id)}
                  className="text-red-500 hover:text-red-400 text-sm"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No events for this day.</p>
          )}
        </div>

        {/* Add/Edit Event Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Event Name *</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Start Time *</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">End Time *</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => {
              resetFields();
              onClose();
            }}
            className="bg-gray-700 text-gray-300 px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
