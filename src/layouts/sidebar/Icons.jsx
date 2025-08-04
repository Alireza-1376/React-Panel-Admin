import { IoIosPeople ,IoIosPerson ,IoIosCar } from "react-icons/io";
import { HiMiniShoppingCart ,HiOutlineXMark ,HiChevronDoubleLeft ,HiChevronDoubleRight } from "react-icons/hi2";
import { VscDashboard } from "react-icons/vsc";
import { BiSolidMessageRounded } from "react-icons/bi";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdMarkunread } from "react-icons/md";
import { HiMiniPower } from "react-icons/hi2";
import {FaCircleQuestion , FaCheck, FaBarsStaggered , FaPercent , FaPlus , FaPenToSquare ,FaShareNodes ,FaPalette,FaPagelines ,FaCube ,FaCopyright ,FaShieldHalved,FaBasketShopping ,FaMoneyCheckDollar } from "react-icons/fa6";
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
    dollar :FaMoneyCheckDollar,
    xMark :HiOutlineXMark ,
    share :FaShareNodes,
    pen :FaPenToSquare,
    plus :FaPlus,
    chevronRight :HiChevronDoubleRight ,
    chevronLeft :HiChevronDoubleLeft ,
    check : FaCheck,
    question :FaCircleQuestion,
    message :BiSolidMessageRounded ,
    send :RiSendPlaneFill ,
    message :MdMarkunread ,
    power :HiMiniPower
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
