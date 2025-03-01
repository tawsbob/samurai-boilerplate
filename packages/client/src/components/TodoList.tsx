import { useState } from 'react';
import { useCreateTodo, useDeleteTodo, useFindManyTodo, useUpdateTodo } from '../lib/hooks';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

export function TodoList() {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  
  const { data: todos = [], isLoading } = useFindManyTodo({
    orderBy: { createdAt: 'desc' }
  });

  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      await createTodo.mutateAsync({
        data: {
          title: newTodoTitle,
          user: {
            connect: {
              email: 'temp@example.com'
            }
          }
        },
      });
      setNewTodoTitle('');
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await updateTodo.mutateAsync({
        where: { id },
        data: { completed },
      });
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await deleteTodo.mutateAsync({
        where: { id },
      });
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500">Loading todos...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={createTodo.isPending}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {createTodo.isPending ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <button
              onClick={() => toggleTodo(todo.id, !todo.completed)}
              disabled={updateTodo.isPending}
              className={`flex-shrink-0 w-6 h-6 ${
                todo.completed ? 'text-green-500' : 'text-gray-400'
              } ${updateTodo.isPending ? 'opacity-50' : ''}`}
            >
              <CheckCircleIcon />
            </button>
            <span
              className={`flex-1 ${
                todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'
              }`}
            >
              {todo.title}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              disabled={deleteTodo.isPending}
              className={`flex-shrink-0 w-6 h-6 text-red-500 hover:text-red-600 ${
                deleteTodo.isPending ? 'opacity-50' : ''
              }`}
            >
              <TrashIcon />
            </button>
          </div>
        ))}
        {todos.length === 0 && (
          <p className="text-center text-gray-500 py-4">No todos yet. Add one above!</p>
        )}
      </div>
    </div>
  );
} 