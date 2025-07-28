import Icon from "../../layouts/sidebar/Icons";
const Table = () => {
    return (
        <table className="w-full bg-white shadow-md border border-gray-300">
            <caption className="my-4">محصولات رو به اتمام</caption>
            <thead className="border border-gray-300 bg-gray-200">
              <tr>
                <th className="border border-gray-300 text-center p-2">#</th>
                <th className="border border-gray-300 text-center p-2">دسته</th>
                <th className="border border-gray-300 text-center p-2">
                  عنوان
                </th>
                <th className="border border-gray-300 text-center p-2">
                  وضعیت
                </th>
                <th className="border border-gray-300 text-center p-2">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-gray-300">
                <td className="border border-gray-300 text-center p-2">1</td>
                <td className="border border-gray-300 text-center p-2">
                  دسته شماره فلان
                </td>
                <td className="border border-gray-300 text-center p-2">
                  محصول فلان
                </td>
                <td className="border border-gray-300 text-center p-2">
                  پایان یافته
                </td>
                <td className="text-red-500 flex justify-center p-3 items-center ">
                  <Icon name="xMark" />
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="border border-gray-300 text-center p-2">1</td>
                <td className="border border-gray-300 text-center p-2">
                  دسته شماره فلان
                </td>
                <td className="border border-gray-300 text-center p-2">
                  محصول فلان
                </td>
                <td className="border border-gray-300 text-center p-2">
                  پایان یافته
                </td>
                <td className="text-red-500 flex justify-center p-3 items-center ">
                  <Icon name="xMark" />
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="border border-gray-300 text-center p-2">1</td>
                <td className="border border-gray-300 text-center p-2">
                  دسته شماره فلان
                </td>
                <td className="border border-gray-300 text-center p-2">
                  محصول فلان
                </td>
                <td className="border border-gray-300 text-center p-2">
                  پایان یافته
                </td>
                <td className="text-red-500 flex justify-center p-3 items-center ">
                  <Icon name="xMark" />
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="border border-gray-300 text-center p-2">1</td>
                <td className="border border-gray-300 text-center p-2">
                  دسته شماره فلان
                </td>
                <td className="border border-gray-300 text-center p-2">
                  محصول فلان
                </td>
                <td className="border border-gray-300 text-center p-2">
                  پایان یافته
                </td>
                <td className="text-red-500 flex justify-center p-3 items-center ">
                  <Icon name="xMark" />
                </td>
              </tr>
              <tr className="border border-gray-300">
                <td className="border border-gray-300 text-center p-2">1</td>
                <td className="border border-gray-300 text-center p-2">
                  دسته شماره فلان
                </td>
                <td className="border border-gray-300 text-center p-2">
                  محصول فلان
                </td>
                <td className="border border-gray-300 text-center p-2">
                  پایان یافته
                </td>
                <td className="text-red-500 flex justify-center p-3 items-center ">
                  <Icon name="xMark" />
                </td>
              </tr>
            </tbody>
          </table>
    );
}

export default Table;
