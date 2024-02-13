import axios from "axios";
import { VscTrash } from "react-icons/vsc";

export default function DelButton({
  setError,
  setEvents,
  setMaxPage,
  id,
  page,
  setPage,
}) {
  async function handleDeleteEvent() {
    try {
      const res = await axios.delete(`/api/events/${id}?page=${page}`);
      const { events, maxPage } = res.data;
      const formattedEvents = events.map((event) => {
        return {
          id: event.event_id,
          name: event.event_name,
          status: event.status,
          date: event.event_date,
        };
      });

      setEvents(formattedEvents);
      setMaxPage(maxPage);

      if (page > maxPage) {
        setPage(maxPage);
      }
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <button
      className="border-2 border-red-600 rounded-xl p-2 hover:bg-white"
      type="button"
      onClick={handleDeleteEvent}
    >
      <VscTrash size="28px" color="red" />
    </button>
  );
}
