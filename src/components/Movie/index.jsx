import styles from './movie.module.css'
import { TbTrash } from 'react-icons/tb'
import { BsFillCheckCircleFill } from 'react-icons/bs'

export function Movie({ movie, onComplete, onDelete }){
    return(
        <div className={styles.movie}>
            <button className={styles.checkContainer} onClick={()=>onComplete(movie)}>
                {movie.isCompleted ? <BsFillCheckCircleFill /> : <div />}
            </button>

            <p className={movie.isCompleted ? styles.textCompleted : ''}>{movie.name}</p>

            <button className={styles.deleteButton} onClick={()=> onDelete(movie.id)}>
                <TbTrash size={20}/>
            </button>
        </div>
    )
}