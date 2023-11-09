import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
  } from "firebase/firestore";
  import { db } from './firebase.config';
  
  const moviesCollectionName = "movies";
  
  export const sendMoviesToFirestore = (movie) =>
    addDoc(collection(db, moviesCollectionName), movie);
  
  export const getMovies = () => {
    let q = query(collection(db, moviesCollectionName));

    return getDocs(q);
  }
  
  export const deleteMovieByIdF = async (movieId) => {
    try {
      const movieRef = doc(db, moviesCollectionName, movieId);
      await deleteDoc(movieRef);
    } catch (error) {
      console.error('Error al eliminar la película: ', error);
    }
  }

  export const toggleMovieCompletedByIdF = async (movie) => {
    try {
      const movieRef = doc(db, moviesCollectionName, movie.id); // Utiliza movie.id para obtener el ID del documento
      const movieSnapshot = await getDoc(movieRef);
      if (movieSnapshot.exists()) {
        const currentIsCompleted = movieSnapshot.data().isCompleted;
        const newIsCompleted = !currentIsCompleted;
        await updateDoc(movieRef, { isCompleted: newIsCompleted });
      } else {
        console.error('El documento de la película no existe.');
      }
    } catch (error) {
      console.error('Error al actualizar la película: ', error);
    }
  }
  