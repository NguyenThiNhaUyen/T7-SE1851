import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: "1",
    title: "Why You Should Donate Blood",
    summary: "Donating blood can save lives. Here's why it's important...",
    published_at: "2025-06-03"
  },
  {
    id: "2",
    title: "Blood Donation Tips",
    summary: "Stay hydrated, eat well, and relax before donating blood...",
    published_at: "2025-06-01"
  }
];

const BlogList = () => {
  return (
    <div className="blog-list-wrapper">
      <h2>Blog Posts</h2>
      {blogs.map((b) => (
        <div className="blog-card" key={b.id}>
          <Link to={`/blog/${b.id}`}>
            <h4>{b.title}</h4>
          </Link>
          <p>{b.summary}</p>
          <small>Published on: {b.published_at}</small>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
