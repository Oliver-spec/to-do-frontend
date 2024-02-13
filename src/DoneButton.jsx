import axios from "axios";
import { VscCheck } from "react-icons/vsc";

export default function DoneButton({
  setError,
  setEvents,
  setMaxPage,
  id,
  page,
}) {
  async function handleFlipStatus() {
    try {
      const res = await axios.patch(`/api/events/${id}?page=${page}`);
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
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <button
      className="border-2 border-black rounded-xl p-2 hover:bg-white"
      type="button"
      onClick={handleFlipStatus}
    >
      <VscCheck size="28px" />
    </button>
  );
}
