"use client";
import { deleteTag, getTags } from "@/actions/tag";
import { CODE } from "@/lib/code";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { MessageBox } from "../../confirm";
import { TagDialog } from "./tag-dialog";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

export interface Tag {
  id: string;
  name: string;
  _count?: {
    BlogsOnTags: number;
  };
}

export const Tag = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState(false);

  const getList = async () => {
    setLoading(true);
    try {
      const res = await getTags();
      if (res.code === CODE.SUCCESS) {
        setTags(res.data || []);
      } else {
        toast.error("获取标签列表失败");
      }
    } catch {
      toast.error("获取标签列表失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  // 删除标签
  const del = (id: string, name: string) => {
    MessageBox({
      title: "删除标签",
      desc: `确定要删除标签 "${name}" 吗？`,
    })
      .then(async () => {
        const res = await deleteTag(id);
        if (res.code === CODE.SUCCESS) {
          getList();
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch(() => {});
  };

  // 添加标签
  const add = () => {
    setIsEdit(false);
    setCurrentTag(null);
    setOpen(true);
  };

  // 编辑标签
  const edit = (tag: Tag) => {
    setIsEdit(true);
    setCurrentTag(tag);
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="operator flex flex-row-reverse">
        <Button onClick={add} variant="outline">
          添加标签
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标签名称</TableHead>
              <TableHead>使用次数</TableHead>
              <TableHead className="w-[150px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="ml-2">加载中...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : tags.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <div className="text-muted-foreground">
                    暂无标签，点击上方按钮添加标签
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell className="font-medium">
                    <Badge variant="secondary" className="text-sm">
                      {tag.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {tag._count?.BlogsOnTags || 0} 篇博客
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => edit(tag)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => del(tag.id, tag.name)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TagDialog
        isEdit={isEdit}
        open={open}
        tag={currentTag}
        setOpen={setOpen}
        getList={getList}
      />
    </div>
  );
};
