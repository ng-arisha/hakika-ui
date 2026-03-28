import SideNavigation from "@/components/nav/side-nav";
import TopNav from "@/components/nav/top-nav";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <TopNav />
        {/* Page content here */}
        <div className="p-4">{children}</div>
      </div>

      {/* side navigation */}
      <SideNavigation />
    </div>
  );
}

export default HomeLayout;
