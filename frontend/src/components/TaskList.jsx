import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted, isLoading }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-2 w-24 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100 border-dashed">
                <div className="text-gray-300 mb-3 text-5xl flex justify-center">📋</div>
                <h3 className="text-xl font-medium text-gray-600 mb-1">No tasks yet</h3>
                <p className="text-gray-400 text-sm">Add a task above to get started!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 animate-fade-in">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDeleted}
                />
            ))}
        </div>
    );
};

export default TaskList;
