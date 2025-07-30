import Modal from "../../components/Modal";



const ModalCategory = () => {
    return (
        
        <Modal 
        title="افزودن دسته محصولات"
        >
            <form className="text-center space-y-4 mt-4 p-4">
                <div className="flex justify-center">
                    <button className="bg-blue-300/50 border border-gray-400 py-2 w-24 px-4">دسته والد</button>
                    <input placeholder="بدون والد" disabled="بدون والد" type="text" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"/>
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-300/50 border border-gray-400 w-24 py-2 px-4">عنوان</button>
                    <input placeholder="عنوان دسته" type="text" className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"/>
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-300/50 border border-gray-400 w-24 py-2 px-4">توضیحات</button>
                    <textarea placeholder="توضیحات" rows={5} type="text" className="focus:outline-none w-3/4 md:w-1/2 border border-gray-400 p-2"></textarea>
                </div>
                <div  className="flex justify-center">
                    <button className="bg-blue-300/50 border border-gray-400 w-24 py-2 px-4">تصویر</button>
                    <input type="file" className=" file:bg-blue-300/50 file:border-0 file:py-[11px] focus:outline-none w-3/4 md:w-1/2 border border-gray-400"/>
                </div>
                <div>
                    <label className="inline-flex items-center mb-5 cursor-pointer">
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 pl-4">وضعیت فعال</span>
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div>
                    <button className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
                </div>
            </form>
        </Modal>
        
    );
}

export default ModalCategory;
