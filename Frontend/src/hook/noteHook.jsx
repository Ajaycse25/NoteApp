// hook/useNote.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNote, getNotes, deleteNote } from "@/services/api";

export const useNote = () => {
  const queryClient = useQueryClient();

  // ✅ 1. useQuery to fetch notes and cache them
  const {
    data: notes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  // ✅ 2. useMutation to create a new note
  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Invalidate cache so it refetches updated notes
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // ✅ 3. useMutation to delete a note
  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      // Invalidate cache so it refetches updated notes
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return {
    notes,
    isLoading,
    isError,
    error,
    createNoteMutation,
    deleteNoteMutation,
  };
};
