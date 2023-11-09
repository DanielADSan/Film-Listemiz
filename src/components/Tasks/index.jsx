import styles from './tasks.module.css'
import { Movie } from '../Movie'
import {getMovies} from '../../apiMovies'
import { useEffect, useState } from 'react';

export function Tasks({ tasks, onComplete, onDelete, translateText, idioma, cambiarIdioma }){
    
    
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
        getMovies().then((querySnapshot) => {
            const movies = [];
            querySnapshot.forEach((doc) => {
                movies.push({id: doc.id, ...doc.data()});
            });
            setMovies(movies);
        });
    
    },[tasks]);
    const completedTasks = movies.filter(movie=>movie.isCompleted).length
    const tasksQuantity = movies.length;

    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>{translateText(idioma, 'Peliculas agregadas')}</p>
                    <span>{tasksQuantity}</span>
                </div>
                <div>
                    <p className={styles.textGreen}>{translateText(idioma, 'Peliculas vistas')}</p>
                    <span>{completedTasks} de {tasksQuantity}</span>
                </div>
            </header>
            <div className={styles.list}>
                {movies.map(movie=>(
                    <Movie key={movie.id} movie={movie} onComplete={onComplete} onDelete={onDelete}/>
                ))}
            </div>
        </section>
    )
}