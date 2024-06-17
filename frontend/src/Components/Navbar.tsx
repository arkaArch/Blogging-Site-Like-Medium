import { Link } from "react-router-dom";
import Avatar from "./Avatar"
import CompanyLogo from "./CompanyLogo";
import userLogo from "../assets/user.svg"

const Navbar = ({ create_blog_hidden }: { create_blog_hidden: boolean }) => {

    return <div className="flex justify-between items-center pl-10 pr-5 py-4 border-b border-2 border-slate-100">
        <div>
            <CompanyLogo size="medium" />
        </div>
        <div className="flex gap-6 items-center">
            {create_blog_hidden ? <></> : <div>
                <Link to={"/blog/create"}>
                    <button className="rounded-md text-gray-50 bg-gray-600 px-4 py-2 text-xs font-bold">
                        CREATE YOUR BLOG
                    </button>
                </Link>
            </div>}
            <div>
                <Avatar size="big" src={userLogo} />
            </div>
        </div>
    </div>
}

export default Navbar;