import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupInput } from "@arka1313/blog-common";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import GenderInput from "../Components/GenderInput";
import Quote from "../Components/Quote";
import CompanyLogo from "../Components/CompanyLogo";
import AuthHeader from "../Components/AuthHeader";
import TnC from "../Components/TermsAndCondition";
import LoadingButton from "../Components/LoadingButton";


const Signup = () => {

    const [signupInputs, setSignupInputs] = useState<SignupInput>({
        email: "",
        password: "",
        gender: ""
    });

    const [errorMsg, setErrorMessage] = useState("");

    const [loadRequest, setLoadRequest] = useState(false);

    const navigate = useNavigate();

    const sendSignupRequest = async () => {
        setLoadRequest(true);
        try {
            await axios.post("http://localhost:8787/api/v1/user/signup", signupInputs);
            setLoadRequest(false);
            navigate("/blogs");
        } catch (e) {
            setLoadRequest(false);
            setErrorMessage("Please check your input");
        }
    }


    return <div className="grid grid-cols-1 lg:grid-cols-2">

        <div className="h-screen flex flex-col gap-56 px-20 py-12">
            <CompanyLogo />

            <div className="flex flex-col gap-8">
                <AuthHeader type="signup" />

                <EmailInput onChange={(e) => {
                    setSignupInputs({
                        ...signupInputs,
                        email: e.target.value.trim()
                    }),
                        setErrorMessage("");
                }} />
                <PasswordInput onChange={(e) => {
                    setSignupInputs({
                        ...signupInputs,
                        password: e.target.value
                    }),
                        setErrorMessage("");
                }} />

                <GenderInput onChange={(e) => {
                    setSignupInputs({
                        ...signupInputs,
                        gender: e.target.value
                    })
                }}/>

                <p className="text-sm text-left text-red-500">{errorMsg}</p>

                <TnC />

                {loadRequest
                    ? <LoadingButton />
                    : <button onClick={sendSignupRequest} className="flex-initial w-40 btn-primary">Sign up</button>
                }
            </div>
        </div>

        <Quote />
    </div>
}

export default Signup;