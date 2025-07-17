import { Button } from "@/components/ui/button";
import { CloudIcon } from "lucide-react";
import { SearchableSelect, type Option } from "@/components/searchable-select";
import { useAgentSettingsStore } from "@/store/agent-settings";
import { AI_MODELS } from "@/lib/models";

export const AiModelSelector = () => {
  const { aiModelId, setAiModelId } = useAgentSettingsStore();

  const aiModels: Option[] = AI_MODELS.filter((model) => !model.hide).map(
    (model) => ({
      value: model.id,
      label: model.name,
    }),
  );

  const handleModelChange = (value: string) => {
    setAiModelId(value);
    // Log the selected model for debugging or analytics
    console.log("Selected AI Model:", value);
  };

  return (
    <div className="flex items-end gap-2">
      <Button
        variant="secondary"
        size="icon"
        className="text-neutral-500 rounded-full"
      >
        <CloudIcon className="w-4 h-4" />
      </Button>
      <SearchableSelect
        options={aiModels}
        value={aiModelId}
        onValueChange={handleModelChange}
        placeholder="Select AI Model"
        emptyMessage="No models found."
        className="w-[200px]" // Adjust width as needed
      />
    </div>
  );
};
