import Avatar from "./Avatar"
import CompanyLogo from "./CompanyLogo";
import userLogo from "../assets/user.svg"

const Navbar = () => {
    
    
    return <div className="flex justify-between items-center px-10 py-4 border-b border-2 border-slate-100">
        <div>
            <CompanyLogo size="medium" />
        </div>

        <div>
            <Avatar size="big" src={userLogo}/>
        </div>
    </div>
}

export default Navbar;