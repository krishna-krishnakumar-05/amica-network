import { useState, useEffect } from 'react';
import { postService } from '../lib/api';

interface Post {
  id: string;
  content: string;
  userId: string;
  likes: number;
  createdAt: string;
  updatedAt?: string;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postService.getAllPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string) => {
    try {
      const newPost = await postService.createPost({ content });
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      return newPost;
    } catch (err) {
      setError('Failed to create post');
      throw err;
    }
  };

  const updatePost = async (postId: string, content: string) => {
    try {
      const updatedPost = await postService.updatePost(postId, { content });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? updatedPost : post
        )
      );
      return updatedPost;
    } catch (err) {
      setError('Failed to update post');
      throw err;
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await postService.deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      setError('Failed to delete post');
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};

export default usePosts;
