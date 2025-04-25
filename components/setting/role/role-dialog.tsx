"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Role } from "./role";
import { useForm } from "react-hook-form";
import { AddRoleSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useEffect, useTransition } from "react";
import { addRole, editRole } from "@/actions/auth/role";
import { CODE } from "@/lib/code";

interface Props {
  isEdit: boolean;
  open: boolean;
  role: Role | null;
  setOpen: (flag: boolean) => void;
  getList: () => void;
}

export const RoleDialog = ({ isEdit, open, setOpen, getList, role }: Props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AddRoleSchema>>({
    resolver: zodResolver(AddRoleSchema),
    defaultValues: {
      roleKey: "",
      name: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (isEdit && role) {
        form.reset({
          roleKey: role.roleKey,
          name: role.name,
        });
      } else {
        form.reset({
          roleKey: "",
          name: "",
        });
      }
    }
  }, [open, isEdit, role, form]);

  const openChange = (flag: boolean) => {
    setOpen(flag);
  };
  const add = async (values: z.infer<typeof AddRoleSchema>) => {
    const res = await addRole(values);
    return res;
  };
  const edit = async (values: z.infer<typeof AddRoleSchema>) => {
    const res = await editRole(values);
    return res;
  };
  const onSubmit = (values: z.infer<typeof AddRoleSchema>) => {
    // TODO: 处理表单提交
    startTransition(async () => {
      const res = isEdit ? await edit(values) : await add(values);
      if (res.code === CODE.SUCCESS) {
        setOpen(false);
        getList();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑" : "新增"}角色</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="roleKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RoleKey</FormLabel>
                  <FormControl>
                    <Input placeholder="RoleKey" {...field} disabled={isEdit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                取消
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                确定
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
