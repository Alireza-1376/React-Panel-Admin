import Modal from "../../components/Modal";
import Icon from "../../layouts/sidebar/Icons";

const ModalProduct = () => {
  return (
    <Modal
    title="افزودن محصول جدید"
    screen={true}
    >
      <form className="text-center space-y-4 mt-4 p-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-center">
            <button className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-24 px-4">
              دسته
            </button>
            <input
              placeholder="انتخاب دسته محصول"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>
          <div className="flex justify-center">
            <div className="flex justify-start gap-1 w-full md:w-5/6 lg:w-3/4 md:pr-[11.5%] lg:pr-[9%]">
              <span className="flex items-center bg-green-200 py-1 px-4 rounded-full">
                <Icon name="xMark" />
                <span>دسته فلان</span>
              </span>
              <span className="flex items-center bg-green-200 py-1 px-4 rounded-full">
                <Icon name="xMark" />
                <span>دسته فلان</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-24 py-2 px-4">
            عنوان
          </button>
          <input
            placeholder="عنوان محصول"
            type="text"
            className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-24 py-2 px-4">
            قیمت
          </button>
          <input
            placeholder="قیمت محصول"
            type="text"
            className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
          />
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-24 py-2 px-4">
            وزن
          </button>
          <input
            placeholder="وزن محصول (کیلوگرم)"
            type="text"
            className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
          />
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-24 py-2 px-4">
            برند
          </button>
          <div className=" w-3/4 flex md:w-1/2 border border-gray-400 bg-white">
            <input
              placeholder="قسمتی از نام برند را انتخاب کنید"
              type="text"
              className="focus:outline-none flex-1 px-2"
            />
            <button className="bg-blue-300/50 border p-2 px-4">+</button>
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <button className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-24 py-2 px-4">
              رنگ
            </button>
            <input
              placeholder="قسمتی از نام رنگ را انتخاب کنید"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-center">
            <button className="bg-blue-300/50 border border-gray-400 py-2 w-1/4 md:w-24 px-4">
              گارانتی
            </button>
            <input
              placeholder="قسمتی از نام گارانتی را وارد کنید"
              type="text"
              className="focus:outline-none p-2 w-3/4 md:w-1/2 border border-gray-400"
            />
          </div>
          <div className="flex justify-center">
            <div className="flex justify-start gap-1 w-full md:w-5/6 lg:w-3/4 md:pr-[11.5%] lg:pr-[9%]">
              <span className="flex items-center bg-green-200 py-1 px-4 rounded-full">
                <Icon name="xMark" />
                <span>گارانتی فلان</span>
              </span>
              <span className="flex items-center bg-green-200 py-1 px-4 rounded-full">
                <Icon name="xMark" />
                <span>گارانتی فلان</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-300/50 border border-gray-400 w-1/4 md:w-24 py-2 px-4">
            توضیحات
          </button>
          <textarea
            placeholder="توضیحات"
            rows={5}
            type="text"
            className="focus:outline-none w-3/4 md:w-1/2 border border-gray-400 p-2"
          ></textarea>
        </div>

        <div>
          <button className="bg-blue-600 text-white px-10 py-2 rounded-md">
            ذخیره
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalProduct;
