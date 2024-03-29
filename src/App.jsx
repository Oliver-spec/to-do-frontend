import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import Search from "./Search";
import Add from "./Add";
import Events from "./Events";
import Pagination from "./Pagination";
import ErrorHandler from "./ErrorHandler";
import FilterButton from "./FilterButton";

export default function App() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    handleSearch();
  }, [page, searchTerm, filter]);

  async function handleSearch() {
    try {
      setLoading(true);

      const res = await axios.get(
        `/api/events?searchFor=${searchTerm}&page=${page}&filter=${filter}`
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

      if (maxPage < page) {
        setPage(maxPage);
      }

      setLoading(false);
    } catch (err) {
      setError(err.response.data);
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col bg-neutral-100 h-screen">
      <div className="flex flex-row border-b-2">
        <Add
          setError={setError}
          setEvents={setEvents}
          setMaxPage={setMaxPage}
          setLoading={setLoading}
          loading={loading}
          page={page}
          filter={filter}
          searchTerm={searchTerm}
        />
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="ml-10 flex-1">
        <div className="flex flex-row">
          <div className="p-5 text-2xl font-bold">Events</div>
          <div className="flex flex-col items-center justify-center">
            <FilterButton setFilter={setFilter} loading={loading} />
          </div>
        </div>
        <Events
          events={events}
          setError={setError}
          setEvents={setEvents}
          setMaxPage={setMaxPage}
          page={page}
          setPage={setPage}
          loading={loading}
          setLoading={setLoading}
          searchTerm={searchTerm}
          filter={filter}
        />
        <Pagination setPage={setPage} page={page} maxPage={maxPage} />
      </div>
      {error && <ErrorHandler error={error} setError={setError} />}

      {error === "Invalid Token - Please Login" ? (
        <Navigate to="/login" />
      ) : null}
    </main>
  );
}
