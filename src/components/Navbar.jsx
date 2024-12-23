import { appleImg, bagImg, searchImg } from "../utils";
// import { navLists } from "./../constant/index";
const Navbar = () => {
  return (
    <header className="w-full py-5 px-5 flex justify-between items-center sm:px-10 ">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="appleImg" width={18} height={18} />
        <div className="flex flex-1 justify-center max-sm:hidden ">
          {["Store", "Mac", "iPhone", "Support"].map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm text-gray hover:text-white cursor-pointer transition-all"
            >
              {nav}
            </div>
          ))}
        </div>
        <div>
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
