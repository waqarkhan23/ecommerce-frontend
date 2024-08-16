import AdminPanel from "../../components/AdminPanel";
import Layout from "../../layout/Layout";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout title={"Admin"}>
      <div className="grid grid-cols-12">
        <aside className="col-span-2">
          <AdminPanel />
        </aside>
        <main className="col-span-10">
          <Outlet />
        </main>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
