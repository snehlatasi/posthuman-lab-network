"use client";

import React, { useState, useEffect } from "react";
import type { MediaAssetDto } from "@/lib/api/cms";
import { cmsApi } from "@/lib/api/cms";
import { Image as ImageIcon, Video, X, Search } from "lucide-react";

interface MediaPickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export const MediaPicker: React.FC<MediaPickerProps> = ({ onSelect, onClose }) => {
  const [assets, setAssets] = useState<MediaAssetDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeTitle, setYoutubeTitle] = useState("");
  const [addingYoutube, setAddingYoutube] = useState(false);
  const [activeTab, setActiveTab] = useState<"library" | "youtube">("library");

  useEffect(() => {
    let isMounted = true;
    cmsApi
      .getMedia()
      .then((res) => {
        if (isMounted) setAssets(res);
      })
      .catch(() => null)
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddYouTube = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) return;
    setAddingYoutube(true);
    try {
      const created = await cmsApi.addYouTubeVideo({ url: youtubeUrl, title: youtubeTitle });
      onSelect(created.url);
    } catch {
      alert("Invalid YouTube URL. Please provide a valid video link.");
    } finally {
      setAddingYoutube(false);
    }
  };

  const filtered = assets.filter((a) =>
    (a.title || a.filename).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-carbon-900 border border-bone-50/15 p-6 sm:p-8 rounded-3xl max-w-3xl w-full space-y-6 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between border-b border-bone-50/10 pb-4 shrink-0">
          <div>
            <h3 className="font-serif text-xl font-bold text-bone-50 uppercase tracking-tight">
              Select Media Asset
            </h3>
            <p className="font-sans text-xs text-bone-200">
              Choose from existing Media Library or embed a YouTube video.
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-bone-200 hover:text-bone-50 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Headers */}
        <div className="flex space-x-3 shrink-0">
          <button
            onClick={() => setActiveTab("library")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
              activeTab === "library"
                ? "bg-earth-600 text-bone-50"
                : "bg-carbon-950 text-bone-200 hover:text-bone-50"
            }`}
          >
            Media Library
          </button>
          <button
            onClick={() => setActiveTab("youtube")}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
              activeTab === "youtube"
                ? "bg-earth-600 text-bone-50"
                : "bg-carbon-950 text-bone-200 hover:text-bone-50"
            }`}
          >
            Paste YouTube URL
          </button>
        </div>

        {/* Tab 1: Library Grid */}
        {activeTab === "library" && (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-bone-200/50" />
              <input
                type="text"
                placeholder="Search media..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-carbon-950 border border-bone-50/15 rounded-xl text-xs text-bone-50 focus:border-earth-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-2">
              {filtered.map((a) => (
                <div
                  key={a.id}
                  onClick={() => onSelect(a.url)}
                  className="group cursor-pointer rounded-2xl bg-carbon-950 border border-bone-50/15 p-3 hover:border-earth-400 transition-all text-center space-y-2"
                >
                  <div className="h-24 bg-carbon-900 rounded-xl flex items-center justify-center overflow-hidden relative">
                    {a.provider === "YOUTUBE" ? (
                      <Video className="w-8 h-8 text-earth-400" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-bone-200/40" />
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-bone-200 truncate block">
                    {a.title || a.filename}
                  </span>
                </div>
              ))}
              {filtered.length === 0 && !loading && (
                <div className="col-span-full py-8 text-center font-mono text-xs text-bone-200/40 uppercase">
                  No media assets found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: YouTube Embed */}
        {activeTab === "youtube" && (
          <form onSubmit={handleAddYouTube} className="space-y-4 flex-1">
            <div className="space-y-2">
              <label className="block text-xs font-mono text-bone-200 font-bold uppercase">
                YouTube Video URL
              </label>
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-xs text-bone-50 focus:border-earth-400 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-mono text-bone-200 font-bold uppercase">
                Video Title (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Masterclass Lecture"
                value={youtubeTitle}
                onChange={(e) => setYoutubeTitle(e.target.value)}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-xs text-bone-50 focus:border-earth-400 focus:outline-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={addingYoutube}
                className="px-6 py-3 bg-earth-600 hover:bg-earth-500 text-bone-50 text-xs font-mono uppercase font-bold rounded-xl cursor-pointer"
              >
                {addingYoutube ? "PARSING YOUTUBE URL..." : "USE YOUTUBE VIDEO"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
