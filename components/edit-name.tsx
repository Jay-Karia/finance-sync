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

export default function EditName({
  groupId,
  groupName,
}: {
  groupId: string;
  groupName: string;
}) {
  const setGroups = useSetAtom(groupsAtom);
  const [name, setName] = useState(groupName);

  function onSubmit() {
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Name cannot be empty", ERROR_TOAST_STYLE);
      return;
    }
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, name: trimmed } : g))
    );
    toast.success("Group name updated", SUCCESS_TOAST_STYLE);
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
            <DialogTitle>Edit Group Name</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Input
              id="group-name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={groupName}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={onSubmit}>
                Change Name
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
