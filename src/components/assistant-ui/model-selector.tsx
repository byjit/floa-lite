import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CloudIcon } from "lucide-react";
import { SearchableSelect, Option } from "@/components/searchable-select";

export const AiModelSelector = () => {
  const [selectedModel, setSelectedModel] = useState<string>("openai-gpt4"); // Default selected model

  // Dummy data for AI models
  const aiModels: Option[] = [
    { value: "grok-4", label: "Grok 4" },
    { value: "claude-4-sonnet", label: "Claude 4 Sonnet" },
    { value: "sonar-pro", label: "Sonar Pro" },
    { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
  ];

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    // Log the selected model for debugging or analytics
    console.log("Selected AI Model:", value);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" size="icon" className="text-neutral-600 rounded-full">
        <CloudIcon className="w-4 h-4" />
      </Button>
      <SearchableSelect
        options={aiModels}
        value={selectedModel}
        onValueChange={handleModelChange}
        placeholder="Select AI Model"
        emptyMessage="No models found."
        className="w-[200px]" // Adjust width as needed
      />
    </div>
  );
};
