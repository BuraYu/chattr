"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { addChannel } from "@/store/slices/channelSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddChannelModal({ open, onClose }: Props) {
  const [channelName, setChannelName] = useState("");
  const dispatch = useAppDispatch();

  function handleCreate() {
    if (!channelName.trim()) return;
    dispatch(addChannel({ name: channelName.trim() }));
    onClose();
    setChannelName("");
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Channel</DialogTitle>
        </DialogHeader>
        <Input
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Enter channel name"
        />
        <Button onClick={handleCreate}>Create</Button>
      </DialogContent>
    </Dialog>
  );
}
