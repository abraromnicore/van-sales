import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../client";
import type { Todo } from "../../components/TodosPage";

async function fetchTodos() {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export function useTodosQuery() {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
}
