import { ReactNode } from "react"
import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    avatar: ReactNode;
    username: string;
    published_date: string;
    title: string;
    content: string;
}

const BlogCard = ({
    id,
    avatar,
    username,
    published_date,
    title,
    content,
}: BlogCardProps) => {

    return <Link to={`/blog/${id}`}>
        <div className="max-w-5xl px-10 mx-auto mt-10 cursor-pointer">
            <div className="flex gap-3 items-center pb-2">
                <p>{avatar}</p>
                <p className="text-sm text-gray-700">{username}</p>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <p className="text-xs text-gray-500">{published_date}</p>
            </div >


            <div className="pb-6">
                <p className="text-xl font-extrabold pb-2">{title}</p>
                <p className="text-sm text-gray-700">
                    {(content.length > 200)
                        ? content.slice(0, 200) + "..."
                        : content}
                </p>
            </div>

            <div className="pb-6">
                <p className="text-xs text-gray-500">{`${Math.ceil(content.split(" ").length / 200)} min read`}</p>
            </div>

            <hr />
        </div>
    </Link>
}

export default BlogCard;