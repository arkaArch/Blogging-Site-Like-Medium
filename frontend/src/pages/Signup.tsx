import { useState } from "react";
import { SignupInput } from "@arka1313/blog-common";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import Quote from "../Components/Quote";
import CompanyLogo from "../Components/CompanyLogo";
import AuthHeader from "../Components/AuthHeader";
import TnC from "../Components/TermsAndCondition";


const Signup = () => {

    const [signupInputs, setSignupInputs] = useState<SignupInput>({
        email: "",
        password: ""
    });

    return <div className="grid grid-cols-1 lg:grid-cols-2">

        <div className="h-screen flex flex-col gap-56 px-20 py-12">
            <CompanyLogo />

            <div className="flex flex-col gap-8">
                <AuthHeader type="signup" />

                <EmailInput onChange={(e) => {
                    setSignupInputs({
                        ...signupInputs,
                        email: e.target.value
                    })
                }} />
                <PasswordInput onChange={(e) => {
                    setSignupInputs({
                        ...signupInputs,
                        password: e.target.value
                    })
                }} />

                <TnC />

                <button className="flex-initial w-40 btn-primary">Sign up</button>
            </div>
        </div>


        <Quote />
    </div>
}

export default Signup;