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
import { Tag } from "./tag";
import { useForm } from "react-hook-form";
import { TagSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useEffect, useTransition } from "react";
import { addTag, updateTag } from "@/actions/tag";
import { CODE } from "@/lib/code";
import { toast } from "sonner";

interface Props {
  isEdit: boolean;
  open: boolean;
  tag: Tag | null;
  setOpen: (flag: boolean) => void;
  getList: () => void;
}

export const TagDialog = ({ isEdit, open, setOpen, getList, tag }: Props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (isEdit && tag) {
        form.reset({
          id: tag.id,
          name: tag.name,
        });
      } else {
        form.reset({
          name: "",
        });
      }
    }
  }, [open, isEdit, tag, form]);

  const openChange = (flag: boolean) => {
    setOpen(flag);
  };

  const add = async (values: z.infer<typeof TagSchema>) => {
    const res = await addTag(values);
    return res;
  };

  const edit = async (values: z.infer<typeof TagSchema>) => {
    const res = await updateTag(values);
    return res;
  };

  const onSubmit = (values: z.infer<typeof TagSchema>) => {
    startTransition(async () => {
      const res = isEdit ? await edit(values) : await add(values);
      if (res.code === CODE.SUCCESS) {
        setOpen(false);
        getList();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑" : "添加"}标签</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标签名称</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入标签名称" {...field} />
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
                {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                确认
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
