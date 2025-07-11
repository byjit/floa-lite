import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CloudIcon } from "lucide-react";
import { SearchableSelect, Option } from "@/components/searchable-select";

export const AiModelSelector = () => {
  const [selectedModel, setSelectedModel] = useState<string>("openai-gpt4"); // Default selected model

  // Dummy data for AI models
  const aiModels: Option[] = [
    { value: "openai-gpt4", label: "OpenAI GPT-4" },
      { value: "anthropic-claude3 super pro", label: "Anthropic Claude 3 super pro model" },
    { value: "perplexity-70b", label: "Perplexity 70B" },
    { value: "google-gemini-pro", label: "Google Gemini Pro" },
    { value: "mistral-7b", label: "Mistral 7B" },
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
