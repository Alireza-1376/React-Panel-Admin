import Modal from "../../components/Modal";
import Icon from "../../layouts/sidebar/Icons";


const ModalOrders = () => {
    return (
        <Modal
            title="افزودن سفارش"
            screen={true}
        >
            <form className="mt-4 p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-around w-full xl:max-w-screen-xl xl:mx-auto sm:justify-evenly gap-4 border-b pb-4">
                    <input type="text" placeholder="انتخاب سبد" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                    <input type="text" placeholder="تاریخ پرداخت" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                    <input type="text" readOnly placeholder="پرداخت 500,000 تومان" className="placeholder:text-gray-500 bg-gray-200 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                    <input type="text" readOnly placeholder="تخفیف 5,000 تومان" className="placeholder:text-gray-500 bg-gray-200 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                    <input type="text" placeholder="کد تخفیف" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                </div>
                <div className="grid grid-cols-1 justify-around w-full xl:max-w-screen-xl xl:mx-auto sm:justify-evenly gap-4 border-b pb-4">
                    <input type="text" placeholder="آدرس کامل" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 justify-around w-full xl:max-w-screen-xl xl:mx-auto sm:justify-evenly gap-4 border-b pb-4">
                    <input type="text" placeholder="نوع ارسال" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                    <input type="text" placeholder="تلفن" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                    <input type="text" placeholder="ایمیل" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                    <input type="text" placeholder="شماره کارت" className="placeholder:text-gray-500 -4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
                    <input type="text" placeholder="نام بانک" className="placeholder:text-gray-500 px-4 py-2 rounded shadow focus:outline-none flex-1 w-full" />
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
                    <div className="sm:w-28 w-full sm:border-l sm:border-r bg-white sm:bg-gray-200 sm:border-gray-300 text-center sm:p-2">50</div>
                    <div className="w-28 flex justify-center items-center">عدد</div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button className="bg-blue-600 text-white px-10 py-2 rounded-md">ذخیره</button>
            </div>
        </Modal>

    );
}

export default ModalOrders;
