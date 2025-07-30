import { useEffect, useState } from "react";
import Icon from "../layouts/sidebar/Icons";

const numOfData = 2;
const Tabel = ({ data, dataInfo, tabelActions }) => {
  const [currtPage, setCurrPage] = useState(1);
  const [dataRows, setDataRows] = useState([]);
  const [pages, setPages] = useState();
  const [numOfPages, setNumOfPages] = useState([]);
  useEffect(() => {
    let start = currtPage * numOfData - numOfData;
    let end = currtPage * numOfData;
    setDataRows(data.slice(start, end));
  }, [currtPage]);
  useEffect(() => {
    setPages(data.length / numOfData);
    let newArr = [];
    for (let i = 1; i <= pages; i++) {
      newArr = [...newArr, i];
    }
    setNumOfPages(newArr);
  }, []);

  return (
    <>
      <table className="w-full bg-white shadow-md border border-gray-300">
        <thead className="border border-gray-300 bg-gray-200">
          <tr>
            {dataInfo.map((item, i) => {
              return (
                <th
                  key={i + 1}
                  className="border border-gray-300 text-center p-2"
                >
                  {item.value}
                </th>
              );
            })}
            <th className="border border-gray-300 text-center p-2">
              {tabelActions.title}
            </th>
          </tr>
        </thead>
        <tbody>
          {dataRows.map((d) => {
            return (
              <tr
                key={d.id}
                className="border hover:bg-gray-100 border-gray-300"
              >
                {dataInfo.map((i, index) => {
                  return (
                    <td
                      key={index + 1}
                      className="border border-gray-300 text-center p-2"
                    >
                      {d[i.field]}
                    </td>
                  );
                })}
                {tabelActions.icons(d.id)}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="p-4 flex justify-center">
        <ul
          className="flex items-center border border-slate-300 bg-white divide-x-2"
          dir="ltr"
        >
          <button
            disabled={currtPage == 1}
            onClick={() => {
              setCurrPage((prev) => prev - 1);
            }}
            className="p-3 text-blue-500 font-bold cursor-pointer"
          >
            <Icon name="chevronLeft" size={14} />
          </button>
          {numOfPages.map((page) => {
            return (
              <li
                key={page}
                className="p-2 px-4 text-blue-500 font-bold cursor-pointer"
                onClick={() => {
                  setCurrPage(page);
                }}
              >
                <a>{page}</a>
              </li>
            );
          })}

          <button
            disabled={currtPage == pages}
            onClick={() => {
              setCurrPage((prev) => prev + 1);
            }}
            className="p-3 text-blue-500 font-bold cursor-pointer"
          >
            <Icon name="chevronRight" size={14} />
          </button>
        </ul>
      </div>
    </>
  );
};

export default Tabel;
