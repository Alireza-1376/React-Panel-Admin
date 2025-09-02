import Modal from "../../components/Modal";
import Icon from "../../layouts/sidebar/Icons";


const ModalBasket = () => {
    return (
        <Modal
            title="جزئیات و افزودن سبد خرید"
            screen={true}
        >
            <form className="mt-4 p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 justify-around  xl:max-w-screen-xl xl:mx-auto sm:justify-evenly gap-4 border-b pb-4">
                    <input type="text" placeholder="آیدی مشتری" className=" px-4 py-2 rounded shadow focus:outline-none" />
                    <input type="text" placeholder=" محصول" className=" px-4 py-2 rounded shadow focus:outline-none" />
                    <input type="text" placeholder=" رنگ" className=" px-4 py-2 rounded shadow focus:outline-none" />
                    <input type="text" placeholder=" گارانتی" className=" px-4 py-2 rounded shadow focus:outline-none" />
                    <input type="text" placeholder="تعداد" className=" px-4 py-2 rounded shadow focus:outline-none" />
                    <div className="flex justify-center">
                        <button className="bg-green-700 text-white p-2 px-3 rounded-full">
                            <Icon name="check" size={18} />
                        </button>
                    </div>
                </div>
            </form>
            <div className="flex justify-center px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row items-center bg-gray-200 w-full sm:w-[90%] lg:w-[70%] border border-gray-300">
                    <div className="flex-1 gap-1 flex items-center ">
                        <span className="text-red-500 font-bold">
                            <Icon name="xMark" size={16} />
                        </span>
                        <span>
                            محصول شماره 1 (100 هزار تومان)
                        </span>
                        <span>
                            (گارانتی فلان)
                        </span>
                        <span>
                            <div className="w-4 h-4 rounded-full bg-black"></div>
                        </span>
                    </div>
                    <div className="sm:w-28 w-full bg-white text-center sm:p-2">50</div>
                    <div className="w-28 flex justify-center items-center">عدد</div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
            </div>
        </Modal>

    );
}

export default ModalBasket;
