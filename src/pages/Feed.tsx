import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Post } from '../types';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../hooks/useModal';
import { PostEditor } from '../components/feed/PostEditor';
import { PostList } from '../components/feed/PostList';
import { AuthModal } from '../components/auth/AuthModal';
import { getFromStorage, setToStorage } from '../utils/storage';
import { sanitizeInput } from '../utils/sanitize';

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Theresa Webb',
    userAvatar: undefined,
    emoji: '😊',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    timestamp: '5 mins ago',
    likes: 0,
    comments: 0
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'John Doe',
    userAvatar: undefined,
    emoji: '🤙',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    timestamp: '5 mins ago',
    likes: 0,
    comments: 0
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Jane Doe',
    userAvatar: undefined,
    emoji: '💀',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    timestamp: '5 mins ago',
    likes: 0,
    comments: 0
  }
];

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = getFromStorage<Post[]>('posts', []);
    return saved.length > 0 ? saved : INITIAL_POSTS;
  });

  const { isAuthenticated, user } = useAuth();
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    setToStorage('posts', posts);
  }, [posts]);

  const handlePublish = (content: string, emoji?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      userId: user?.id || 'anonymous',
      userName: user?.name || 'Anonymous',
      userAvatar: user?.avatar,
      content: sanitizeInput(content),
      emoji,
      timestamp: 'Just now',
      likes: 0,
      comments: 0
    };

    setPosts([newPost, ...posts]);
  };

  const handleInteraction = (action: string) => {
    if (!isAuthenticated) {
      openModal();
    } else {
      alert(`${action} - function not implemented`);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-4 py-8"
      >
        <PostEditor 
          onPublish={handlePublish}
          onAuthRequired={openModal}
        />

        <PostList
          posts={posts}
          onLike={() => handleInteraction('Like')}
          onComment={() => handleInteraction('Comment')}
          onShare={() => handleInteraction('Share')}
        />
      </motion.div>

      <AuthModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};
