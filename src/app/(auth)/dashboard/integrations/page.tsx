"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/react";
import { useState } from "react";
import { type Tool } from "@/server/db/schema/tools";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { ToolForm } from "./tool-form";

export default function IntegrationsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const { data: tools, refetch } = trpc.tool.getTools.useQuery();

  const handleEdit = (tool: Tool) => {
    setSelectedTool(tool);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedTool(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedTool(null);
  };

  const onFormSubmit = () => {
    refetch();
    handleCloseForm();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <Button onClick={handleCreate}>Create Integration</Button>
      </div>
      {showForm ? (
        <ToolForm
          tool={selectedTool}
          onSubmit={onFormSubmit}
          onCancel={handleCloseForm}
        />
      ) : (
        <DataTable columns={columns({ onEdit: handleEdit })} data={tools ?? []} />
      )}
    </div>
  );
}
