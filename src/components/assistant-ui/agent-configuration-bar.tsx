

"use client"

import { FolderClosedIcon, SlidersVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SearchableSelect, Option } from "@/components/searchable-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo } from "react";
import { useComposerRuntime } from "@assistant-ui/react";
import { Switch } from "../ui/switch";
import { useAgentSettingsStore } from "@/store/agent-settings";
import { trpc } from "@/trpc/react";

export const AgentConfigurationBar = () => {
    const composerRuntime = useComposerRuntime();
    const { creativity, humanised, project, setCreativity, setHumanised, setProject } = useAgentSettingsStore();

    const { data: projects, isLoading, isError } = trpc.project.getProjects.useQuery();

    const projectOptions: Option[] = useMemo(() => {
        if (!projects) return [{ value: "", label: "No project" }];
        const options = projects.map((p) => ({ value: p.id, label: p.title }));
        return options;
    }, [projects]);

    const creativityOptions: Option[] = [
        { value: "low", label: "Low" },
        { value: "balanced", label: "Balanced" },
        { value: "high", label: "High" },
    ]

    useEffect(() => {
        if (!composerRuntime) return;
        composerRuntime.setRunConfig({
            custom: {
                creativity,
                humanised,
                project,
            }
        })
    }, [composerRuntime, creativity, humanised, project]);

    return (
        <div className="flex items-center justify-between w-full px-4 max-w-[42rem] mx-auto mt-2">
            {/* Left side: Folder icon and SearchableSelect */}
            <div className="flex items-center px-3 gap-2">
                <FolderClosedIcon className="h-4 w-4 text-neutral-500" />
                <SearchableSelect
                    options={projectOptions}
                    value={project}
                    placeholder={isLoading ? "Loading..." : "Select a project"}
                    emptyMessage={isError ? "Error loading projects." : "No projects found."}
                    onValueChange={(value) => setProject(value)}
                    className="min-w-[60px] text-xs"
                    disabled={isLoading || isError}
                />
            </div>

            {/* Right side: SlidersVertical icon button with Popover */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-foreground">
                        <SlidersVertical className="h-5 w-5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2 space-y-2">

                    <div className="flex items-center gap-4">
                        <Label htmlFor="creativity" className="text-xs font-medium">Creativity</Label>
                        <Select value={creativity} onValueChange={setCreativity}>
                            <SelectTrigger id="creativity" className="h-9 text-xs max-w-[100px] ml-auto">
                                <SelectValue placeholder="Select creativity" />
                            </SelectTrigger>
                            <SelectContent>
                                {creativityOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-4">
                        <Label htmlFor="humanised" className="text-xs font-medium">Humanised</Label>
                        <Switch id="humanised" checked={humanised} onCheckedChange={setHumanised} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
