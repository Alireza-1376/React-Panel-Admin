import { configureStore } from "@reduxjs/toolkit";
import reducerUser from "./users/reducerUser"
const store = configureStore({
    reducer : {
        user : reducerUser ,
    }
})
export default store ;