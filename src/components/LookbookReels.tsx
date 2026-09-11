import React, { useState, useRef } from 'react';
import { CAMPAIGN_VIDEOS, CAMPAIGN_PHOTOS } from '../data/campaign';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, MapPin, X } from 'lucide-react';

export const LookbookReels: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activePhotoTag, setActivePhotoTag] = useState<string>('All');
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = CAMPAIGN_VIDEOS[activeVideoIndex];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const switchVideo = (index: number) => {
    setActiveVideoIndex(index);
    setIsPlaying(true);
  };

  const photoTags = ['All', 'Lookbook', 'Editorial', 'Campaign', 'Street Style'];
  const filteredPhotos = activePhotoTag === 'All'
    ? CAMPAIGN_PHOTOS
    : CAMPAIGN_PHOTOS.filter(p => p.tag === activePhotoTag);

  return (
    <section id="lookbook" className="py-20 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Editorial Archives & Video Film</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-wide uppercase text-neutral-50 mb-4">
            Movement, Sound & Stance
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            The LandLords RSA editorial campaign captures the raw energy, rhythm, and structural drape of the garments in motion across South African cityscapes.
          </p>
        </div>

        {/* Video Cinema Player Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Main Reel Cinema Screen */}
          <div className="lg:col-span-2 relative aspect-video bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl flex items-center justify-center group">
            <video
              key={activeVideo.src}
              ref={videoRef}
              src={activeVideo.src}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover object-center"
            />

            {/* Video Meta Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/30 pointer-events-none" />

            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 text-[11px] font-semibold text-neutral-300">
                <MapPin className="w-3 h-3 text-amber-400" />
                {activeVideo.location}
              </span>
            </div>

            {/* Controls Bar */}
            <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 p-3 rounded-2xl">
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-100">
                  {activeVideo.title}
                </h4>
                <span className="text-[11px] text-amber-400 font-mono">
                  Runtime: {activeVideo.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="video-play-pause-btn"
                  onClick={togglePlay}
                  className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-400 fill-amber-400" />}
                </button>

                <button
                  id="video-mute-toggle-btn"
                  onClick={toggleMute}
                  className="p-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>
            </div>
          </div>

          {/* Playlist selector */}
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 pb-1 border-b border-neutral-850">
              Campaign Film Reels ({CAMPAIGN_VIDEOS.length})
            </div>
            <div className="space-y-2.5 overflow-y-auto max-h-[440px] pr-1">
              {CAMPAIGN_VIDEOS.map((vid, idx) => (
                <button
                  key={vid.id}
                  onClick={() => switchVideo(idx)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    activeVideoIndex === idx
                      ? 'bg-neutral-850 border-amber-400 ring-1 ring-amber-400/50'
                      : 'bg-neutral-900/60 border-neutral-800 hover:bg-neutral-850 hover:border-neutral-750'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-amber-400">
                        REEL 0{idx + 1}
                      </span>
                      {activeVideoIndex === idx && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                      {vid.title}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      {vid.location}
                    </div>
                  </div>

                  <span className="p-2 rounded-lg bg-neutral-900 text-neutral-400">
                    <Play className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial Photo Gallery */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                Visual Lookbook
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-neutral-100">
                Studio & Runway Stills
              </h3>
            </div>

            {/* Tag Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {photoTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActivePhotoTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    activePhotoTag === tag
                      ? 'bg-amber-400 text-neutral-950 shadow-md'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo.src)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition-all shadow-md hover:shadow-xl hover:shadow-black"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-400 block">
                      {photo.tag}
                    </span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider line-clamp-1">
                      {photo.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Editorial preview"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </section>
  );
};
