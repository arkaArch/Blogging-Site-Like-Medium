import axios from "axios";
import { useEffect, useState } from "react"

interface BlogType {
    author: { 
        email: string;
        profile_picture: string
    };
    title: string;
    content: string
    published_at: string
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
