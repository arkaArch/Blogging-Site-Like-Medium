const FullBlogSkeleton = () => {
    return <div className="max-w-5xl px-10 mx-auto mt-10">
        <div className="animate-pulse mb-20">
            <div className="flex gap-5 items-center pb-5">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div>
                    <div className="w-[240px] h-2 bg-gray-200 rounded-full mb-1"></div>
                    <div className="w-[200px] h-2 bg-gray-200 rounded-full"></div>
                </div>
            </div>

            <div className="h-4 bg-gray-200 rounded-full mb-4"></div>
            
            <Paragraph />
            <Paragraph />
            <Paragraph />
            <Paragraph />
            <Paragraph />
            
        </div>
    </div>
}

const Paragraph = () => {
    return <div>
        <div className="max-w-[560px] h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="max-w-[500px] h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="max-w-[480px] h-2 bg-gray-200 rounded-full mb-2.5"></div>
    </div>
}

export default FullBlogSkeleton;