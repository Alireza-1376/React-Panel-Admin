import { useContext, useEffect, useState } from "react";
import Icon from "../layouts/sidebar/Icons";
import { ModalContext } from "../contexts/ModalContext";


const Tabel = ({ numOfData, data, dataInfo, status, tabelActions, colors, title, placeholder, logos }) => {
  const { showModal, setShowModal } = useContext(ModalContext)
  const [currtPage, setCurrPage] = useState(1);
  const [dataRows, setDataRows] = useState([]);
  const [pages, setPages] = useState();
  const [numOfPages, setNumOfPages] = useState([]);
  const [seatchInput, setSearchInput] = useState("");
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    let newDataArray = data.filter((item) => {
      return item.category.includes(seatchInput)
    })
    setNewData(newDataArray)
  }, [seatchInput])

  useEffect(() => {
    setPages(newData.length / numOfData);
    let newArr = [];
    for (let i = 1; i <= Math.ceil(pages); i++) {
      newArr = [...newArr, i];
    }
    setNumOfPages(newArr);
  }, [pages, numOfData, newData]);

  useEffect(() => {
    let start = currtPage * numOfData - numOfData;
    let end = currtPage * numOfData;
    setDataRows(newData.slice(start, end));
  }, [currtPage, numOfData, newData]);



  return (
    <>
      <div className="flex justify-between py-4">
        <div className="w-1/2 flex items-center">
          <button className="bg-blue-300/50 border border-gray-400 py-2 px-4">{title}</button>
          <input onChange={(e) => { setSearchInput(e.target.value) }} placeholder={placeholder} type="text" className="focus:outline-none p-2 w-4/5 md:w-1/2 border border-gray-400" />
        </div>
        {tabelActions ? <div onClick={() => { setShowModal(true) }} className="bg-green-700 text-white p-3 rounded-md cursor-pointer">
          <Icon name="plus" size={18} />
        </div> : null}
      </div>



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
            {colors ? <th className="border border-gray-300 text-center p-2">
              {colors.bgColor}
            </th> : null}
            {logos ? <th className="border border-gray-300 text-center p-2">
              {logos.name}
            </th> : null}
            {status ? <th className="border border-gray-300 text-center p-2">{status.status}</th> : null}
            {tabelActions ? <th className="border border-gray-300 text-center p-2">
              {tabelActions.title}
            </th> : null}
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
                {colors ? <td className="p-2">{colors.colors(d.codeColor)}</td> : null}
                {logos ? <td className="p-2 border border-gray-300">{logos.logos(d.logo)}</td> : null}
                {status ? <td className="text-center pt-2 px-2">{status.statusToggle()}</td> : null}
                {tabelActions ? <td className="border border-gray-300">{tabelActions.icons(d.id)}</td> : null}
              </tr>
            );
          })}
        </tbody>
      </table>




      {pages > 1 ? <div className="p-4 flex justify-center">
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
                <span>{page}</span>
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
      </div> : null}
    </>
  );
};

export default Tabel;
