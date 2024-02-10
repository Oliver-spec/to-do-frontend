import axios from "axios";

const url = "/api/events";

export async function fetchEvents(setEvents, setError, page, setMaxPage) {
  try {
    const res = await axios.get(`${url}/?page=${page}`);

    const events = res.data.events.map((event) => {
      return {
        id: event.event_id,
        name: event.event_name,
        status: event.status,
        date: event.event_date,
      };
    });

    const maxPage = res.data.maxPage;

    setMaxPage(maxPage);
    setEvents(events);
  } catch (err) {
    setError(err.response.data);
  }
}

export async function postEvent(event, setEvents, setError, page, setMaxPage) {
  try {
    const formattedEvent = {
      eventName: event.name,
      eventDate: `${event.date}T00:00:00.000Z`,
      status: "notDone",
    };

    await axios.post(url, formattedEvent);

    fetchEvents(setEvents, setError, page, setMaxPage);
  } catch (err) {
    setError(err.response.data);
  }
}

export async function deleteEvent(id, setEvents, setError, page, setMaxPage) {
  try {
    await axios.delete(`${url}/${id}`);

    fetchEvents(setEvents, setError, page, setMaxPage);
  } catch (err) {
    setError(err.response.data);
  }
}

export async function flipStatus(id, setEvents, setError, page, setMaxPage) {
  try {
    await axios.patch(`${url}/${id}`);

    fetchEvents(setEvents, setError, page, setMaxPage);
  } catch (err) {
    setError(err.response.data);
  }
}
