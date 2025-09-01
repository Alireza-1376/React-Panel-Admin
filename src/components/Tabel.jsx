import { Fragment, useContext, useEffect, useState } from "react";
import Icon from "../layouts/sidebar/Icons";
import { ModalContext } from "../contexts/ModalContext";
import { PulseLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
import PrevPage from "./PrevPage";
import { usePermissions } from "../hooks/usePermissions";



const Tabel = ({ pTitle, prev, loading, numOfData, data, dataInfo, status, addFields, colors, title, placeholder, showAddBtn }) => {
  const { showModal, setShowModal } = useContext(ModalContext)
  const [currtPage, setCurrPage] = useState(1);
  const [dataRows, setDataRows] = useState([]);
  const [pages, setPages] = useState(1);
  const [numOfPages, setNumOfPages] = useState([]);
  const [seatchInput, setSearchInput] = useState("");
  const [newData, setNewData] = useState([]);
  const permission = usePermissions(pTitle);
  const pageRange = 2;


  useEffect(() => {
    let newDataArray = data.filter((item) => {
      return item.title.includes(seatchInput)
    })
    setNewData(newDataArray)
  }, [seatchInput, data])

  useEffect(() => {
    setPages(newData.length / numOfData);
    let newArr = [];
    for (let i = 1; i <= Math.ceil(pages); i++) {
      newArr = [...newArr, i];
    }
    setNumOfPages(newArr);
  }, [pages, numOfData, newData]);

  useEffect(() => {
    if (Math.ceil(pages) != 0 && Math.ceil(pages) < currtPage) {
      setCurrPage((prev) => { return prev - 1 })
    }

    if (data.length / numOfData <= 1) {
      setCurrPage(1)
    }

  }, [data, pages])

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
        {prev == true ? <PrevPage /> : showAddBtn ?
          (
            <>
              {permission && <div onClick={() => { setShowModal(true) }} className="bg-green-700 text-white p-3 rounded-md cursor-pointer">
                <Icon name="plus" size={18} />
              </div>}
            </>
          ) : null}
      </div>



      {loading ? <PulseLoader className="text-center mt-4" size={30} color="purple" /> :
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
                {colors ? <th className="border border-gray-300 text-center p-2">
                  {colors.bgColor}
                </th> : null}
                {addFields ? addFields.map((item, index) => {
                  return <th key={index + 1} className="border border-gray-300 text-center p-2">{item.title}</th>
                }) : null}
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
                        <Fragment key={index + 1}>
                          {i.field ? <td
                            key={index + 1}
                            className="border border-gray-300 text-center p-2"
                          >
                            {d[i.field]}
                          </td> :
                            <td
                              key={index + 1}
                              className="border border-gray-300 text-center"
                            >
                              {i.elements(d)}
                            </td>
                          }
                        </Fragment>
                      );
                    })}
                    {colors ? <td className="p-2">{colors.colors(d.codeColor)}</td> : null}
                    {addFields ? addFields.map((item, index) => {
                      return <td key={index + 1} className="border border-gray-300 text-center">{item.elements(d)}</td>
                    }) : null}
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

              {currtPage > pageRange ?
                <li
                  className={`p-2 px-4 border border-gray-100 text-blue-500 font-bold cursor-pointer ${currtPage == 1 ? "bg-gray-300 shadow" : ""}`}
                  onClick={() => {
                    setCurrPage(1);
                  }}
                >
                  <span>1</span>
                </li>
                : null}

              {numOfPages.map((page) => {
                return page < currtPage + pageRange && page > currtPage - pageRange ?

                  <li
                    key={page}
                    className={`p-2 px-4 border border-gray-100 text-blue-500 font-bold cursor-pointer ${page == currtPage ? "bg-gray-300 shadow" : ""}`}
                    onClick={() => {
                      setCurrPage(page);
                    }}
                  >
                    <span>{page}</span>
                  </li>

                  : null
              })}

              {currtPage < numOfPages.length - 1 ?
                <li
                  className={`p-2 px-4 border border-gray-100 text-blue-500 font-bold cursor-pointer ${currtPage == numOfPages.length ? "bg-gray-300 shadow" : ""}`}
                  onClick={() => {
                    setCurrPage(numOfPages.length);
                  }}
                >
                  <span>{numOfPages.length}</span>
                </li>
                : null}

              <button
                disabled={currtPage == Math.ceil(pages)}
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

      }
    </>
  );
};

export default Tabel;
