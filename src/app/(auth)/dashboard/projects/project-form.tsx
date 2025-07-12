"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/trpc/react";
import { type Project } from "@/server/db/schema/project";
import { insertProjectSchema } from "@/server/db/schema/project";
import { MultiSelect } from "@/components/ui/multi-select";

const formSchema = insertProjectSchema.pick({ title: true, instruction: true }).extend({
  tools: z.array(z.string()).default([]),
});

interface ProjectFormProps {
  project: (Project & { tools: { id: string, name: string }[] }) | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const { data: tools } = trpc.tool.getTools.useQuery();
  const createMutation = trpc.project.createProject.useMutation();
  const updateMutation = trpc.project.updateProject.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project?.title ?? "",
      instruction: project?.instruction ?? "",
      tools: project?.tools.map(t => t.id) ?? [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (project) {
      await updateMutation.mutateAsync({ ...values, id: project.id });
    } else {
      await createMutation.mutateAsync(values);
    }
    onSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instruction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instruction</FormLabel>
              <FormControl>
                <Textarea placeholder="Project instruction" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tools"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tools</FormLabel>
              <FormControl>
                <MultiSelect
                  options={tools?.map(t => ({ value: t.id, label: t.name })) ?? []}
                  value={field.value.map(v => ({ value: v, label: tools?.find(t => t.id === v)?.name ?? '' }))}
                  onChange={(v) => field.onChange(v.map(i => i.value))}
                  placeholder="Select tools"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit">{project ? "Update" : "Create"}</Button>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
}

