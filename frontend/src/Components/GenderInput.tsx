import { ChangeEventHandler } from "react";

const GenderInput = ({ onChange }: { onChange: ChangeEventHandler<HTMLInputElement> }) => {
    return <div className="flex gap-20">
        <div className="flex gap-2">
            <input type="radio" name="gender" value="male" onChange={onChange} />
            <p>Male</p>
        </div>

        <div className="flex gap-2">
            <input type="radio" name="gender" value="female" onChange={onChange} />
            <p>female</p>
        </div>

    </div>
}

export default GenderInput;