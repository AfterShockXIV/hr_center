
import AddLayout from "layouts/AddLayout/AddLayout";
import ReportLayout from "layouts/ReportLayout/ReportLayout";
import EditLayout from "layouts/EditLayout/EditLayout";
import EditpositionLayout from "layouts/EditpositionLayout/EditpositionLayout";
import AddpositionLayout from "layouts/AddpositionLayout/AddpositionLayout";

var routes = [
 
  {
    path: "/add_data",
    name: "เพิ่มข้อมูล",
    icon: "nc-icon nc-world-2",
    component: AddLayout,
    layout: "/web",
  },
  {
    path: "/report",
    name: "Report",
    icon: "nc-icon nc-world-2",
    component: ReportLayout,
    layout: "/web",
  },
  {
    path: "/edit",
    name: "แก้ไขข้อมูล",
    icon: "nc-icon nc-world-2",
    component: EditLayout,
    layout: "/web",
  },
  {
    path: "/add_position",
    name: "เพิ่มตำแหน่ง",
    icon: "nc-icon nc-world-2",
    component: AddpositionLayout,
    layout: "/web",
  },
  {
    path: "/edit_position",
    name: "แก้ไขตำแหน่ง",
    icon: "nc-icon nc-world-2",
    component: EditpositionLayout,
    layout: "/web",
  },


];
export default routes;
