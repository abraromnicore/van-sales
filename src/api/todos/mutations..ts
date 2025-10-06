// src/api/todos/mutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../client";
import type { Todo } from "../../components/TodosPage";

async function addTodo(newTodo: { title: string; completed: boolean }) {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
}

async function updateTodo(updatedTodo: Todo) {
  const res = await fetch(`${API_URL}/todos/${updatedTodo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

async function deleteTodo(id: string) {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return id; // return id so we can remove it from cache if needed
}

export function useAddTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Omit<Todo, "id">>({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo>({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}