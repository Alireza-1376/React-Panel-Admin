import Modal from '../../components/Modal';

const ModalColors = () => {
    return (
        <Modal 
        title="افزودن رنگ جدید"
        screen={false}
        >
            <form className="text-center space-y-4 mt-4 p-4">
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-24 px-4">نام رنگ</button>
                    <input placeholder="" type="text" className="focus:outline-none p-2 w-[90%] border border-gray-400"/>
                </div>
                <div className="flex items-start flex-col w-[100%]">
                    <label className='pb-2'>انتخاب رنگ :</label>
                    <input type="color" className='w-10 h-10 border border-gray-400 p-0.5 rounded cursor-pointer'/>
                </div>
                
              
                
                <div>
                    <button className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
                </div>
            </form>
        </Modal>
    );
}

export default ModalColors;
