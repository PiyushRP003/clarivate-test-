// export interface Photo {
//   id: number;
//   title: string;
//   thumbnailUrl: string;
// }

import { useState ,useCallback  } from "react";

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface AppState {
  favorites: Photo[];
  photoList: Photo[];
  currentPage: number;
  hasMore: boolean;
  loading: boolean;
  listScrollPosition: number;
}

// Custom hook for localStorage simulation (using memory storage)
export const useAppState = () => {
  const [state, setState] = useState<AppState>({
    favorites: [],
    photoList: [],
    currentPage: 1,
    hasMore: true,
    loading: false,
    listScrollPosition: 0
  });

  const addToFavorites = useCallback((photo: Photo) => {
    setState(prev => ({
      ...prev,
      favorites: [...prev.favorites, photo]
    }));
  }, []);

  const removeFromFavorites = useCallback((photoId: number) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.filter(p => p.id !== photoId)
    }));
  }, []);

  const setPhotoList = useCallback((photos: Photo[]) => {
    setState(prev => ({
      ...prev,
      photoList: photos
    }));
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setState(prev => ({
      ...prev,
      currentPage: page
    }));
  }, []);

  const setHasMore = useCallback((hasMore: boolean) => {
    setState(prev => ({
      ...prev,
      hasMore
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      loading
    }));
  }, []);

  const setScrollPosition = useCallback((position: number) => {
    setState(prev => ({
      ...prev,
      listScrollPosition: position
    }));
  }, []);

  return {
    state,
    addToFavorites,
    removeFromFavorites,
    setPhotoList,
    setCurrentPage,
    setHasMore,
    setLoading,
    setScrollPosition
  };
};