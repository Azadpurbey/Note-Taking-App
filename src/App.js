import React, {useState} from 'react'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';


function App() {
  const [showAddTask,setShowAddTask] = useState(false);
  const [tasks, setTasks] =useState(
    [
        {
            id: 1,
            text: "Doctor Appointment",
            day: 'Feb 5th at 2:30pm',
            reminder: true,
        },
        {
            id: 2,
            text: "Grocree work",
            day: 'Feb 5th at 2:30pm',
            reminder: false,
        },
        {
            id: 3,
            text: "Office Appointment",
            day: 'Aug 5th at 2:30pm',
            reminder: true,
        },
        {
            id: 4,
            text: "College Attendence",
            day: 'Aug 5th at 2:30pm',
            reminder: false,
        },
    ]
  )
  const deleteTask= (id)=>{
    setTasks(tasks.filter((task)=>task.id!==id));
  }
  const toggleReminder = (id) => {
    setTasks(tasks.map((task)=>
      task.id===id ? {...task, reminder:!task.reminder}:task))
  }
  const toggleShowAddTask = () => {
    setShowAddTask((prev)=>!prev)
  }
  const addTask= (task)=>{
    const id=Math.floor(Math.random()*10000)+1;
    const new_task={id,...task};
    setTasks([...tasks, new_task]);
  }

  return (
    <div className="container">
      <Header 
        title={"start work"}
        onAdd={toggleShowAddTask}
        showAddTask={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask}/>}
      
      {tasks.length===0 ? "All work is finished" : 
        <Tasks 
          tasks={tasks} 
          onDelete={deleteTask}
          onToggle={toggleReminder}
        />
      }
    </div>
  );
}

export default App;
