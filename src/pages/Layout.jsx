import { BsFolder, BsGrid1X2 } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { token_decode } from "../utils/index";

const Layout = () => {
  // const userInfo = token_decode(localStorage.getItem("canva_token"));

  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const [show, setShow] = useState(false);

  const create = () => {
    navigate("/design/create", {
      state: {
        type: "create",
        width: 600,
        height: 450,
      },
    });
  };

  // const logout = () => {
  // localStorage.removeItem("canva_token");
  //   window.location.href = "/";
  // };

  return (
    <div className="bg-[#18191b] min-h-screen w-full">
      <div className="bg-[#252627] shadow-md fixed left-0 top-0 w-full z-20">
        <div className="w-[98%] m-auto py-3">
          <div className="flex items-center justify-between">
            <div className="w-[80px] h-[48px]">
              <img
                className="w-full h-full"
                src="https://static.canva.com/web/images/12487a1e0770d29351bd4ce4f87ec8fe.svg"
                alt=""
              />
            </div>
            <div className="relative flex items-center justify-center gap-4">
              <button
                onClick={create}
                className="py-2 px-6 overflow-hidden text-center bg-[#8b3dff] text-white rounded-[3px] font-medium hover:bg-[#9553f8]"
              >
                Create a Design
              </button>
              {/* <div onClick={() => setShow(!show)} className='cursor-pointer'>
                                <img src={userInfo?.image ? userImage?.image : userImage} className='w-[45px] h-[45px] rounded-full' alt="prfile" />
                            </div> */}
              {/* <div className={`absolute top-[60px] right-0 w-[250px] bg-[#313030] p-3 border border-gray-700 transition duration-500 ${show ? 'visible opacity-100' : 'invisible opacity-30'}`}>
                                <div className='flex items-center justify-start gap-5 px-2 py-2'>
                                    <img src={userInfo?.image ? userImage?.image : userImage} className='w-[40px] h-[40px] rounded-full' alt="prfile" />
                                    <div className='flex flex-col items-start justify-center'>
                                        <span className='text-[#e0dddd] font-bold text-md'>{userInfo?.name}</span>
                                        <span className='text-[#c4c0c0] font-bold text-md'>{userInfo?.email}</span>
                                    </div>
                                </div>
                                <ul className='text-[#e0dddd] font-semibold'>
                                    <li>
                                        <Link className='p-2'>
                                            <span>Setting</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <div onClick={logout} className='p-2 cursor-pointer'>
                                            <span>Logout</span>
                                        </div>
                                    </li>
                                </ul>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full mt-16">
        <div className="sidebar w-[300px] p-5 h-[calc(100vh-70px)] fixed">
          {/* <div className="flex items-center justify-start gap-5 px-2 py-2 mb-3">
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={userInfo?.image ? userImage?.image : userImage}
              alt="image"
            />
            <div className="flex flex-col items-start justify-center">
              <span className="text-[#e0dddd] font-bold text-md">
                {userInfo?.name}
              </span>
              <span className="text-[#c4c0c0] text-sm">Free</span>
            </div>
          </div> */}
          <ul className="flex flex-col gap-2 px-4 mt-4">
            <li>
              <Link
                to="/"
                className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${
                  pathname === "/" ? "bg-[#ffffff26]" : ""
                } rounded-[4px]`}
              >
                <span className="text-xl">
                  <FaHome />
                </span>
                <span className="font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${
                  pathname === "/projects" ? "bg-[#ffffff26]" : ""
                } rounded-[4px]`}
              >
                <span className="text-xl">
                  <BsFolder />
                </span>
                <span className="font-medium">Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="/templates"
                className={`text-[#e0dddd] px-2 py-2 flex justify-start items-center gap-2 ${
                  pathname === "/templates" ? "bg-[#ffffff26]" : ""
                } rounded-[4px]`}
              >
                <span className="text-xl">
                  <BsGrid1X2 />
                </span>
                <span className="font-medium">Templates</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-[300px] w-[calc(100%-300px)]">
          <div className="py-4 pr-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
