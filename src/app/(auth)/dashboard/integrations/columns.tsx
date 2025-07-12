"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Tool } from "@/server/db/schema/tools";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/react";

interface ColumnsProps {
  onEdit: (tool: Tool) => void;
}

export const columns = ({ onEdit }: ColumnsProps): ColumnDef<Tool>[] => [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "description", header: "Description" },
  {
    id: "actions",
    cell: ({ row }) => {
      const tool = row.original;
      const deleteMutation = trpc.tool.deleteTool.useMutation();

      const handleDelete = async () => {
        await deleteMutation.mutateAsync({ id: tool.id });
      };

      return (
        <div className="flex gap-2">
          <Button onClick={() => onEdit(tool)}>Edit</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      );
    },
  },
];
