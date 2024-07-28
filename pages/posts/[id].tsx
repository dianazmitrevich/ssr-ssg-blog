import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";

type Post = {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
};

type Props = {
    post: Post;
};

const PostPage = ({ post }: Props) => {
    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>
                Likes: {post.reactions.likes}, Dislikes: {post.reactions.dislikes}
            </p>
            <p>Tags: {post.tags.join(", ")}</p>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await axios.get("https://dummyjson.com/posts");
    const posts: Post[] = response.data.posts;

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const response = await axios.get(`https://dummyjson.com/posts/${params.id}`);
    const post: Post = response.data;

    return {
        props: {
            post,
        },
    };
};

export default PostPage;
