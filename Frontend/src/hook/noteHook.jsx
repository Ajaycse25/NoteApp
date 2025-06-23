import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNote, getNotes, deleteNote } from "@/services/api";
import { toast } from "react-toastify";

export const useNote = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch notes
  const {
    data: notes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    onError: (err) => {
      toast.error(err?.message || "Failed to fetch notes");
    },
  });

  // ✅ Create note
  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success("Note created successfully!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to create note");
    },
  });

  // ✅ Delete note
  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success("Note deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to delete note");
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
