import { ChangeEventHandler, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputType {
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput = ({ onChange }: PasswordInputType) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return <div className="flex justify-between gap-3 border-2 border-gray-300 px-2 py-3 max-w-lg">
        <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={onChange}
            className="w-full outline-none"
        />

        {showPassword
            ? <FaEye onClick={toggleShowPassword} className="icon-primary" />
            : <FaEyeSlash onClick={toggleShowPassword} className="icon-primary" />
        }

    </div>
}

export default PasswordInput;