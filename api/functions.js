import axios from "axios";

const url = "http://localhost:3000/api/events";

export async function fetchEvents(setEvents) {
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
    console.log(err);
  }
}

export async function postEvent(event, setEvents) {
  try {
    const formattedEvent = {
      eventName: event.name,
      eventDate: `${event.date}T00:00:00.000Z`,
      status: "notDone",
    };

    await axios.post(url, formattedEvent);

    fetchEvents(setEvents);
  } catch (err) {
    console.log(err);
  }
}
