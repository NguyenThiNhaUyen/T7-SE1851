import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BlogDetail.css";

const blogs = [
  {
    id: "1",
    title: "Why You Should Donate Blood",
    content: "Donating blood can save lives. Here's why it's important...",
    published_at: "2025-06-03"
  },
  {
    id: "2",
    title: "Blood Donation Tips",
    content: "Stay hydrated, eat well, and relax before donating blood...",
    published_at: "2025-06-01"
  }
];

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const selected = blogs.find((b) => b.id === id);
    setBlog(selected);
  }, [id]);

  if (!blog) return <p>Loading blog...</p>;

  return (
    <div className="blog-detail-wrapper">
      <h2>{blog.title}</h2>
      <p><strong>Published:</strong> {blog.published_at}</p>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
