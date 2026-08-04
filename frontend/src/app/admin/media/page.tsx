"use client";

import { useState, useEffect } from "react";
import type { MediaAssetDto } from "@/lib/api/cms";
import { cmsApi } from "@/lib/api/cms";
import { AdminActionNotice } from "@/components/admin/AdminActionNotice";
import { Image as ImageIcon, Plus, Trash2, ExternalLink, Eye, Send, Undo2 } from "lucide-react";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaAssetDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFeedback, setActionFeedback] = useState<{
    message: string;
    href?: string;
  } | null>(null);
  const [previewAsset, setPreviewAsset] = useState<MediaAssetDto | null>(null);
  const [showYoutubeModal, setShowYoutubeModal] = useState(false);
  const [youtubeData, setYoutubeData] = useState({
    url: "",
    title: "",
    category: "LECTURE",
    description: "",
  });

  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await cmsApi.getMediaAdmin();
      setMedia(res);
    } catch (error) {
      setActionFeedback({
        message: error instanceof Error ? error.message : "Unable to load media library.",
      });
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMedia();
  }, []);

  const handleAddYouTube = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeData.url) return;
    try {
      const created = await cmsApi.addYouTubeVideo(youtubeData);
      setShowYoutubeModal(false);
      setYoutubeData({ url: "", title: "", category: "LECTURE", description: "" });
      setActionFeedback({
        message: "Video saved as draft. Preview it before publishing.",
        href: undefined,
      });
      setPreviewAsset(created);
      setTimeout(() => setActionFeedback(null), 4000);
      loadMedia();
    } catch {
      setActionFeedback({ message: "Invalid YouTube URL." });
      setTimeout(() => setActionFeedback(null), 5000);
    }
  };

  const publishMedia = async (item: MediaAssetDto) => {
    try {
      const published = await cmsApi.publishMedia(item.id);
      setActionFeedback({ message: "Media published.", href: "/media/youtube-lectures" });
      setTimeout(() => setActionFeedback(null), 4000);
      setPreviewAsset(null);
      setMedia((current) =>
        current.map((asset) => (asset.id === published.id ? published : asset))
      );
    } catch (error) {
      setActionFeedback({
        message: error instanceof Error ? error.message : "Unable to publish media.",
        href: undefined,
      });
      setTimeout(() => setActionFeedback(null), 6000);
    }
  };

  const unpublishMedia = async (item: MediaAssetDto) => {
    try {
      const unpublished = await cmsApi.unpublishMedia(item.id);
      setActionFeedback({ message: "Media unpublished.", href: undefined });
      setTimeout(() => setActionFeedback(null), 4000);
      setMedia((current) =>
        current.map((asset) => (asset.id === unpublished.id ? unpublished : asset))
      );
    } catch (error) {
      setActionFeedback({
        message: error instanceof Error ? error.message : "Unable to unpublish media.",
        href: undefined,
      });
      setTimeout(() => setActionFeedback(null), 6000);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {actionFeedback && (
        <AdminActionNotice
          message={actionFeedback.message}
          href={actionFeedback.href}
          label="View asset"
        />
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl font-bold text-bone-50 uppercase">
            Media Library & YouTube Videos
          </h2>
          <p className="font-sans text-xs text-bone-200 font-medium">
            Manage video embeds, uploaded assets, and gallery images.
          </p>
        </div>
        <button
          onClick={() => setShowYoutubeModal(true)}
          className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 text-xs font-mono uppercase font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add YouTube Video</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-carbon-900 border border-bone-50/15 space-y-3 flex flex-col justify-between shadow-md"
          >
            <div className="space-y-3">
              <div className="h-36 rounded-xl bg-carbon-950 flex items-center justify-center relative overflow-hidden">
                {item.provider === "YOUTUBE" ? (
                  <iframe
                    src={item.url}
                    className="w-full h-full pointer-events-none rounded-xl"
                    title={item.title || "YouTube Preview"}
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-bone-200/40" />
                )}
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-earth-400 font-bold block">
                  {item.provider} • {item.mediaType}
                </span>
                <h3 className="font-serif text-sm font-bold text-bone-50 truncate">
                  {item.title || item.filename}
                </h3>
                <span
                  className={`mt-2 inline-flex px-2 py-1 rounded-full text-[9px] font-mono uppercase font-bold ${
                    item.published
                      ? "bg-moss-500/20 text-moss-400 border border-moss-500/30"
                      : "bg-earth-500/20 text-earth-300 border border-earth-500/30"
                  }`}
                >
                  {item.published ? "Published" : "Draft"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-bone-50/10 text-xs">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-bone-200 hover:text-bone-50 flex items-center space-x-1 font-mono text-[10px]"
              >
                <span>View Asset</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPreviewAsset(item)}
                  className="p-1 text-bone-200 hover:text-bone-50"
                  title="Preview before publishing"
                >
                  <Eye className="w-4 h-4" />
                </button>
                {item.published ? (
                  <button
                    onClick={() => unpublishMedia(item)}
                    className="p-1 text-earth-400 hover:text-earth-300"
                    title="Unpublish"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => publishMedia(item)}
                    className="p-1 text-moss-400 hover:text-moss-300"
                    title="Publish to public site"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={async () => {
                    await cmsApi.deleteMedia(item.id);
                    loadMedia();
                  }}
                  className="p-1 text-earth-400 hover:text-earth-300"
                  title="Delete media"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {media.length === 0 && !loading && (
          <div className="col-span-full py-12 text-center font-mono text-xs text-bone-200/40 uppercase tracking-widest bg-carbon-900 rounded-2xl border border-bone-50/15">
            No media assets cataloged in library.
          </div>
        )}
      </div>

      {showYoutubeModal && (
        <div className="fixed inset-0 bg-carbon-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddYouTube}
            className="bg-carbon-900 border border-bone-50/15 p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl"
          >
            <h3 className="font-serif text-xl font-bold text-bone-50 uppercase">
              Add YouTube Video
            </h3>
            <div className="space-y-3 text-xs">
              <input
                type="url"
                required
                placeholder="YouTube Video URL (e.g. https://www.youtube.com/watch?v=...)"
                value={youtubeData.url}
                onChange={(e) => setYoutubeData({ ...youtubeData, url: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 focus:border-earth-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Video Title"
                value={youtubeData.title}
                onChange={(e) => setYoutubeData({ ...youtubeData, title: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 focus:border-earth-400 focus:outline-none"
              />
              <textarea
                rows={3}
                placeholder="Description / Transcript Summary"
                value={youtubeData.description}
                onChange={(e) => setYoutubeData({ ...youtubeData, description: e.target.value })}
                className="w-full p-3 bg-carbon-950 border border-bone-50/15 rounded-xl text-bone-50 focus:border-earth-400 focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowYoutubeModal(false)}
                className="px-4 py-2 bg-carbon-950 border border-bone-50/15 text-bone-200 text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-earth-600 hover:bg-earth-500 text-bone-50 font-bold text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Embed Video
              </button>
            </div>
          </form>
        </div>
      )}

      {previewAsset && (
        <div className="fixed inset-0 bg-carbon-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-carbon-900 border border-bone-50/15 p-5 sm:p-6 rounded-3xl max-w-4xl w-full space-y-5 shadow-2xl">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-earth-400 font-bold">
                  Public Preview
                </span>
                <h3 className="font-serif text-xl font-bold text-bone-50">
                  {previewAsset.title || previewAsset.filename}
                </h3>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[9px] font-mono uppercase font-bold ${
                  previewAsset.published
                    ? "bg-moss-500/20 text-moss-400 border border-moss-500/30"
                    : "bg-earth-500/20 text-earth-300 border border-earth-500/30"
                }`}
              >
                {previewAsset.published ? "Published" : "Draft Preview"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 aspect-video w-full rounded-xl bg-carbon-950 border border-bone-200/10 overflow-hidden">
                {previewAsset.provider === "YOUTUBE" ? (
                  <iframe
                    src={previewAsset.url}
                    className="w-full h-full"
                    title={previewAsset.title || "YouTube Preview"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-bone-200/40" />
                  </div>
                )}
              </div>
              <div className="lg:col-span-4 space-y-3">
                <span className="font-mono text-xs text-moss-500 font-semibold uppercase tracking-widest">
                  {previewAsset.category || "Media"}
                </span>
                <p className="text-xs text-bone-200/70 leading-relaxed">
                  {previewAsset.caption ||
                    "This is how the media item will appear in the public video archive."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewAsset(null)}
                className="px-4 py-2 bg-carbon-950 border border-bone-50/15 text-bone-200 text-xs font-mono uppercase rounded-xl cursor-pointer"
              >
                Close
              </button>
              {!previewAsset.published && (
                <button
                  onClick={() => publishMedia(previewAsset)}
                  className="px-4 py-2 bg-moss-600 hover:bg-moss-500 text-bone-50 font-bold text-xs font-mono uppercase rounded-xl cursor-pointer inline-flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish To Site</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
