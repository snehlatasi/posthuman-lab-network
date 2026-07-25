"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from "react";
import { blogApi, BlogPost } from "@/lib/api/blog";
import { Plus, Trash2, AlertTriangle } from "lucide-react";

export default function AdminBlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const [showNewModal, setShowNewModal] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", excerpt: "", content: "", author: "Admin Coordinator" });

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  }>({ isOpen: false, title: "", description: "", onConfirm: async () => {} });

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await blogApi.getAllBlogPostsAdmin();
      setBlogPosts(res);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const triggerFeedback = (msg: string) => {
    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="space-y-6 font-sans">
      {actionFeedback && (
        <div className="p-4 rounded-xl bg-moss-500/20 border border-moss-500/30 text-moss-400 text-xs font-mono uppercase font-bold">
          {actionFeedback}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase tracking-tight">
            Blog Articles Catalog
          </h2>
          <p className="font-sans text-xs text-bone-200 font-medium">Manage research essays, news updates, and research diaries.</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 text-xs font-mono uppercase tracking-wider font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Article</span>
        </button>
      </div>

      <div className="bg-carbon-900/90 rounded-2xl overflow-hidden border border-bone-50/15 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead className="bg-carbon-950 border-b border-bone-50/15 font-mono uppercase text-[10px] text-bone-200/60 tracking-widest">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Author</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone-50/5 text-bone-200 font-medium">
              {blogPosts.map((b) => (
                <tr key={b.id} className="hover:bg-carbon-950/40 transition-colors">
                  <td className="p-4 font-semibold text-bone-50">{b.title}</td>
                  <td className="p-4 font-mono text-[10px] text-bone-200/50">{b.slug}</td>
                  <td className="p-4">{b.author || "Admin Coordinator"}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-[9px] font-mono rounded-full uppercase tracking-wider font-bold ${
                      b.status === "PUBLISHED" ? "bg-moss-500/20 text-moss-400 border border-moss-500/30" : "bg-earth-500/20 text-earth-400"
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {b.status === "PUBLISHED" ? (
                      <button
                        onClick={async () => {
                          await blogApi.unpublishBlogPost(b.id);
                          triggerFeedback("Article unpublished.");
                          loadPosts();
                        }}
                        className="px-2.5 py-1 bg-carbon-950 hover:bg-carbon-800 text-bone-200 text-[10px] font-mono rounded-lg uppercase font-bold cursor-pointer border border-bone-50/15"
                      >
                        Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          await blogApi.publishBlogPost(b.id);
                          triggerFeedback("Article published.");
                          loadPosts();
                        }}
                        className="px-2.5 py-1 bg-moss-500/20 hover:bg-moss-500/40 text-moss-400 text-[10px] font-mono rounded-lg uppercase font-bold cursor-pointer border border-moss-500/30"
                      >
                        Publish
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setConfirmModal({
                          isOpen: true,
                          title: "Delete Blog Article",
                          description: `Delete article "${b.title}"?`,
                          onConfirm: async () => {
                            await blogApi.deleteBlogPost(b.id);
                            triggerFeedback("Article deleted.");
                            loadPosts();
                          }
                        });
                      }}
                      className="p-1.5 text-earth-400 hover:text-earth-300 cursor-pointer inline-block"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {blogPosts.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="p-8 text-center font-mono text-xs text-bone-200/40 uppercase tracking-widest">
                    No blog articles cataloged.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Blog Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-carbon-900 border border-bone-50/15 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-xl font-bold text-bone-50 uppercase tracking-tight">Create Blog Article</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Article Title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 focus:border-earth-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Author Name"
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 focus:border-earth-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Short Excerpt"
                value={newBlog.excerpt}
                onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 focus:border-earth-400 focus:outline-none"
              />
              <textarea
                rows={5}
                placeholder="Full Article Content"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 focus:border-earth-400 focus:outline-none resize-none"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 bg-carbon-950 border border-bone-50/15 text-bone-200 text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!newBlog.title) return;
                  const generatedSlug = newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                  await blogApi.createBlogPost({ ...newBlog, slug: generatedSlug, status: "PUBLISHED" });
                  setShowNewModal(false);
                  setNewBlog({ title: "", excerpt: "", content: "", author: "Admin Coordinator" });
                  triggerFeedback("Article published.");
                  loadPosts();
                }}
                className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 font-bold text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Publish Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-carbon-900 border border-bone-50/15 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-earth-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif text-lg font-bold text-bone-50 uppercase">{confirmModal.title}</h3>
            </div>
            <p className="font-sans text-xs text-bone-200 leading-relaxed font-medium">{confirmModal.description}</p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                className="px-4 py-2 bg-carbon-950 border border-bone-50/15 text-bone-200 text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await confirmModal.onConfirm();
                  setConfirmModal({ ...confirmModal, isOpen: false });
                }}
                className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 font-mono text-xs uppercase font-bold rounded-xl cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
