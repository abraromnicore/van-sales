// src/api/users/mutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Types
interface User {
  _id: string;
  email: string;
  status: 'active' | 'inactive';
}

interface Driver {
  _id: string;
  driverId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  profilePic: {
    url: string;
  };
  userId: User;
}

interface Loader {
  _id: string;
  loaderId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  profilePic: {
    url: string;
  };
  userId: User;
}

type UserData = Driver | Loader;

// JSON Server API base URL
const API_BASE_URL = 'http://localhost:3000';

// API functions
async function createUser(userData: any, userType: 'driver' | 'loader'): Promise<UserData> {
  const endpoint = userType === 'driver' ? 'drivers' : 'loaders';
  
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function updateUser(id: string, userData: any, userType: 'driver' | 'loader'): Promise<UserData> {
  const endpoint = userType === 'driver' ? 'drivers' : 'loaders';
  
  const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function deleteUser(id: string, userType: 'driver' | 'loader'): Promise<string> {
  const endpoint = userType === 'driver' ? 'drivers' : 'loaders';
  
  const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return id;
}

async function getUsers(userType: 'driver' | 'loader'): Promise<UserData[]> {
  const endpoint = userType === 'driver' ? 'drivers' : 'loaders';
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch existing users');
  }
  
  return response.json();
}

// Helper function to generate next ID
export const getNextId = async (userType: 'driver' | 'loader'): Promise<string> => {
  try {
    const users = await getUsers(userType);
    const nextId = users.length > 0 ? (parseInt(users[users.length - 1]._id) + 1).toString() : '1';
    return nextId;
  } catch (error) {
    console.error('Error getting next ID:', error);
    return Date.now().toString();
  }
};

// Mutation hooks
export function useCreateUserMutation(userType: 'driver' | 'loader') {
  const queryClient = useQueryClient();

  return useMutation<UserData, Error, any>({
    mutationFn: (userData) => createUser(userData, userType),
    onSuccess: () => {
      // Invalidate and refetch user lists
      queryClient.invalidateQueries({ queryKey: ['users', userType] });
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['loaders'] });
    },
  });
}

export function useUpdateUserMutation(userType: 'driver' | 'loader') {
  const queryClient = useQueryClient();

  return useMutation<UserData, Error, { id: string; userData: any }>({
    mutationFn: ({ id, userData }) => updateUser(id, userData, userType),
    onSuccess: () => {
      // Invalidate and refetch user lists
      queryClient.invalidateQueries({ queryKey: ['users', userType] });
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['loaders'] });
    },
  });
}

export function useDeleteUserMutation(userType: 'driver' | 'loader') {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: (id) => deleteUser(id, userType),
    onSuccess: () => {
      // Invalidate and refetch user lists
      queryClient.invalidateQueries({ queryKey: ['users', userType] });
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['loaders'] });
    },
  });
}