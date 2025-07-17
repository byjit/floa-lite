import { Button } from "../ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Mail, Search, Calendar } from "lucide-react";

const examplePrompts = [
    { icon: Mail, text: "Write me an email", value: "Write me an email: \n\n" },
    { icon: Search, text: "Deep research a topic", value: "Deep research the topic: \n\n" },
    { icon: Calendar, text: "Check my calendar", value: "Check my calendar: \n\n" },
];


export const ExampleMessage = ({ handleExampleClick }: { handleExampleClick: (value: string) => void }) => {
    return (
        <div className="flex flex-col gap-2 flex-1">
            <div className="mt-4 flex justify-center">
                <div className="w-full max-w-xl">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="examples" className="border-none">
                            <AccordionTrigger className="justify-center text-center text-muted-foreground transition">
                                Try these examples to get started
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-x-2 gap-y-4 flex-wrap py-3">
                                    {examplePrompts.map((prompt, index) => (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            className="flex items-center space-x-3 rounded-full px-4 py-2 shadow-sm transition"
                                            onClick={() => handleExampleClick(prompt.value)}
                                        >
                                            <prompt.icon className="w-5 h-5" />
                                            <span className="text-muted-foreground font-light">{prompt.text}</span>
                                        </Button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}