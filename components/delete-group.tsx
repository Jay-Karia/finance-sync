import { useState } from "react";
import { useAtom } from "jotai/react";
import { groupsAtom } from "@/atoms";
import { FaTrash, FaTriangleExclamation } from "react-icons/fa6";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ERROR_TOAST_STYLE, SUCCESS_TOAST_STYLE } from "@/constants";
import { toast } from "sonner";
import { redirect } from "next/navigation";

interface DeleteGroupProps {
  groupName: string;
  groupId: string;
}

export default function DeleteGroup({ groupName, groupId }: DeleteGroupProps) {
  const [, setGroups] = useAtom(groupsAtom);
  const [confirmText, setConfirmText] = useState("");

  function onSubmit() {
    const expected = `I want to delete ${groupName}`;
    if (confirmText !== expected) {
      toast.error(
        `Please type "${expected}" to confirm deletion.`,
        ERROR_TOAST_STYLE
      );
      return;
    }
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    toast.success("Group deleted", SUCCESS_TOAST_STYLE);

    // Redirect to home page
    redirect("/");
  }

  return (
    <Dialog>
      <form onSubmit={onSubmit}>
        <DialogTrigger asChild>
          <button className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <FaTrash className="text-[18px]" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <FaTriangleExclamation className="text-red-600 dark:text-red-400 text-[24px]" />
              </div>
              <DialogTitle>Delete Group</DialogTitle>
            </div>
          </DialogHeader>
          <div className="grid gap-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              This action cannot be undone. To confirm, type:
            </p>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
              I want to delete {groupName}
            </p>
            <Input
              id="confirm-delete"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={`Type exactly: I want to delete ${groupName}`}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-1/2">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white w-1/2"
              onClick={onSubmit}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
