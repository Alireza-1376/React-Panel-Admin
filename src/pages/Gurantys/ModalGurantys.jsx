import Modal from '../../components/Modal';

const ModalGurantys = () => {
    return (
        <Modal 
        title="افزودن گارانتی"
        screen={false}
        >
            <form className="text-center space-y-6 mt-4 p-4">
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-44 px-4">نام گارانتی</button>
                    <input placeholder="" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400"/>
                </div>
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-44 px-4">توضیحات گارانتی</button>
                    <input placeholder="" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400"/>
                </div>
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-44 px-4">مدت گارانتی</button>
                    <input placeholder="به ماه" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400"/>
                </div>
                
                
                <div>
                    <button className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
                </div>
            </form>
        </Modal>
    );
}

export default ModalGurantys;
