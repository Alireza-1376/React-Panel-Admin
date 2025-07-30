import Icon from "../layouts/sidebar/Icons";

const Tabel = ({data ,dataInfo ,tabelActions}) => {
  
  return (
    <table className="w-full bg-white shadow-md border border-gray-300">
      <thead className="border border-gray-300 bg-gray-200">
        <tr>
          {dataInfo.map((item ,i) => {
            return (
              <th key={i+1} className="border border-gray-300 text-center p-2">
                {item.value}
              </th>
            );
          })}
          <th className="border border-gray-300 text-center p-2">{tabelActions.title}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => {
          return (
            <tr key={d.id} className="border hover:bg-gray-100 border-gray-300">
                {dataInfo.map((i,index)=>{
                    return (
                        <td key={index+1} className="border border-gray-300 text-center p-2">{d[i.field]}</td>
                    )
                })}
                {tabelActions.icons(d.id)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Tabel;
