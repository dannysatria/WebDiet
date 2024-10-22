import { Link } from "react-router-dom";
import imgLogo from "../assets/imgLogo.png";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full lg:border-b bg-white shadow-sm z-50">
      <div className="flex items-center justify-between px-3 lg:px-10 xl:px-[6rem]">
        <Link to="/" className="block w-[6rem] lg:w-[7rem] xl:w-[6rem]" href="">
          <img src={imgLogo} alt="logo" />
        </Link>
        <nav className="hidden fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:flex lg:mr-[4rem] lg:bg-transparent">
          <div className="flex items-center gap-20 justify-center m-auto lg:flex-row">
            <a href="" className="text-black">Home</a>
            <a href="" className="text-black">About</a>
            <a href="" className="text-black">More</a>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar