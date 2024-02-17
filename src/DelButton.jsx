import axios from "axios";
import { VscTrash } from "react-icons/vsc";

export default function DelButton({
  setError,
  setEvents,
  setMaxPage,
  id,
  page,
  setPage,
  setLoading,
  loading,
  searchTerm,
  filter,
}) {
  async function handleDeleteEvent() {
    try {
      setLoading(true);

      const res = await axios.delete(
        `/api/events/${id}?page=${page}&searchFor=${searchTerm}&filter=${filter}`
      );
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

      setLoading(false);
    } catch (err) {
      setError(err.response.data);
      setLoading(false);
    }
  }

  return (
    <button
      className="border-2 border-red-600 rounded-xl p-2 hover:bg-white"
      type="button"
      onClick={handleDeleteEvent}
      disabled={loading}
    >
      <VscTrash size="28px" color="red" />
    </button>
  );
}
