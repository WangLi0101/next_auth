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
import { Button } from "../../ui/button";
import { MessageBox } from "../../confirm";
import { RoleDialog } from "./role-dialog";
export interface Role {
  name: string;
  roleKey: string;
}
export const Role = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const getList = async () => {
    const res = await getRoles();
    if (res.code === CODE.SUCCESS) {
      setRoles(res.data);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  // Delete
  const del = (role_key: string) => {
    MessageBox({ title: "Confirm Delete?", desc: "" })
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

  // Add
  const add = () => {
    setIsEdit(false);
    setCurrentRole(null);
    setOpen(true);
  };

  // Edit
  const edit = (role: Role) => {
    setIsEdit(true);
    setCurrentRole(role);
    setOpen(true);
  };
  return (
    <div>
      <div className="operator flex flex-row-reverse mb-4">
        <Button onClick={add}>Add</Button>
      </div>
      <div className="table w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>role_key</TableHead>
              <TableHead>name</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((invoice) => (
              <TableRow key={invoice.roleKey}>
                <TableCell className="font-medium">{invoice.roleKey}</TableCell>
                <TableCell>{invoice.name}</TableCell>
                <TableCell>
                  <Button variant="link" onClick={() => edit(invoice)}>
                    Edit
                  </Button>
                  <Button variant="link" onClick={() => del(invoice.roleKey)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <RoleDialog
        isEdit={isEdit}
        open={open}
        role={currentRole}
        setOpen={setOpen}
        getList={getList}
      />
    </div>
  );
};
