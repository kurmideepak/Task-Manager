import { FaCheckCircle, FaCircle, FaTrash, FaUndo } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../api/axiosConfig';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
    const isCompleted = task.status === 'COMPLETED';

    const handleToggleStatus = async () => {
        const newStatus = isCompleted ? 'PENDING' : 'COMPLETED';
        try {
            const response = await api.put(`/${task.id}`, { ...task, status: newStatus });
            onTaskUpdated(response.data);
            if (newStatus === 'COMPLETED') {
                toast.success('Task marked as completed!');
            }
        } catch (error) {
            console.error('Error updating task', error);
            toast.error('Failed to update task status!');
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/${task.id}`);
            onTaskDeleted(task.id);
            toast.success('Task deleted successfully!');
        } catch (error) {
            console.error('Error deleting task', error);
            toast.error('Failed to delete task!');
        }
    };

    return (
        <div className={`p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${isCompleted ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-100 shadow-sm'}`}>
            
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {task.status}
                    </span>
                    <h3 className={`text-lg font-bold truncate ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                        {task.title}
                    </h3>
                </div>
                {task.description && (
                    <p className={`text-sm mt-2 line-clamp-2 ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                        {task.description}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-none border-gray-100">
                <button
                    onClick={handleToggleStatus}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isCompleted 
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                        : 'bg-green-100 hover:bg-green-200 text-green-700'
                    }`}
                    title={isCompleted ? "Mark as Pending" : "Mark as Completed"}
                >
                    {isCompleted ? <><FaUndo /> Pending</> : <><FaCheckCircle /> Complete</>}
                </button>
                <button
                    onClick={handleDelete}
                    className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Task"
                >
                    <FaTrash size={18} />
                </button>
            </div>
            
        </div>
    );
};

export default TaskItem;
