import axios from "axios";
import { useEffect, useState } from "react"

export interface BlogType {
    author: {
        email: string;
        profile_picture: string
    };
    id: string;
    title: string;
    content: string
    published_at: string
}

export const useSingleBlog = ({ blog_id }: { blog_id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogType>();

    useEffect(() => {
        axios.get(`http://localhost:8787/api/v1/blog/${blog_id}`, { withCredentials: true })
            .then(res => {
                setBlog(res.data.blog);
                setLoading(false);
            });
    }, [blog_id])

    return { loading, blog }
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8787/api/v1/blog/bulk", { withCredentials: true })
            .then(res => {
                setBlogs(res.data.blogs);
                setLoading(false);
            });
    }, [])

    return { loading, blogs }
}
