import { useState } from "react";
import { useSetAtom } from "jotai/react";
import { groupsAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ERROR_TOAST_STYLE, SUCCESS_TOAST_STYLE } from "@/constants";
import { FaPencil } from "react-icons/fa6";
import { toast } from "sonner";
import { Group } from "@/types/group";
import { Label } from "./ui/label";

export default function EditGroup({ group }: { group: Group }) {
  const setGroups = useSetAtom(groupsAtom);
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description || "");

  function onSubmit() {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      toast.error("Name cannot be empty", ERROR_TOAST_STYLE);
      return;
    }

    setGroups((prev) =>
      prev.map((g) =>
        g.id === group.id
          ? { ...g, name: trimmedName, description: trimmedDescription }
          : g
      )
    );
    toast.success("Group updated", SUCCESS_TOAST_STYLE);
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <FaPencil className="text-[18px]" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Label htmlFor="group-name">Name</Label>
            <Input
              id="group-name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={group.name}
            />
            <Label htmlFor="group-name">Description</Label>
            <Input
              id="group-description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={group.description}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={onSubmit}>
                Save Changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
