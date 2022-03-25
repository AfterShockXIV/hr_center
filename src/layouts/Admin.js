import React from "react";

import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import EditpositionComponent from "components/EditpositionComponent/EditpositionComponent";
import EditComponent from "components/EditComponent/EditComponent";
var ps;

function Dashboard(props) {
  const [backgroundColor] = React.useState("black");
  const [activeColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />

        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
          <Route
            path={"/web/position_edit/:id_section/:id_department/:id_position"}
            component={EditpositionComponent}
          ></Route>
          <Route
            path={"/web/edit_emp/:hr_run_id"}
            component={EditComponent}
          ></Route>
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
