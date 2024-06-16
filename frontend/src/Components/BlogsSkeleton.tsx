const BlogsSkeleton = () => {
    return <div className="max-w-5xl px-10 mx-auto mt-10">
        <div className="animate-pulse mb-20">
            <div className="flex gap-3 items-center pb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-[240px] h-2 bg-gray-200 rounded-full"></div>
            </div>

            <div className="h-3 bg-gray-200 rounded-full mb-3"></div>
            <div className="max-w-[560px] h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="max-w-[360px] h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
    </div>
}

export default BlogsSkeleton;