import { BlogType } from "../Hooks"
import Avatar from "./Avatar";



const FullBlog = ({ blog }: { blog: BlogType }) => {
    return <div className="max-w-5xl px-10 mx-auto mt-10">
        <div className="flex gap-5 items-center pb-5">
            <p><Avatar src={blog.author.profile_picture} size="big" /></p>
            <div>
                <p className="text-sm text-gray-700 pb-1">{blog.author.email}</p>
                <p className="text-xs text-gray-500">{blog.published_at}</p>
            </div>
        </div >

        <p className="text-2xl font-extrabold pb-2">{blog.title}</p>
        <p className="text-lg text-gray-700">{blog.content}</p>
        
    </div>
}

export default FullBlog;