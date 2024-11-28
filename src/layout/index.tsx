// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";

const Layout = ([children]: any) => {
  return (
    <div className="w-screen h-screen relative">
      {/* <Sidebar /> */}
      {/* <Navbar /> */}
      <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-full h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
