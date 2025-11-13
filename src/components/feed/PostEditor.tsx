import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

interface PostEditorProps {
  onPublish: (content: string, emoji?: string) => void;
  onAuthRequired: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({ onPublish, onAuthRequired }) => {
  const [content, setContent] = useState('');
  const { isAuthenticated, user } = useAuth();

  const handleClick = () => {
    if (!isAuthenticated) {
      onAuthRequired();
    }
  };

  const handlePublish = () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    if (content.trim()) {
      onPublish(content.trim());
      setContent('');
    }
  };

  const handleButtonAlert = (feature: string) => {
    if (!isAuthenticated) {
      onAuthRequired();
    } else {
      alert(`${feature} - function not implemented`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6 mb-6"
    >
      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
        <button
          onClick={() => handleButtonAlert('Emoji picker')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Add emoji"
        >
          😊
        </button>

        <div className="flex-1" />

        <select 
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
          onClick={handleClick}
        >
          <option>Paragraph</option>
        </select>

        <div className="flex gap-1">
          <button
            onClick={() => handleButtonAlert('Bold')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors font-bold"
            title="Bold"
          >
            B
          </button>
          <button
            onClick={() => handleButtonAlert('Italic')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors italic"
            title="Italic"
          >
            I
          </button>
          <button
            onClick={() => handleButtonAlert('Underline')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors underline"
            title="Underline"
          >
            U
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        <button
          onClick={() => handleButtonAlert('Bullet list')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Bullet list"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <button
          onClick={() => handleButtonAlert('Numbered list')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Numbered list"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          onClick={() => handleButtonAlert('Quote')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Quote"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18" />
          </svg>
        </button>

        <button
          onClick={() => handleButtonAlert('Code snippet')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Code"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>

        <button
          onClick={() => handleButtonAlert('Delete draft')}
          className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
          title="Delete"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Input Area */}
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={handleClick}
          placeholder="How are you feeling today?"
          className="w-full px-4 py-3 border-0 focus:outline-none resize-none text-gray-700"
          rows={3}
        />
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => handleButtonAlert('Attach image')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Image"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          <button
            onClick={() => handleButtonAlert('Attach video')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Video"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>

          <button
            onClick={() => handleButtonAlert('Attach link')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Link"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handlePublish}
            disabled={!content.trim()}
          >
            Publish
          </Button>

          <button
            onClick={handlePublish}
            disabled={!content.trim()}
            className="p-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
