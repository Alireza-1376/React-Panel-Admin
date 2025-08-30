import { configureStore } from "@reduxjs/toolkit";
import reducerRoles from "./roles.js/reducerRoles"
const store = configureStore({
    reducer : {
        roles : reducerRoles ,
    }
})
export default store ;