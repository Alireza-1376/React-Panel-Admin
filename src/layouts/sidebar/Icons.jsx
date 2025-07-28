import { IoIosPeople ,IoIosPerson ,IoIosCar } from "react-icons/io";
import {  } from "react-icons/fa6";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { VscDashboard } from "react-icons/vsc";
import { FaBarsStaggered,FaPercent ,FaPalette,FaPagelines ,FaCube ,FaCopyright ,FaShieldHalved,FaBasketShopping } from "react-icons/fa6";
const icons ={
    people : IoIosPeople ,
    person : IoIosPerson ,
    shield :FaShieldHalved ,
    car : IoIosCar ,
    basket :FaBasketShopping ,
    miniShopingCart :HiMiniShoppingCart ,
    bar :FaBarsStaggered ,
    percent :FaPercent ,
    palet :FaPalette ,
    pageLines :FaPagelines ,
    cube : FaCube ,
    copy :FaCopyright ,
    dashboard : VscDashboard ,
}
const Icon = ({name , size}) => {
    const IconComponent =icons[name]
    return (
        <>
        <IconComponent size={size}/>
        </>
    );
}

export default Icon;
