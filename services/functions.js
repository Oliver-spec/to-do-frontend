import axios from "axios";

const url = "/api/events";

export async function fetchEvents(setEvents, setHasError) {
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
    setHasError(true);
  }
}

export async function postEvent(event, setEvents, setHasError) {
  try {
    const formattedEvent = {
      eventName: event.name,
      eventDate: `${event.date}T00:00:00.000Z`,
      status: "notDone",
    };

    await axios.post(url, formattedEvent);

    fetchEvents(setEvents, setHasError);
  } catch (err) {
    setHasError(true);
  }
}

export async function deleteEvent(id, setEvents, setHasError) {
  try {
    await axios.delete(`${url}/${id}`);

    fetchEvents(setEvents, setHasError);
  } catch (err) {
    setHasError(true);
  }
}

export async function flipStatus(id, setEvents, setHasError) {
  try {
    await axios.patch(`${url}/${id}`);

    fetchEvents(setEvents, setHasError);
  } catch (err) {
    setHasError(true);
  }
}
