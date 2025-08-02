import Modal from '../../components/Modal';

const ModalComments = () => {
    return (
        <Modal
            title="افزودن نظر برای محصول"
            screen={false}
        >
            <form className="text-center space-y-6 mt-4 p-4">
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">متن نظر</button>
                    <textarea type="text" className="focus:outline-none p-2 flex-1 border border-gray-400"></textarea>
                </div>
                
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">برای</button>
                    <input placeholder="قسمتی از نام محصول مورد نظر را وارد کنید" type="text" className="focus:outline-none p-2 flex-1 border border-gray-400" />
                </div>
                



                <div>
                    <button className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
                </div>
            </form>
        </Modal>
    );
}

export default ModalComments;

