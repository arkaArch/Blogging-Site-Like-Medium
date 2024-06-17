import Navbar from "../Components/Navbar";
import axios from "axios";
import { BlogPostInput } from "@arka1313/blog-common";
import { useState } from "react";

const CreateBlog = () => {

    const [blogInputs, setBlogInputs] = useState<BlogPostInput>({
        title: "",
        content: ""
    });

    const [errorMsg, setErrorMessage] = useState("");

    const [loadRequest, setLoadRequest] = useState(false);

    const submitBlogPost = async () => {
        setLoadRequest(true);
        try {
            await axios.post("http://localhost:8787/api/v1/blog", blogInputs);
            setLoadRequest(false);
        } catch (e) {
            setErrorMessage("Can't pubish post, Please check the terms and condition.");
            setLoadRequest(false);
        }
    }

    return <div>
        <Navbar create_blog_hidden={true} />

        <div className="h-screen flex flex-col mt-16">
            <div className="w-8/12 mx-auto">
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => {
                        setBlogInputs({
                            ...blogInputs,
                            title: e.target.value.trim()
                        }),
                            setErrorMessage("");
                    }}
                    className="w-full px-2 py-3 bg-transparent outline-none text-2xl font-normal border rounded-md mb-4"
                />

                <textarea
                    placeholder="Write your post here"
                    onChange={(e) => {
                        setBlogInputs({
                            ...blogInputs,
                            content: e.target.value.trim()
                        }),
                            setErrorMessage("");
                    }}
                    className="w-full h-96 px-2 py-3 bg-gray-100 outline-none text-lg border rounded-md mb-4"
                />

                <p className="text-sm text-left text-red-500 mb-2">{errorMsg}</p>

                {loadRequest
                    ? <button onClick={submitBlogPost} className="w-full max-w-96 bg-gray-700 py-4 text-gray-100 text-lg rounded-lg hover: [cursor:not-allowed]">Submitting ...</button>
                    : <button onClick={submitBlogPost} className="w-full max-w-96 bg-gray-700 py-4 text-gray-100 text-lg rounded-lg">Publish</button>
                }
            </div>
        </div>
    </div>
}

export default CreateBlog;