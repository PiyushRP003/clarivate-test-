import React, { useEffect, useMemo } from "react";
import './List.scss';

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotoListProps {
  photos: Photo[];
  favorites: Photo[];
  loading: boolean;
  hasMore: boolean;
  onToggleFavorite: (photo: Photo) => void;
  onLoadMore: () => void;
  onBack: () => void;
}

const PhotoList: React.FC<PhotoListProps> = ({
  photos,
  favorites,
  loading,
  hasMore,
  onToggleFavorite,
  onLoadMore,
  onBack
}) => {
  const favoriteIds = useMemo(() => new Set(favorites.map(f => f.id)), [favorites]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        if (!loading && hasMore) {
          onLoadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, onLoadMore]);

  return (
    <div className="photo-list">
      <div className="container">
        <div className="header">
          <button onClick={onBack}>
            <span>Back to Dashboard</span>
          </button>
          <h2>Photo Gallery</h2>
        </div>

        <div className="photo-grid">
          {photos.map(photo => {
            const isFavorite = favoriteIds.has(photo.id);
            return (
              <div key={photo.id} className="photo-card">
                <img src={photo.url} alt={photo.title} />
                <div className="details">
                  <p>ID: {photo.id}</p>
                  <h3>{photo.title}</h3>
                  <button
                    onClick={() => onToggleFavorite(photo)}
                    className={isFavorite ? 'favorite' : 'not-favorite'}
                  >
                    <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {loading && (
          <div className="loader">
            <div className="spinner"></div>
            <p>Loading more photos...</p>
          </div>
        )}

        {!hasMore && photos.length > 0 && (
          <div className="end-message">
            <p>No more photos to load</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoList;
