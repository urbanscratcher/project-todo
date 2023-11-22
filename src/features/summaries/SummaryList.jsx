function SummaryList({ sums, onClick }) {
  return (
    <ol className="text-3xl flex flex-col gap-5">
      {sums.map((v, idx) => (
        <li key={v.id} id={v.id} className="flex justify-between px-10">
          <p className="flex gap-4">{`${idx + 1}. ${v.text}`}</p>
          <div
            className={`i-lucide:x hover:text-black`}
            cursor-pointer
            onClick={(e) => onClick(e, idx)}
          ></div>
        </li>
      ))}
    </ol>
  );
}

export default SummaryList;
