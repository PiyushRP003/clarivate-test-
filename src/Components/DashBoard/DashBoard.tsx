import React from 'react';
import './Dashboard.scss';
import type { Photo } from '../../Interfaces/GlobalTypes';

interface DashboardProps {
  favorites: Photo[];
  onNavigateToList: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ favorites, onNavigateToList }) => (
  <div className="dashboard">
    <div className="container">
      <h2>Dashboard</h2>

      <div className="grid">
        <div className="card">
          <h3>Quick Actions</h3>
          <button
            onClick={onNavigateToList}
            className="button"
          >
            <span>Go to Photo List</span>
          </button>
        </div>

        <div className="card">
          <h3>
            <span>Favorites ({favorites.length})</span>
          </h3>
          <div className="favorites-list">
            {favorites.length === 0 ? (
              <p className="empty-message">No favorites yet. Add some from the photo list!</p>
            ) : (
              favorites.map(photo => (
                <div key={photo.id} className="favorite-item">
                  <img 
                    src={photo.thumbnailUrl} 
                    alt={photo.title}
                  />
                  <div className="info">
                    <p className="title">{photo.title}</p>
                    <p className="id">ID: {photo.id}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
