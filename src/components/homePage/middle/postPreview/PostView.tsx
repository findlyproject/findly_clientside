"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faBookmark as solidBookmark,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setLikes, setSaved } from "@/lib/store/features/postSlice";
import api from "@/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Comments } from "./Comment";
import ShareMenu from "@/components/common/ShareMenu";
import OutsideClickHandler from "react-outside-click-handler";

dayjs.extend(relativeTime);

interface PostViewProps {
  postId: string;
}

const PostView = ({ postId }: PostViewProps) => {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isShowLikes, setIsShowLikes] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);
  const [isShareMenuVisible, setShareMenuVisible] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.activeuser);
  const savedPosts = useAppSelector((state) => state.post.saved);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/post/post/${postId}`);
        setPost(response.data.onepost);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  const handleLike = async () => {
    const response = await api.post(`/user/likepost/${postId}`);
    dispatch(setLikes(response.data.post));
    setPost(response.data.post);
  };

  const handleSave = async () => {
    const response = await api.post(`/post/user/save/${postId}`);
    dispatch(setSaved(response.data.saved));
  };

  const isSaved = savedPosts.some((item) => item.postId._id === postId);

  const toggleLikes = () => setIsShowLikes((prev) => !prev);

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Post Owner */}
      <div className="flex items-center mb-4">
        <Image
          src={post.owner?.profileImage || "/default-profile.png"}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-3">
          <Link href={`/profile/${post.owner?._id}`} className="font-semibold hover:underline">
            {post.owner?.firstName} {post.owner?.lastName}
          </Link>
          <p className="text-sm text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4">{post.description}</p>

      {/* Post Image */}
      {post.images && post.images.length > 0 && (
        <div className="relative w-full h-80">
          <Image src={post.images[0]} alt="Post Image" layout="fill" objectFit="cover" className="rounded-lg" />
        </div>
      )}

      {/* Video */}
      {post.video && (
        <div className="mt-4">
          <video width="100%" controls className="rounded-lg">
            <source src={post.video} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center mt-4 text-gray-600">
        <button onClick={handleLike} className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faHeart} className="text-red-500" />
          <span onClick={toggleLikes}>{post.likedBy?.length || 0} Likes</span>
        </button>

        <button
          className="flex items-center space-x-2"
          onClick={() => setIsShowComments((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faComment} />
          <span>{post.comments?.length || 0} Comments</span>
        </button>

        <button onClick={handleSave} className="flex items-center space-x-2">
          <FontAwesomeIcon icon={isSaved ? solidBookmark : regularBookmark} />
          <span>Save</span>
        </button>
        <button
          className="flex items-center text-gray-500 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black"
          onClick={() => setShareMenuVisible((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faShare} className="w-5 h-5 mr-2 text-primary" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>
      {isShareMenuVisible && (
        <OutsideClickHandler onOutsideClick={() => setShareMenuVisible(false)}>
          <div className="absolute right-0 bg-white shadow-lg rounded-lg pt-4 pl-4 w-[400px] h-[150px] z-50">
            <ShareMenu url={post.description} isShareMenuVisible={isShareMenuVisible} />
          </div>
        </OutsideClickHandler>
      )}
      {isShowComments && post && post.comments && (
        <Comments postId={post._id} comments={post.comments} />
      )}
      {isShowLikes && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
          onClick={toggleLikes}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm md:max-w-md w-full overflow-hidden"
            onClick={(ev) => ev.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">
              Liked by
            </h2>

            <div className="max-h-60 overflow-y-autospace-y-4">
              {Array.isArray(post.likedBy) && post.likedBy.length > 0 ? (
                post.likedBy.map((item, index) => (
                  <div
                    key={`${item._id}-${index}`}
                    className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg"
                  >
                    <Image
                      src={
                        item.profileImage ||
                        "https://res.cloudinary.com/dq1auwpkm/image/upload/v1738735360/profile_jtwxaj.png"
                      }
                      alt={item.firstName}
                      className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                      width={20}
                      height={20}
                    />
                    <p className="text-gray-700 font-medium">
                      {item.firstName} {item.lastName}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  <h1>No likes yet</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostView;