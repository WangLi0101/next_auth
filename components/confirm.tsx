"use client";

import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

function ConfirmDialog({
  title,
  desc,
  handlerClose,
}: {
  title: string;
  desc: string;
  handlerClose: (flag: boolean) => void;
}) {
  const [open, setOpen] = useState(true);
  const cancel = () => {
    setOpen(false);
    handlerClose(true);
  };
  const sure = () => {
    setOpen(true);
    handlerClose(false);
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={sure}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface ConfirmProps {
  title: string;
  desc?: string;
}
export function MessageBox({ title, desc }: ConfirmProps): Promise<void> {
  return new Promise((resolve, reject) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const handleClose = (result: boolean) => {
      root.unmount();
      div.remove();
      if (!result) {
        resolve();
      } else {
        reject();
      }
    };

    const root = createRoot(div);
    root.render(
      <ConfirmDialog
        title={title}
        desc={desc || ""}
        handlerClose={handleClose}
      />
    );
  });
}
