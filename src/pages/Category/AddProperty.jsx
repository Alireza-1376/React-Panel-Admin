import Modal from "../../components/Modal";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";


const AddProperty = () => {
    return (
        <Modal
            title="افزودن ویژگی به دسته بندی"
            screen={true}
        >
            <form className="mt-4 p-4">
                <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-evenly gap-4 sm:gap-10 border-b pb-4">
                    <input type="text" placeholder="عنوان ویژگی جدید" className="sm:w-1/4 px-4 py-2 rounded shadow focus:outline-none" />
                    <input type="text" placeholder="واحد ویژگی جدید" className="sm:w-1/4 px-4 py-2 rounded shadow focus:outline-none" />
                    <label className="inline-flex flex-row-reverse items-center justify-center cursor-pointer gap-2">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">نمایش در فیلتر</span>
                    </label>
                    <div className="flex justify-center">
                        <button className="bg-green-700 text-white p-2 rounded-full">
                            <Icon name="check" size={18} />
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    <div className="w-1/2 flex items-center mb-4">
                        <button className="bg-blue-300/50 border border-gray-400 py-2 px-4">جستجو</button>
                        <input placeholder="قسمتی از عنوان را وارد کنید" type="text" className="focus:outline-none p-2 w-4/5 md:w-1/2 border border-gray-400" />
                    </div>
                    <table className="w-full bg-white shadow-md border border-gray-300">
                        <thead className="border border-gray-300 bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 text-center p-2">#</th>
                                <th className="border border-gray-300 text-center p-2">عنوان</th>
                                <th className="border border-gray-300 text-center p-2">واحد</th>
                                <th className="border border-gray-300 text-center p-2">نمایش در فیلتر</th>
                                <th className="border border-gray-300 text-center p-2">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-100 border border-gray-300">
                                <td className="border border-gray-300 text-center p-2">1</td>
                                <td className="border hover:bg-gray-100 border-gray-300 text-center">ویژگی شماره 1</td>
                                <td className="border hover:bg-gray-100 border-gray-300 text-center">عدد</td>
                                <td className=" hover:bg-gray-100 border-gray-300 flex items-center justify-center">
                                    <label className="inline-flex flex-row-reverse items-center justify-center cursor-pointer gap-2 p-2">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    </label>
                                </td>
                                <td className="border hover:bg-gray-100 border-gray-300 text-center">
                                    <button onClick={() => {
                                        console.log("alireza")
                                        setEditModal(true)
                                    }} className="text-yellow-500 ml-2">
                                        <Icon name="pen" size={16} />
                                    </button>
                                    <button className="text-red-500">
                                        <Icon name="xMark" size={16} />
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 border border-gray-300">
                                <td className="border border-gray-300 text-center p-2">1</td>
                                <td className="border hover:bg-gray-100 border-gray-300 text-center">ویژگی شماره 1</td>
                                <td className="border hover:bg-gray-100 border-gray-300 text-center">عدد</td>
                                <td className=" hover:bg-gray-100 border-gray-300 flex items-center justify-center">
                                    <label className="inline-flex flex-row-reverse items-center justify-center cursor-pointer gap-2 p-2">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    </label>
                                </td>
                                <td className="border hover:bg-gray-100 border-gray-300 text-center">
                                    <button onClick={() => {
                                        console.log("alireza")
                                        setEditModal(true)
                                    }} className="text-yellow-500 ml-2">
                                        <Icon name="pen" size={16} />
                                    </button>
                                    <button className="text-red-500">
                                        <Icon name="xMark" size={16} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </form>
        </Modal>

    );
}

export default AddProperty;
