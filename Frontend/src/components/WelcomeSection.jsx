import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNote } from "@/hook/noteHook";
import { useState } from "react";

export function WelcomeSection({ userName, userEmail }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  
  const [isOpen, setIsOpen] = useState(false); // control dialog

  const { createNoteMutation } = useNote();

  const onSubmit = (data) => {
    createNoteMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setIsOpen(false); // close dialog after successful create
      },
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">
          Welcome, {userName && userName}!
        </h2>
        <p className="text-sm text-gray-600">{userEmail && userEmail}</p>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium">
            Create New
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>

            <Input
              placeholder="Enter title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}

            <Textarea
              placeholder="Enter content"
              {...register("content", { required: "Content is required" })}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}

            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
