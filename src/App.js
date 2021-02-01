import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [showAddTask,setShowAddTask] = useState(false);
  const [tasks, setTasks] =useState([]);

  useEffect(()=>{
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks();

  },[])

  // Fetch Tasks
  const fetchTasks = async () =>{
    const res=await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  // Fetch Task
  const fetchTask = async (id) =>{
    const res=await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  const deleteTask= async(id)=>{
    await fetch (`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })
    setTasks(tasks.filter((task)=>task.id!==id));
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, 
      reminder:!taskToToggle.reminder}

      const res = await fetch (`http://localhost:5000/tasks/${id}`,{
        method:'PUT',
        headers:{
          'Content-type':'application/json',
        },
        body: JSON.stringify(updTask),
      })

      const data =await res.json();       

      setTasks(tasks.map((task)=>
        task.id===id ? {...task, reminder:data.reminder}:task))
  }

  const toggleShowAddTask = () => {
    setShowAddTask((prev)=>!prev);
  }

  const addTask= async (task)=>{
    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(task),
    })
    const data=await res.json();
    setTasks([...tasks,data])

    // const id=Math.floor(Math.random()*10000)+1;
    // const new_task={id,...task};
    // setTasks([...tasks, new_task]);
  }

  return (
    <Router>
      <div className="container">
        <Header 
          title={"Task Tracker"}
          onAdd={toggleShowAddTask}
          showAddTask={showAddTask}
        />
        
        <Route path='/' exact render={()=>(
          <div>
            {showAddTask && <AddTask onAdd={addTask}/>}
        
            {tasks.length===0 ? "All work is finished" : 
              <Tasks 
                tasks={tasks} 
                onDelete={deleteTask}
                onToggle={toggleReminder}
              />
            }

          </div>
        )

        }/>
        
        <Route path='/about' component={About}/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
