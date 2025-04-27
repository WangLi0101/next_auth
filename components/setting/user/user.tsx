"use client";
import { changeUser2fa, getAllUsers } from "@/actions/auth/user";
import { CODE } from "@/lib/code";
import { useEffect, useState } from "react";
import { User as UserType } from "@prisma/client";
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
export const User = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [query, setQuery] = useState({
    page: 1,
    pageSize: 50,
  });
  const [total, setTotal] = useState(0);

  const getUsers = async () => {
    const res = await getAllUsers({ ...query });
    if (res.code === CODE.SUCCESS) {
      setUsers(res.data.list);
      setTotal(res.data.total);
    }
  };
  useEffect(() => {
    getUsers();
  }, [query]);

  const changeIs2Fa = (user: UserType) => {
    MessageBox({
      title: "Change 2fa",
      desc: "Are you sure want to change2fa?",
    })
      .then(async () => {
        const res = await changeUser2fa(user.id);
        if (res.code === 0) {
          getUsers();
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
              <TableHead>name</TableHead>
              <TableHead>email</TableHead>
              <TableHead>is2Fa</TableHead>
              <TableHead>actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.name}</TableCell>
                <TableCell>{invoice.email}</TableCell>
                <TableCell>{invoice.is2fa ? "是" : "否"}</TableCell>
                <TableCell>
                  <Button variant="link">Edit</Button>
                  <Button variant="link">Delete</Button>
                  <Button
                    variant="link"
                    disabled={!invoice.password}
                    onClick={() => changeIs2Fa(invoice)}
                  >
                    2fa
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
