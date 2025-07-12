"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/react";
import { useState } from "react";
import { type Project } from "@/server/db/schema/project";
import { type Tool } from "@/server/db/schema/tools";
import { ProjectForm } from "./project-form";
import { ProjectCard } from "./project-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<(Project & { tools: Tool[] }) | null>(null);
  const deleteMutation = trpc.project.deleteProject.useMutation();
  const { data: projects, refetch } = trpc.project.getProjects.useQuery();

  const handleEdit = (project: Project & { tools: Tool[] }) => {
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

  const handleDelete = async (project: Project & { tools: Tool[] }) => {
    if (window.confirm(`Are you sure you want to delete the project "${project.title}"? This action cannot be undone.`)) {
      try {
        await deleteMutation.mutateAsync({ id: project.id });
        toast.success("Project deleted successfully");
        refetch();
      } catch (error) {
        toast.error("Failed to delete project");
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={handleCreate}>Create Project</Button>
      </div>
      <div className="grid grid-cols-1">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedProject ? "Edit Project" : "Create Project"}</DialogTitle>
          </DialogHeader>
          <ProjectForm
            project={selectedProject}
            onSubmit={onFormSubmit}
            onCancel={handleCloseForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
