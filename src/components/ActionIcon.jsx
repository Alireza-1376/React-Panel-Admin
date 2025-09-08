import { useNavigate } from "react-router-dom";
import { usePermissions } from "../hooks/usePermissions";
import Icon from "../layouts/sidebar/Icons";

const ActionIcon = ({ name, pTitle, onClick, className }) => {
    const permission = usePermissions(pTitle)
    const navigate = useNavigate()
    return (
        <>
            {permission && <button type="button" onClick={onClick} className={className}>
                <Icon name={name} size={16} />
            </button>}
        </>
    );
}

export default ActionIcon;
