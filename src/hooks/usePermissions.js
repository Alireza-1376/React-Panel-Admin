import { useSelector } from "react-redux"

export function usePermissions(pTitle) {
    const state = useSelector(state => state.user.user.roles)
    const roleAdmin =state.findIndex((item)=>item.title.includes("admin")) > -1 ;
    let permissions = []
    for (let role of state) {
        permissions = [...permissions, ...role.permissions]
    }
    return roleAdmin || (typeof(pTitle) === "object" ? renderTitles(permissions , pTitle)
    : permissions.findIndex((item) =>item.title.includes(pTitle)) > -1)

}

function renderTitles(permissions , pTitles){
    for(let pTitle of pTitles){
        if(permissions.findIndex((item)=>item.title.includes(pTitle)) > -1 ) return true
    }
    return false ;
}