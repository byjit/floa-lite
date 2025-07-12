"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/react";
import { useState } from "react";
import { type Project } from "@/server/db/schema/project";
import { type Tool } from "@/server/db/schema/tools";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { ProjectForm } from "./project-form";

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(Project & { tools: Tool[] }) | null>(null);

  const { data: projects, refetch } = trpc.project.getProjects.useQuery();

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleCreate = () => {
    setSelectedProject(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProject(null);
  };

  const onFormSubmit = () => {
    refetch();
    handleCloseForm();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={handleCreate}>Create Project</Button>
      </div>
      {showForm ? (
        <ProjectForm
          project={selectedProject}
          onSubmit={onFormSubmit}
          onCancel={handleCloseForm}
        />
      ) : (
        <DataTable columns={columns({ onEdit: handleEdit })} data={projects ?? []} />
      )}
    </div>
  );
}
