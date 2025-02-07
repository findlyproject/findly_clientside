"use client";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
  link?: string;
  imgUrl?: string;
  videoUrl?: string;
}

const posts: Post[] = [
  {
    id: 1,
    title: "First Post",
    body: "This is the first post content.",
    link: "https://example.com",
    imgUrl: "https://via.placeholder.com/600x300",
  },
  {
    id: 2,
    title: "Second Post",
    body: "Here’s another interesting post.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    title: "Third Post",
    body: "Yet another post with an image.",
    imgUrl: "https://via.placeholder.com/500x250",
  },
];

export function PostBody() {
  const [showImgPreview, setShowImgPreview] = useState(false);

  const toggleShowImgPreview = () => {
    setShowImgPreview(!showImgPreview);
  };

  return (
    <section className="post-body-container">
      {posts.map((post) => (
        <div key={post.id} className="post-body">
          <div className="title">
            <h1>{post.title}</h1>
          </div>
          <div className="post-text">
            <p>{post.body}</p>
          </div>
          <div className="link">
            {post.link && (
              <a href={post.link} target="_blank" rel="noreferrer">
                <span className="the-link">{post.link}</span>
              </a>
            )}
          </div>
          <div className="img-container" onClick={toggleShowImgPreview}>
            {post.imgUrl && <img src={post.imgUrl} alt="Post image" />}
          </div>
          <div className="video-container">
            {post.videoUrl && (
              <video width="100%" height="300" controls>
                <source src={post.videoUrl} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
