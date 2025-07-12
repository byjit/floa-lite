"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Project } from "@/server/db/schema/project";
import { type Tool } from "@/server/db/schema/tools";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/react";
import { Badge } from "@/components/ui/badge";

interface ColumnsProps {
  onEdit: (project: Project & { tools: Tool[] }) => void;
}

export const columns = ({ onEdit }: ColumnsProps): ColumnDef<Project & { tools: Tool[] }>[] => [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "instruction", header: "Instruction" },
  {
    accessorKey: "tools",
    header: "Tools",
    cell: ({ row }) => {
      const tools = row.original.tools;
      return (
        <div className="flex gap-1">
          {tools.map(tool => (
            <Badge key={tool.id} variant="secondary">{tool.name}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;
      const deleteMutation = trpc.project.deleteProject.useMutation();

      const handleDelete = async () => {
        await deleteMutation.mutateAsync({ id: project.id });
      };

      return (
        <div className="flex gap-2">
          <Button onClick={() => onEdit(project)}>Edit</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      );
    },
  },
];
