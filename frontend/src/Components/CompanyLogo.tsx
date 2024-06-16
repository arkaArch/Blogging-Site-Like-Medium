const CompanyLogo = ({ size }: { size: "big" | "medium" }) => {
    if (size === "big")
        return <h1 className="font-extrabold text-3xl tracking-widest text-gray-950">BLOGEE ..</h1>
    else if (size === "medium")
        return <h1 className="font-bold text-xl tracking-wider text-gray-950">BLOGEE ..</h1>
}

export default CompanyLogo;