import { VscPass } from "react-icons/vsc";
import DoneButton from "./DoneButton";
import DelButton from "./DelButton";

export default function Events({
  events,
  setError,
  setEvents,
  setMaxPage,
  page,
  setPage,
}) {
  return (
    <div>
      {events.map((event) => (
        <div
          className="flex flex-row gap-10 border-2 border-black rounded-xl p-3 w-5/6 bg-slate-200 mb-5"
          key={event.id}
        >
          <div className="flex flex-col items-center justify-center text-xl">
            <div>{event.name}</div>
          </div>
          <div className="flex flex-col items-center justify-center text-xl">
            <div>{event.date}</div>
          </div>
          <div className="flex flex-col items-center justify-center text-xl">
            <div>
              {event.status === "done" ? <VscPass size="28px" /> : null}
            </div>
          </div>
          <div className="flex-1"></div>
          <DoneButton
            setError={setError}
            setEvents={setEvents}
            setMaxPage={setMaxPage}
            id={event.id}
            page={page}
          />
          <DelButton
            setError={setError}
            setEvents={setEvents}
            setMaxPage={setMaxPage}
            id={event.id}
            page={page}
            setPage={setPage}
          />
        </div>
      ))}
    </div>
  );
}
