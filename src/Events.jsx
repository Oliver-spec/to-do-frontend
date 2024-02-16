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
  loading,
  setLoading,
}) {
  return (
    <div>
      {events.map((event) => (
        <div
          className="flex flex-row justify-between border-2 border-black rounded-xl p-3 w-5/6 bg-slate-200 mb-5"
          key={event.id}
        >
          <div className="flex flex-row gap-5">
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
          </div>
          <div className="flex flex-row gap-5">
            <DoneButton
              setError={setError}
              setEvents={setEvents}
              setMaxPage={setMaxPage}
              id={event.id}
              page={page}
              loading={loading}
              setLoading={setLoading}
            />
            <DelButton
              setError={setError}
              setEvents={setEvents}
              setMaxPage={setMaxPage}
              id={event.id}
              page={page}
              setPage={setPage}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
