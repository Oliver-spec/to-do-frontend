import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";

export default function Pagination({ setPage, page, maxPage }) {
  return (
    <div className="flex flex-row gap-3">
      <button
        className="border-none rounded-xl py-2 px-2 hover:bg-slate-200"
        type="button"
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        <VscArrowLeft size="28px" />
      </button>
      <div className="text-xl border-2 border-black rounded-xl py-2 px-5">
        {page}
      </div>
      <button
        className="border-none rounded-xl py-2 px-2 hover:bg-slate-200"
        type="button"
        onClick={() => {
          if (page < maxPage) {
            setPage(page + 1);
          }
        }}
      >
        <VscArrowRight size="28px" />
      </button>
    </div>
  );
}
