import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <section className=" mt-8 px-4 sm:px-8 md:px-32 lg:px-64">
        <Outlet />
      </section>
 
    </>
  );
};

export default App;
