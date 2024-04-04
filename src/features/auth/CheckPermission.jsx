import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";
import { PageForbidden } from "../../pages";

const CheckPermission = ({ path, permissions }) => {
  const { role } = useAuth();
  const privileges = role.privileges;
  const foundPrivileges = privileges.find((item) => item.name.toLowerCase() === path);
  let content;
  if (path.toLowerCase() === "settings") {
    content = <Outlet />;
  } else {
    if (privileges.length === 0) {
      content = <PageForbidden />;
    } else {
      content = foundPrivileges[permissions] ? <Outlet /> : <PageForbidden />;
    }
  }
  return content;
};
export default CheckPermission;
