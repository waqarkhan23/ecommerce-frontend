import { Outlet } from "react-router-dom";
import UserPanel from "../../components/UserPanel";
import Layout from "../../layout/Layout";

const Dashboard = () => {
  return (
    <Layout title={"Dashboard - Wiki Store"}>
      <div className="grid grid-cols-12">
        <aside className="col-span-2">
          <UserPanel />
        </aside>
        <main className="col-span-10 p-2">
          <Outlet />
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;
