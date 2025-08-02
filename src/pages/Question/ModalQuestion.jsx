import Modal from '../../components/Modal';

const ModalQuestions = () => {
    return (
        <Modal
            title="افزودن سوال"
            screen={false}
        >
            <form className="text-center space-y-6 mt-4 p-4">
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">متن سوال</button>
                    <textarea type="text" className="focus:outline-none p-2 flex-1 border border-gray-400"></textarea>
                </div>
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">گروه</button>

                    <div className="flex-1 flex border border-gray-400 bg-white">
                        <input
                            placeholder="قسمتی از نام گروه را وارد کنید"
                            type="text"
                            className="focus:outline-none flex-1 px-2"
                        />
                        <button className="bg-blue-300/50 border p-2 px-4">+</button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type='button' className="bg-blue-300/50 border border-gray-400 py-2 w-48 px-4">انتخاب سوال</button>
                    <input placeholder="آیدی سوال مورد نظر را وارد کنید" type="text" className="focus:outline-none p-2 flex-1 border border-gray-400" />
                </div>
                



                <div>
                    <button className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
                </div>
            </form>
        </Modal>
    );
}

export default ModalQuestions;

