import { Link } from "react-router-dom";

const AuthHeader = ({ type }: { type: "signup" | "signin" }) => {
    return <>
        <h2 className="heading-primary">
            {type === "signup" ? "Create an account" : "Welcome to Blogee"}
        </h2>

        <p className="text-lg">
            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
            {" "}
            <Link to={type === "signup" ? "/signin" : "/signup"} className="underline">
                {type === "signup" ? "Sign up" : "Sign in"}
            </Link></p>
    </>
}

export default AuthHeader;