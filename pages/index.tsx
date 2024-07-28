import { GetServerSideProps } from "next";
import axios from "axios";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await axios.get("https://dummyjson.com/posts");
        const posts: Post[] = response.data.posts;

        return {
            props: {
                posts,
            },
        };
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return {
            props: {
                posts: [],
            },
        };
    }
};

const HomePage = ({ posts }: Props) => {
    if (!Array.isArray(posts)) {
        return <div>No posts available.</div>;
    }

    return (
        <div>
            <h1>My Blog</h1>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p>{post.body.slice(0, 100)}...</p>
                    <p>
                        Likes: {post.reactions.likes}, Dislikes: {post.reactions.dislikes}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
