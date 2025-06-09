import React from 'react';
import type { Photo } from '../../Interfaces/GlobalTypes';
import './Favorites.scss';

interface FavoritesProps {
  favorites: Photo[];
}

const Favorites: React.FC<FavoritesProps> = ({ favorites }) => {
  return (
    <div className="favorites">
      <h2>Your Favorites ({favorites.length})</h2>

      {favorites.length === 0 ? (
        <div className="empty-state">
          {/* <Grid className="w-16 h-16 text-gray-300 mx-auto mb-4" /> */}
          <p className="primary">No favorites yet</p>
          <p className="secondary">Visit the gallery to add some photos to your favorites!</p>
        </div>
      ) : (
        <div className="photos-grid">
          {favorites.map((photo) => (
            <div key={photo.id} className="photo-card">
              <div className="thumbnail">
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  loading="lazy"
                />
              </div>
              <div className="info">
                <p>ID: {photo.id}</p>
                <h3>{photo.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
