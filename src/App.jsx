import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Tasks } from './components/Tasks'
import {toggleMovieCompletedByIdF, deleteMovieByIdF} from './apiMovies'

const LOCAL_STORAGE_KEY = 'movielist:savedMovies';

function App() {
  const [tasks,setTasks] = useState([]);
  const [idioma, setIdioma] = useState('es'); // Establece el idioma inicial en español
   // Función para cambiar el idioma
   const cambiarIdioma = () => {
    if (idioma === 'es') {
    setIdioma('tr'); // Cambia al idioma turco
    } else {
    setIdioma('es'); // Cambia al idioma español
    }
};
const dictionaryEStoTR = {
  'Agregar una nueva pelicula...': 'Yeni bir film ekleyin...',
  'Peliculas vistas': 'İzlenen filmler',
  'Peliculas agregadas': 'Eklenen filmler',
  'Agregar': 'Ekle',
  'Nuestra lista de Películas': 'Film Listemiz',
};

// Función para traducir una palabra o frase
function translateText(idioma, text) {
  return idioma === 'es' ? text : dictionaryEStoTR[text];
}
  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved){
      setTasks(JSON.parse(saved)); //transforma de volta em array o que foi transformado em string pelo 'stringfy'
    }
  }

  useEffect(()=>{
    loadSavedTasks();
  },[]);

  function setTasksAndSave(newTasks){
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks)) //stringfy transforma o array em uma string;
  }

  function addTask(movieTitle){
    setTasksAndSave([
      ...tasks, // para puxar as tasks quando criar uma nova;
      {
        id: crypto.randomUUID(), // nova função dos novos browsers, que retorna um id aleatorio em string // metodo utilizado para gerar uma id unica em 'deletes' e 'creates'
        title: movieTitle,
        isCompleted: false
      }
    ])
  }


  function toggleMovieCompletedById(movieId){
    toggleMovieCompletedByIdF(movieId);
    console.log(movieId);
    //cargar lista de peliculas
    const newTasks = tasks.map(movie=>{
      if(movie.id === movieId){
        return {
          ...movie,
          isCompleted: !movie.isCompleted
        }
      }
      return movie;
    });
    setTasksAndSave(newTasks);
  }


  function deleteMovieById(movieId){
    
    const newTasks = tasks.filter(movie=>movie.id != movieId);
    deleteMovieByIdF(movieId);
    setTasksAndSave(newTasks);
  }

  return (
      <>
        <Header onAddTask={addTask} 
        translateText={translateText}
        cambiarIdioma={cambiarIdioma}
        idioma={idioma}
        />
        <Tasks
          tasks={tasks}
          onComplete={toggleMovieCompletedById}
          onDelete={deleteMovieById}
          translateText={translateText}
          idioma={idioma}
          cambiarIdioma={cambiarIdioma}
        />
      </>
      
  )
}

export default App