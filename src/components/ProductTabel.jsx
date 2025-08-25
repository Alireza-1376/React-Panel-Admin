import { PulseLoader } from "react-spinners";
import Icon from "../layouts/sidebar/Icons";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductTabel = ({url , loading, data, numOfPage, currentPage, setCurrentPage, addFields, setSearchInput, placeholder, title, dataInfo, handleSearchData }) => {
    const [numOfPages, setNumOfPages] = useState([]);
    const pageRange = 2;
    useEffect(() => {
        let newArr = [];
        for (let i = 1; i <= numOfPage; i++) {
            newArr = [...newArr, i]
        }
        setNumOfPages(newArr)
    }, [data])

    let timeout;
    const hanldeSearch = (value) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            handleSearchData(value)
        }, 2000)
    }


    return (
        <>
            <div className="flex justify-between py-4">
                <div className="w-1/2 flex items-center">
                    <button className="bg-blue-300/50 border border-gray-400 py-2 px-4">{title}</button>
                    <input onChange={(e) => { hanldeSearch(e.target.value) }} placeholder={placeholder} type="text" className="focus:outline-none p-2 w-4/5 md:w-1/2 border border-gray-400" />
                </div>
                <Link to={url} className="bg-green-700 text-white p-3 rounded-md cursor-pointer">
                    <Icon name="plus" size={18} />
                </Link>
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

                                {addFields ? addFields.map((item, index) => {
                                    return <th key={index + 1} className="border border-gray-300 text-center p-2">{item.title}</th>
                                }) : null}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d) => {
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
                                                            className="border border-gray-300 text-center "
                                                        >
                                                            {i.elements(d)}
                                                        </td>
                                                    }
                                                </Fragment>
                                            );
                                        })}

                                        {addFields ? addFields.map((item, index) => {
                                            return <td key={index + 1} className="border border-gray-300 text-center">{item.elements(d)}</td>
                                        }) : null}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {numOfPage > 1 ? <div className="p-4 flex justify-center">
                        <ul
                            className="flex items-center border border-slate-300  divide-x-2 bg-white"
                            dir="ltr"
                        >

                            <button
                                disabled={currentPage == 1}
                                onClick={() => {
                                    setCurrentPage((prev) => prev - 1);
                                }}
                                className="p-3 text-blue-500 font-bold cursor-pointer"
                            >
                                <Icon name="chevronLeft" size={14} />
                            </button>

                            {currentPage > pageRange ? (<li
                                className={`p-2 px-4 border border-gray-100 text-blue-500 font-bold cursor-pointer`}
                                onClick={() => {
                                    setCurrentPage(1);
                                }}
                            >
                                <span>1</span>
                            </li>) : null
                            }


                            {numOfPages.map((page) => {
                                return page < currentPage + pageRange && page > currentPage - pageRange ?
                                    (<li
                                        key={page}
                                        className={`p-2 px-4 border border-gray-100 text-blue-500 font-bold cursor-pointer ${page == currentPage ? "bg-gray-300 shadow" : ""}`}
                                        onClick={() => {
                                            setCurrentPage(page);
                                        }}
                                    >
                                        <span>{page}</span>
                                    </li>)
                                    : null
                            })}

                            {currentPage < numOfPage-1 ? (<li
                                className={`p-2 px-4 border border-gray-100 text-blue-500 font-bold cursor-pointer`}
                                onClick={() => {
                                    setCurrentPage(numOfPage);
                                }}
                            >
                                <span>{numOfPage}</span>
                            </li>) : null
                            }

                            <button
                                disabled={currentPage == numOfPage}
                                onClick={() => {
                                    setCurrentPage((prev) => prev + 1);
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
}

export default ProductTabel;
