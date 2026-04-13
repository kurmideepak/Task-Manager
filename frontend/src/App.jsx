import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './api/axiosConfig';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { FaTasks } from 'react-icons/fa';

function App() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('');
            // Sort to show pending first, or by newest
            const sortedTasks = response.data.sort((a, b) => b.id - a.id);
            setTasks(sortedTasks);
        } catch (error) {
            console.error('Error fetching tasks', error);
            toast.error('Failed to load tasks. Is the backend running?');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks((prev) => [newTask, ...prev]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks((prev) => prev.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        ));
    };

    const handleTaskDeleted = (deletedTaskId) => {
        setTasks((prev) => prev.filter(task => task.id !== deletedTaskId));
    };

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <header className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4 border-b pb-6 border-gray-200">
                    <div className="bg-blue-600 p-3 rounded-xl text-white shadow-sm">
                        <FaTasks size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Task Manager</h1>
                        <p className="text-gray-500 mt-1">Organize your work effectively</p>
                    </div>
                </header>

                <main>
                    <TaskForm onTaskAdded={handleTaskAdded} />
                    
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-700">Your Tasks</h2>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                        </span>
                    </div>

                    <TaskList 
                        tasks={tasks} 
                        isLoading={isLoading}
                        onTaskUpdated={handleTaskUpdated}
                        onTaskDeleted={handleTaskDeleted}
                    />
                </main>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
}

export default App;
