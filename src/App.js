import { Route, Switch , Redirect } from 'react-router-dom';
import AdminLayout from './layouts/Admin';
import Login_index from 'layouts/login_index';
function App() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    //ADD
    //Check
    // eslint-disable-next-line react/jsx-pascal-case
    return <Login_index/>;
  }
  return (
    <div className="App">
      <Switch>
      <Route path="/web" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/web/profile" />
      </Switch>
    </div>
  );
}
export default App;
