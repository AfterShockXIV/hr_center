
import AddLayout from "layouts/AddLayout/AddLayout";
import ReportEmpLayout from "layouts/ReportEmpLayout/ReportEmpLayout";
import ReportsectionLayout from "layouts/ReportsectionLayout/ReportsectionLayout";
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
    path: "/report_emp",
    name: "ข้อมูลพนักงาน",
    icon: "nc-icon nc-world-2",
    component: ReportEmpLayout,
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
    path: "/report_position",
    name: "ตรวจสอบตำแหน่ง",
    icon: "nc-icon nc-world-2",
    component: ReportsectionLayout,
    layout: "/web",
  },


];
export default routes;
