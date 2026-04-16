function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
      
        {/* Page content here */}
        <div className="p-1">{children}</div>
      </div>

      
    </div>
    )
}

export default AuthLayout
