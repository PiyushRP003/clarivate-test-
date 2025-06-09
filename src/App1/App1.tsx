import React, { useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "../Components/DashBoard/DashBoard";
import PhotoList from "../Components/PhotoList/List";
import type { Photo, useAppState } from "../Interfaces/GlobalTypes";

interface App1Props {
  appState: ReturnType<typeof useAppState>;
}

const App1: React.FC<App1Props> = ({ appState }) => {
  const {
    state,
    addToFavorites,
    removeFromFavorites,
    setPhotoList,
    setCurrentPage,
    setHasMore,
    setLoading,
  } = appState;

  const navigate = useNavigate();

  const fetchPhotos = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
        );
        const newPhotos: Photo[] = await response.json();

        if (newPhotos.length === 0) {
          setHasMore(false);
        } else {
          setPhotoList(page === 1 ? newPhotos : [...state.photoList, ...newPhotos]);
          setCurrentPage(page + 1);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    },
    [state.photoList, setPhotoList, setCurrentPage, setHasMore, setLoading]
  );

  const handleNavigateToList = useCallback(() => {
    navigate("/list");
    if (state.photoList.length === 0) {
      fetchPhotos(1);
    }
  }, [state.photoList.length, fetchPhotos, navigate]);

  const handleLoadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      fetchPhotos(state.currentPage);
    }
  }, [state.loading, state.hasMore, state.currentPage, fetchPhotos]);

  const handleToggleFavorite = useCallback(
    (photo: Photo) => {
      const isFavorite = state.favorites.some((f) => f.id === photo.id);
      if (isFavorite) {
        removeFromFavorites(photo.id);
      } else {
        addToFavorites(photo);
      }
    },
    [state.favorites, addToFavorites, removeFromFavorites]
  );

  const handleBackToDashboard = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            favorites={state.favorites}
            onNavigateToList={handleNavigateToList}
          />
        }
      />
      <Route
        path="/list"
        element={
          <PhotoList
            photos={state.photoList}
            favorites={state.favorites}
            loading={state.loading}
            hasMore={state.hasMore}
            onToggleFavorite={handleToggleFavorite}
            onLoadMore={handleLoadMore}
            onBack={handleBackToDashboard}
          />
        }
      />
    </Routes>
  );
};

export default App1;
