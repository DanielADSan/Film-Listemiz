import logo from '../../assets/logo.png'
import styles from './header.module.css'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useState } from 'react';
import chile from '../../assets/chile.png'
import turquia from '../../assets/turquia.png'
import { sendMoviesToFirestore} from '../../apiMovies';
export function Header({ onAddTask, translateText, idioma, cambiarIdioma }) {
    const [title, setTitle] = useState('');
    const [movies, setMovies] = useState([]);
   
      

    function handleSubmit(event) {
        event.preventDefault();
        onAddTask(title);
        setMovies([...movies, title]);
        const moviesData = {
            name: title,
            isCompleted: false,
          };
        
        sendMoviesToFirestore(moviesData);
        setTitle('');
    }

    function onChangeTitle(event) {
        setTitle(event.target.value); // tudo que for digitado no 'input' vai ser depositado no array do useState
    }

    return (
        <header className={styles.header}>
            <div style={{display:'flex',flexDirection:'column', gap:'.5rem'}}>
                <h1>{translateText(idioma,'Nuestra lista de Películas')}</h1> 
                <button class="button-container" onClick={cambiarIdioma}>
                    <img class="button-img" src={idioma === 'es' ? chile : turquia} />
                </button>
            </div>
            


            <form onSubmit={handleSubmit} className={styles.newTaskForm}>
                <input placeholder={translateText(idioma, 'Agregar una nueva pelicula...')} type='text' value={title} onChange={onChangeTitle} />
                <button>
                    {translateText(idioma, 'Agregar')}
                    <AiOutlinePlusCircle size={20} />
                </button>
            </form>
        </header>
    )
}  