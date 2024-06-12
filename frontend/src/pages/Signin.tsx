import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SigninInput } from "@arka1313/blog-common";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import Quote from "../Components/Quote";
import CompanyLogo from "../Components/CompanyLogo";
import AuthHeader from "../Components/AuthHeader";
import TnC from "../Components/TermsAndCondition";
import LoadingButton from "../Components/LoadingButton";

const Signin = () => {

    const [signinInputs, setSignupInputs] = useState<SigninInput>({
        email: "",
        password: "",
    })

    const [errorMsg, setErrorMessage] = useState("");

    const [loadRequest, setLoadRequest] = useState(false);

    const navigate = useNavigate();

    const sendSigninRequest = async () => {
        setLoadRequest(true);
        try {
            await axios.post("http://localhost:8787/api/v1/user/signin", signinInputs);
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
                <AuthHeader type="signin" />

                <EmailInput onChange={(e) => {
                    setSignupInputs({
                        ...signinInputs,
                        email: e.target.value.trim()
                    }),
                        setErrorMessage("");
                }} />
                <PasswordInput onChange={(e) => {
                    setSignupInputs({
                        ...signinInputs,
                        password: e.target.value
                    }),
                        setErrorMessage("");
                }} />

                <p className="text-sm text-left text-red-500">{errorMsg}</p>

                <TnC />

                {loadRequest
                    ? <LoadingButton />
                    : <button onClick={sendSigninRequest} className="flex-initial w-40 btn-primary">Log in</button>
                }
            </div>
        </div>

        <Quote />
    </div>
}

export default Signin;