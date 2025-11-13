import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Post } from '../../types';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onLike, onComment, onShare }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No posts yet. Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div>
      <AnimatePresence>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
