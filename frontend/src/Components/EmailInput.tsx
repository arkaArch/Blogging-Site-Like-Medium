import { ChangeEventHandler } from "react";

interface EmailInputType {
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const EmailInput = ({ onChange }: EmailInputType) => {
    return <>
        <input
            type="text"
            placeholder="Email"
            onChange={onChange}
            className="max-w-lg px-2 py-3 bg-transparent border-2 border-gray-300 outline-none"
        />
    </>
}

export default EmailInput;