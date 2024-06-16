import Avatar from "../Components/Avatar";
import BlogCard from "../Components/BlogCard";
import BlogsSkeleton from "../Components/BlogsSkeleton";
import Navbar from "../Components/Navbar";
import { useBlogs } from "../Hooks";

const Blogs = () => {
    const { loading, blogs } = useBlogs();

    /* This looks dumb !!! */
    const blogsIdentity = [1, 2, 3, 4, 5];

    if (loading) {
        return <div>
            <Navbar />
            {blogsIdentity.map((e, i) => <BlogsSkeleton key={blogsIdentity[i]} />)}
            <BlogsSkeleton />
        </div>
    }

    return <div>
        <Navbar />

        {blogs.map((blog, i) => <BlogCard
            key={`blog ${i}`}
            // Else react will complain about missing the key attribute
            avatar={<Avatar src={blog.author.profile_picture} />}
            username={blog.author.email}
            title={blog.title}
            content={blog.content}
            published_date={blog.published_at}
        />)}
    </div>
}

export default Blogs;