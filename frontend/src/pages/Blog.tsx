import { useParams } from "react-router-dom";
import FullBlog from "../Components/FullBlog";
import Navbar from "../Components/Navbar";
import { useSingleBlog } from "../Hooks";
import FullBlogSkeleton from "../Components/FullBlogSkeleton";

const Blog = () => {
    const { id } = useParams();
    console.log(id);

    const { loading, blog } = useSingleBlog({ blog_id: id || "" });

    if (loading) {
        return <div>
            <Navbar create_blog_hidden={false} />
            <FullBlogSkeleton />
        </div>
    }


    if (!blog) {
        return <div>
            "Blogs not found"
        </div>
    }

    return <div>
        <Navbar create_blog_hidden={false} />
        <FullBlog blog={blog} />
    </div>
}


export default Blog;