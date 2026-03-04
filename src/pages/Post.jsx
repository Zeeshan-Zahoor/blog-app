import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import service from "../appwrite/config";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            })
        } else navigate('/');
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featureImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="w-full py-12 bg-gray-50 min-h-screen">

            <Container>

                {/* Featured Image */}
                <div className="w-full mb-10 relative">
                    <div className="overflow-hidden rounded-xl shadow-md">
                        <img
                            src={appwriteService.getFilePreview(post.featureImage)}
                            alt={post.title}
                            className="w-full max-h-125 object-cover"
                        />
                    </div>

                    {isAuthor && (
                        <div className="absolute top-4 right-4 flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600">
                                    Edit
                                </Button>
                            </Link>

                            <Button
                                bgColor="bg-red-600"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Article */}
                <div className="max-w-3xl mx-auto">

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-gray-800">
                        {parse(post.content)}
                    </div>

                </div>

            </Container>

        </div>
    ) : null

}