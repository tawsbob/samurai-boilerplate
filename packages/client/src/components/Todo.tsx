import { useState } from 'react';
import { useCreateTodo, useDeleteTodo, useFindManyTodo, useUpdateTodo } from '@/lib/hooks';

export function TodoList() {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { data: todos = [] } = useFindManyTodo({
    orderBy: { createdAt: 'desc' },
  });

  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    await createTodo.mutateAsync({
      data: {
        title: newTodoTitle,
      },
    });
    setNewTodoTitle('');
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    await updateTodo.mutateAsync({
      where: { id },
      data: { completed },
    });
  };

  const removeTodo = async (id: string) => {
    await deleteTodo.mutateAsync({
      where: { id },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-3 py-2 border rounded"
        />
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => toggleTodo(todo.id, e.target.checked)}
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.title}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="ml-auto text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 