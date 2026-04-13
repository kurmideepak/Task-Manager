import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../api/axiosConfig';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            toast.error('Task title is required!');
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('', { title, description });
            onTaskAdded(response.data);
            setTitle('');
            setDescription('');
            toast.success('Task created successfully!');
        } catch (error) {
            console.error('Error creating task', error);
            toast.error('Failed to create task!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 transition-all hover:shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Task</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Task Description (Optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                        disabled={isLoading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaPlus />
                    {isLoading ? 'Adding...' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
