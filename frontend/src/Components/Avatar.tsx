const Avatar = ({ size = "small", src }: { size?: "small" | "big", src: string }) => {
    if (size === "small")
        return <img className="w-8 h-8 rounded-full" src={src} alt="avatar"></img>
    else
        return <img className="w-10 h-10 rounded-full" src={src} alt="avatar"></img>
}

export default Avatar;