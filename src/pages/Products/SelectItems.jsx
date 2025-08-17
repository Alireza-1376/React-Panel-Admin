import { ErrorMessage, FastField, Field } from "formik";
import { Fragment, useEffect, useState } from "react"
import { PulseLoader } from "react-spinners";
import Icon from "../../layouts/sidebar/Icons";

const SelectItems = ({ title, selectValue, childeArray, loading, form, formValue }) => {
    const [selectChildren, setSelectChildren] = useState([]);
    const [filteredArray, setFilteredArray] = useState([])
    const [isOpen, setIsOpen] = useState(false);

    function selectChildrenCategory(id, form) {
        if (id != "") {
            const filter = childeArray.filter((item) => {
                return item.id == id;
            })
            setSelectChildren((prev) => {
                if (prev.findIndex((item) => { return item.id == id }) == -1) {
                    const newData = [...prev, filter[0]]
                    const selectId = newData.map((item) => {
                        return item.id;
                    })
                    form(formValue, selectId.join("-"))
                    return newData;
                } else {
                    return [...prev]
                }
            })
        }
    }
    function deleteSelectChildren(id, form) {
        const filter = selectChildren.filter((item) => {
            return item.id != id;
        })
        setSelectChildren(filter);
        const filterId = filter.map((item) => {
            return item.id
        })
        form(formValue, filterId.join("-"))
    }
    useEffect(() => {
        setFilteredArray(childeArray)
    }, [childeArray,selectChildren])
    useEffect(()=>{
        document.querySelector('body').addEventListener("click",()=>{
            setIsOpen(false)
        })
    },[])
    function filterChildArray(value) {
        if(value==""){
            setFilteredArray(childeArray)
        }else{
            const filtered = childeArray.filter((item) => {
            return item.title.includes(value)
        })
        setFilteredArray(filtered)
        }
    }

    return (
        <Fragment>
            {childeArray.length > 0 ?
                <>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-1 justify-center mx-auto w-full">
                            <span className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-28 px-4">
                                {title}
                            </span>
                            <Field name={formValue}>
                                {props => {
                                    return (
                                        <div className="relative w-3/4 md:w-1/2">
                                            <div onClick={(e) => { e.stopPropagation() ;setIsOpen((prev) => !prev) }} className=" bg-white text-start gap-1 flex items-center px-2 h-full text-gray-400">
                                                {selectChildren.length > 0 ?
                                                    <>
                                                        {
                                                            selectChildren.map((item) => {
                                                                return (
                                                                    <span onClick={(e) => { e.stopPropagation() }} key={item.id} className="flex items-center bg-green-200 py-1 px-4 rounded-full">
                                                                        <button className="text-red-500" type="button" onClick={() => { deleteSelectChildren(item.id, form) }}>
                                                                            <Icon name="xMark" />
                                                                        </button>
                                                                        <span className="text-gray-900 text-sm">{item.title}</span>
                                                                    </span>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                    : selectValue}
                                            </div>

                                            {isOpen && <div className={`focus:outline-none p-2 z-10 border shadow-2xl border-gray-400 absolute bg-gray-100 w-full top-11`}>
                                                <input onClick={(e)=>{e.stopPropagation()}} onChange={(e) => { ;filterChildArray(e.target.value) }} className="w-full border-0 outline-none bg-inherit border-b border-gray-300 pb-1" type="text" placeholder="قسمتی از عنوان مورد نظر را وارد کنید" />
                                                {filteredArray.map((item) => {
                                                    return <p onClick={() => { setIsOpen(false); selectChildrenCategory(item.id, form) }} key={item.id} className="w-full mb-0.5 hover:bg-gray-200 cursor-pointer py-1.5 text-start ">{item.title}</p>
                                                })}
                                            </div>}
                                        </div>
                                    )
                                }}
                            </Field>
                        </div>

                        <ErrorMessage name={formValue}>
                            {error => {
                                return <span className="text-sm text-red-500">{error}</span>
                            }}
                        </ErrorMessage>
                    </div>
                </>
                : loading ? <div className="text-center"><PulseLoader size={20} color="purple" /></div> : null}
        </Fragment>
    );
}

export default SelectItems;
