import Modal from '../../components/Modal';

const ModalBrands = () => {
    return (
        <Modal 
        title="افزودن برند"
        screen={false}
        >
            <form className="text-center space-y-6 mt-4 p-4">
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">عنوان لاتین برند</button>
                    <input placeholder="کیبورد را در حالت لاتین قرار دهید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400"/>
                </div>
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">عنوان فارسی برند</button>
                    <input placeholder="کیبورد را در حالت فارسی قرار دهید" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400"/>
                </div>
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">توضیحات برند</button>
                    <input placeholder="متن کوتاه در مورد برند" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400"/>
                </div>
                <div  className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 w-48 py-2 px-4">تصویر</button>
                    <input type="file" className=" file:bg-blue-300/50 file:border-0 file:py-[11px] focus:outline-none w-[90%] border border-gray-400"/>
                </div>
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">توضیح تصویر</button>
                    <input placeholder="یک کلمه در مورد تصویر" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400"/>
                </div>
                
    
                <div>
                    <button className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
                </div>
            </form>
        </Modal>
    );
}

export default ModalBrands;

