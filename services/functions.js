import axios from "axios";

const url = "/api/events";

export async function fetchEvents(setEvents, setError) {
  try {
    const res = await axios.get(url);

    const events = res.data.map((event) => {
      return {
        id: event.event_id,
        name: event.event_name,
        status: event.status,
        date: event.event_date,
      };
    });

    setEvents(events);
  } catch (err) {
    setError(err.response.data);
  }
}

export async function postEvent(event, setEvents, setError) {
  try {
    const formattedEvent = {
      eventName: event.name,
      eventDate: `${event.date}T00:00:00.000Z`,
      status: "notDone",
    };

    await axios.post(url, formattedEvent);

    fetchEvents(setEvents, setError);
  } catch (err) {
    setError(err.response.data);
  }
}

export async function deleteEvent(id, setEvents, setError) {
  try {
    await axios.delete(`${url}/${id}`);

    fetchEvents(setEvents, setError);
  } catch (err) {
    setError(err.response.data);
  }
}

export async function flipStatus(id, setEvents, setError) {
  try {
    await axios.patch(`${url}/${id}`);

    fetchEvents(setEvents, setError);
  } catch (err) {
    setError(err.response.data);
  }
}
