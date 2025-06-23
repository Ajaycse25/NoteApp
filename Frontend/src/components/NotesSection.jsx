import { FileText, MoreHorizontal, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNote } from "../hook/noteHook";

export function NotesSection({ notes }) {
  const [selectedNote, setSelectedNote] = useState(null); // current note
  const [open, setOpen] = useState(false); // control dialog visibility

  const { deleteNoteMutation } = useNote();

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (!id) return;
    deleteNoteMutation.mutate(id, {
      onSuccess: () => {
        setOpen(false); // Close dialog on success
        setSelectedNote(null);
      },
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Notes</h3>

      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note.noteId}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => handleNoteClick(note)}
          >
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900 font-medium">{note.title}</span>
            </div>

            {/* <MoreHorizontal className="h-4 w-4 text-gray-400" /> */}
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-700"
              className="text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(note.noteId);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Dialog for showing note content */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg space-y-4">
          <DialogHeader className="flex flex-row justify-between items-center">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {selectedNote?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="text-gray-700 whitespace-pre-wrap">
            {selectedNote?.content}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
