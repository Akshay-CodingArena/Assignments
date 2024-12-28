import { useMemo, useState } from "react";
import Searchbar from "./components/Searchbar";
import Select from "./components/Select";
import { tableData } from "./data";

export default function Table() {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(15);
  const [page, setPage] = useState(0);
  const [data, setData] = useState(
    tableData.map((data) => {
      return { ...data, colored: false };
    })
  );
  //  let filteredData = data.filter((row, index) => row.name.indexOf(search) > -1);
  const filteredData = useMemo(() => {
    let res = data.filter((row, index) => row.name.indexOf(search) > -1);
    return res;
  }, [search, data]);

  const length = filteredData.length;
  const pages = Array(Math.ceil(length / offset)).fill(0);
  const start = page * offset;
  const end = start + offset;
  console.log("pages are", pages, page, start, "nxt", end, "len", length);
  return (
    <>
      <div className="controls">
        <Select
          options={[5, 10, 15]}
          onChange={(e) => setOffset(parseInt(e.target.value))}
          value={offset}
        />
        <Searchbar
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />
      </div>
      <div className="container">
        <table cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th>SNO</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(start, end).map((row, index) => (
              <tr
                id={`row${index}`}
                className={row.colored ? `colored-row` : ""}
                key={start + "" + index}
              >
                <td>{start + index + 1}</td>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.gender}</td>
                <td>
                  <button
                    onClick={(e) => {
                      filteredData[index].colored =
                        !filteredData[index].colored;
                      setData([...data]);
                    }}
                  >
                    Color
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container">
        {pages.map((_, num) => (
          <div
            key={num}
            className="page"
            onClick={() => {
              console.log("numb", num);
              setPage(num);
            }}
          >
            {num + 1}
          </div>
        ))}
      </div>
    </>
  );
}
