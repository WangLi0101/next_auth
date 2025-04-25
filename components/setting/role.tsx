"use client";
import { delRole, getRoles } from "@/actions/auth/role";
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
import { Button } from "../ui/button";
import { MessageBox } from "../confirm";
interface Role {
  name: string;
  roleKey: string;
}
export const Role = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const getList = async () => {
    const res = await getRoles();
    if (res.code === CODE.SUCCESS) {
      setRoles(res.data);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  const del = (role_key: string) => {
    MessageBox({ title: "确定要删除吗？", desc: "" })
      .then(async () => {
        const res = await delRole(role_key);
        if (res.code === 0) {
          getList();
        } else {
          toast.error(res.message);
        }
      })
      .catch(() => {});
  };
  return (
    <div>
      <div className="operator flex flex-row-reverse mb-4">
        <Button>新增</Button>
      </div>
      <div className="table w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>role_key</TableHead>
              <TableHead>name</TableHead>
              <TableHead className="w-[150px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((invoice) => (
              <TableRow key={invoice.roleKey}>
                <TableCell className="font-medium">{invoice.roleKey}</TableCell>
                <TableCell>{invoice.name}</TableCell>
                <TableCell>
                  <Button variant="link" onClick={() => del(invoice.roleKey)}>
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
