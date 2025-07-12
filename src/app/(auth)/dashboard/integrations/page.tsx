"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/react";
import { useState } from "react";
import { type Tool } from "@/server/db/schema/tools";
import { ToolForm } from "./tool-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function IntegrationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const deleteMutation = trpc.tool.deleteTool.useMutation();
  const { data: tools, refetch } = trpc.tool.getTools.useQuery();

  const handleEdit = (tool: Tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedTool(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  const onFormSubmit = () => {
    refetch();
    handleCloseModal();
  };

  const handleDelete = async (tool: Tool) => {
    if (window.confirm(`Are you sure you want to delete the tool "${tool.name}"? This action cannot be undone.`)) {
      await deleteMutation.mutateAsync({ id: tool.id });
      toast.success("Tool deleted successfully");
      refetch();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>Create Integration</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedTool ? "Edit Tool" : "Create Tool"}</DialogTitle>
            </DialogHeader>
            <ToolForm
              tool={selectedTool}
              onSubmit={onFormSubmit}
              onCancel={handleCloseModal}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1">
        {tools?.map((tool) => (
          <Card className="mb-4" key={tool.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" aria-label="Edit tool" onClick={() => handleEdit(tool)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" aria-label="Delete tool" onClick={() => handleDelete(tool)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
