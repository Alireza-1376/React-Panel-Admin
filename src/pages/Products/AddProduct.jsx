import Modal from "../../components/Modal";
import Tabel from "../../components/Tabel";
import Icon from "../../layouts/sidebar/Icons";


const AddProduct = () => {
    return (
        <Modal
            title="افزودن ویژگی به دسته محصول"
            screen={true}
        >
            <form className="text-center space-y-4 mt-4 p-4">
                <div className="flex justify-center">
                    <button className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-32 py-2 px-4">
                        ویژگی اول
                    </button>
                    <div className=" w-3/4 flex md:w-1/2 border border-gray-400 bg-white">
                        <input
                            type="text"
                            className="focus:outline-none flex-1 px-2"
                        />
                        <button className="bg-blue-300/50 border p-2 px-4 w-20">عدد</button>
                    </div>
                </div>
                 <div className="flex justify-center">
                    <button className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-32 py-2 px-4">
                        ویژگی دوم
                    </button>
                    <div className=" w-3/4 flex md:w-1/2 border border-gray-400 bg-white">
                        <input
                            type="text"
                            className="focus:outline-none flex-1 px-2"
                        />
                        <button className="bg-blue-300/50 border p-2 px-4 w-20">کیلو</button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-32 py-2 px-4">
                        ویژگی سوم
                    </button>
                    <div className=" w-3/4 flex md:w-1/2 border border-gray-400 bg-white">
                        <input
                            type="text"
                            className="focus:outline-none flex-1 px-2"
                        />
                        <button className="bg-blue-300/50 border p-2 px-4 w-20">مگاهرتز</button>
                    </div>
                </div>
                <div>
                    <button className="bg-blue-600 text-white px-10 py-2 rounded-md">
                        ذخیره
                    </button>
                </div>
            </form>
        </Modal>

    );
}

export default AddProduct;
