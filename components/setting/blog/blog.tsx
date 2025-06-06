"use client";
import { CODE } from "@/lib/code";
import { useEffect, useState } from "react";
import { Blog as BlogType } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { MyPagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { MessageBox } from "@/components/confirm";
import { toast } from "sonner";
import { getAllBlogs, deleteBlog } from "@/actions/blog/blog";
type BlogItemType = Omit<BlogType, "content">;
export const Blog = () => {
  const [blogs, setBlogs] = useState<BlogItemType[]>([]);
  const [query, setQuery] = useState({
    page: 1,
    pageSize: 50,
  });
  const [total, setTotal] = useState(0);

  const getBlogList = async () => {
    const res = await getAllBlogs({ ...query });
    if (res.code === CODE.SUCCESS) {
      setBlogs(res.data.list);
      setTotal(res.data.total);
    }
  };
  useEffect(() => {
    getBlogList();
  }, [query]);

  const del = async (id: string) => {
    MessageBox({
      title: "Delete",
      desc: "Are you sure want to delete?",
    })
      .then(async () => {
        const res = await deleteBlog(id);
        if (res.code === 0) {
          getBlogList();
        } else {
          toast.error(res.message);
        }
      })
      .catch(() => {});
  };
  return (
    <div className="p-4">
      <div className="table w-full mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>title</TableHead>
              <TableHead>description</TableHead>
              <TableHead>tags</TableHead>
              <TableHead className="w-[200px]">actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>{blog.description}</TableCell>
                <TableCell>1</TableCell>
                <TableCell>
                  <Button variant="link">Edit</Button>
                  <Button variant="link" onClick={() => del(blog.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <MyPagination
        total={total}
        pageSize={query.pageSize}
        currentPage={query.page}
        onPageChange={(page) => setQuery({ ...query, page })}
        onPageSizeChange={(pageSize) => setQuery({ ...query, pageSize })}
        pageSizeOptions={[50, 100, 200]}
      />
    </div>
  );
};
