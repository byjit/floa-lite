import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Project } from "@/server/db/schema/project";
import { type Tool } from "@/server/db/schema/tools";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

interface ProjectCardProps {
  project: Project & { tools: Tool[] };
  onEdit: (project: Project & { tools: Tool[] }) => void;
  onDelete: (project: Project & { tools: Tool[] }) => void;
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <Card className="">
      <CardHeader className="relative">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription className="line-clamp-2">{project.instruction || "No instruction provided."}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" aria-label="Edit project" onClick={() => onEdit(project)}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="destructive" aria-label="Delete project" onClick={() => onDelete(project)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <Badge key={tool.id} variant="secondary">{tool.name}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
