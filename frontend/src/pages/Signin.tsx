import { useState } from "react";
import { SigninInput } from "@arka1313/blog-common";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import Quote from "../Components/Quote";
import CompanyLogo from "../Components/CompanyLogo";
import AuthHeader from "../Components/AuthHeader";
import TnC from "../Components/TermsAndCondition";

const Signin = () => {

    const [signinInputs, setSignupInputs] = useState<SigninInput>({
        email: "",
        password: "",
    })

    return <div className="grid grid-cols-1 lg:grid-cols-2">

        <div className="h-screen flex flex-col gap-56 px-20 py-12">
            <CompanyLogo />

            <div className="flex flex-col gap-8">
                <AuthHeader type="signin" />

                <EmailInput onChange={(e) => {
                    setSignupInputs({
                        ...signinInputs,
                        email: e.target.value
                    })
                }} />
                <PasswordInput onChange={(e) => {
                    setSignupInputs({
                        ...signinInputs,
                        password: e.target.value
                    })
                }} />

                <TnC />

                <button className="flex-initial w-40 btn-primary">Log in</button>
            </div>
        </div>

        <Quote />
    </div>
}

export default Signin;