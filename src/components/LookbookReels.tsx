import React, { useState, useRef, useEffect } from 'react';
import { CAMPAIGN_VIDEOS, CAMPAIGN_PHOTOS } from '../data/campaign';
import { Play, Pause, Volume2, VolumeX, Sparkles, MapPin, X, Rotate3d, Film, Image as ImageIcon } from 'lucide-react';
import { ThreeJsGarmentViewer } from './ThreeJsGarmentViewer';
import { PRODUCTS } from '../data/products';

export const LookbookReels: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'3d-runway' | '3d-mannequin' | 'photos'>('3d-runway');
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activePhotoTag, setActivePhotoTag] = useState<string>('All');
  const [active3DProductIndex, setActive3DProductIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo = CAMPAIGN_VIDEOS[activeVideoIndex];

  // Garments for 3D Mannequin inspection
  const showcaseProducts = PRODUCTS.slice(0, 6);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [activeVideoIndex]);

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
    <section id="lookbook" className="py-20 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Mode Segmented Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cinematic Fashion Rig & 3D Runway</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-wide uppercase text-neutral-50 mb-3">
              High Definition 3D Runway
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              Experience the central model in slow orbit wearing the featured drop piece, surrounded by natural movement in South African architectural scenes.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900 rounded-2xl border border-neutral-800 self-start md:self-auto">
            <button
              id="mode-3d-runway"
              onClick={() => setActiveMode('3d-runway')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeMode === '3d-runway'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>3D Runway Video</span>
            </button>
            <button
              id="mode-3d-mannequin"
              onClick={() => setActiveMode('3d-mannequin')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeMode === '3d-mannequin'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Rotate3d className="w-3.5 h-3.5" />
              <span>3D Orbit Studio</span>
            </button>
            <button
              id="mode-photos"
              onClick={() => setActiveMode('photos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeMode === 'photos'
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Stills Lookbook</span>
            </button>
          </div>
        </div>

        {/* MODE 1: HIGH QUALITY 3D RUNWAY VIDEOS */}
        {activeMode === '3d-runway' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            {/* Native 9:16 Portrait Editorial Runway Screen (Left) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/16] bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl flex items-center justify-center group">
                <video
                  key={activeVideo.src}
                  ref={videoRef}
                  src={activeVideo.src}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  className="w-full h-full object-cover"
                />

                {/* Video Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Top Details Pill */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                  <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-neutral-700/80 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    HD 3D Runway Cinema
                  </div>

                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-black/70 hover:bg-neutral-800 backdrop-blur-md text-white border border-neutral-700/80 transition-all shadow-md pointer-events-auto"
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                  </button>
                </div>

                {/* Center Play/Pause toggle on hover */}
                <button
                  onClick={togglePlay}
                  className="absolute p-4 rounded-full bg-black/60 hover:bg-amber-400 hover:text-neutral-950 text-white backdrop-blur-md border border-neutral-700 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 z-10"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </button>

                {/* Bottom Video Metadata */}
                <div className="absolute bottom-4 inset-x-4 z-10 pointer-events-none">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3" />
                    {activeVideo.location}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
                    {activeVideo.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Campaign Playlist & Creative Director Notes (Right) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-3xl backdrop-blur-sm">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest block mb-2">
                  Campaign Concept & Vision
                </span>
                <h4 className="text-xl font-bold uppercase text-white font-display mb-3">
                  The Central Stance In Spatial Motion
                </h4>
                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-4">
                  As directed in The LandLords RSA creative brief, these motion studies present garments on a central protagonist with models flowing through the three-dimensional frame. The camera glides around the silhouettes, highlighting seam architecture, drape stiffness, and high-contrast typography.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-neutral-950 text-neutral-300 border border-neutral-800">576 × 1296 Native 9:16</span>
                  <span className="px-2.5 py-1 rounded-md bg-neutral-950 text-neutral-300 border border-neutral-800">480GSM French Terry</span>
                  <span className="px-2.5 py-1 rounded-md bg-neutral-950 text-amber-400 border border-amber-500/20">360 Orbit Camera</span>
                </div>
              </div>

              {/* Playlist items */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono uppercase text-neutral-400 font-bold tracking-wider block px-1">
                  Runway Reels Reel Archive
                </span>
                {CAMPAIGN_VIDEOS.map((video, index) => {
                  const isActive = activeVideoIndex === index;
                  return (
                    <button
                      key={video.id}
                      onClick={() => switchVideo(index)}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between gap-4 transition-all duration-300 ${
                        isActive
                          ? 'bg-neutral-900 border-amber-400/90 shadow-xl shadow-amber-400/5'
                          : 'bg-neutral-950/70 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isActive
                              ? 'bg-amber-400 text-neutral-950'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {isActive && isPlaying ? (
                            <div className="flex items-end gap-0.5 h-3">
                              <span className="w-1 bg-neutral-950 h-3 animate-pulse" />
                              <span className="w-1 bg-neutral-950 h-2 animate-pulse delay-75" />
                              <span className="w-1 bg-neutral-950 h-3 animate-pulse delay-150" />
                            </div>
                          ) : (
                            <span>0{index + 1}</span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-neutral-100 line-clamp-1">
                            {video.title}
                          </h4>
                          <span className="text-xs text-neutral-400 font-light flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            {video.location}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-medium text-neutral-400 shrink-0">
                        {video.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: THREE.JS 3D MANNEQUIN STUDIO */}
        {activeMode === '3d-mannequin' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-8">
              <ThreeJsGarmentViewer product={showcaseProducts[active3DProductIndex]} />
            </div>

            <div className="lg:col-span-4 space-y-3">
              <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-3xl">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest block mb-1">
                  Three.js Mannequin Engine
                </span>
                <h4 className="text-base font-bold uppercase text-white font-display mb-2">
                  Select Piece to Inspect
                </h4>
                <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-light">
                  Click any drop item to map its graphics onto the 3D mannequin. Rotate 360° with click and drag, switch lighting environments, or snap angles.
                </p>

                <div className="space-y-2">
                  {showcaseProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActive3DProductIndex(idx)}
                      className={`w-full p-2.5 rounded-xl border flex items-center gap-3 transition-all text-left ${
                        active3DProductIndex === idx
                          ? 'bg-neutral-800 border-amber-400 shadow-md'
                          : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <img src={p.frontImage} alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-neutral-200 line-clamp-1 block">{p.name}</span>
                        <span className="text-[10px] text-amber-400/90 font-mono">{p.collection}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: STILLS PHOTO GALLERY */}
        {activeMode === 'photos' && (
          <div>
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
              {photoTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActivePhotoTag(tag)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    activePhotoTag === tag
                      ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-md'
                      : 'bg-neutral-900/60 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Photo Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo.src)}
                  className="group relative aspect-[3/4] bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-850 hover:border-neutral-700 transition-all cursor-pointer shadow-lg"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">{photo.tag}</span>
                    <span className="text-xs font-bold text-white uppercase">{photo.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Campaign Large"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </section>
  );
};
