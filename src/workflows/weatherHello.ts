import { StateGraph, START, END, MessagesAnnotation } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage } from "@langchain/core/messages";

type NodeAction = Parameters<(typeof stateGraph)["addNode"]>[1]; // pulled from `.addNode` params

// Streams a response from OpenAI
const weatherNode: NodeAction = async (_state) => {
	const response = await new ChatOpenAI({
		model: "gpt-4o-mini",
		streaming: true,
	}).invoke([
		{
			role: "user",
			content: `Give me the weather in SF`,
		},
	]);

	return { messages: [response] };
};

// Asynchronously appends a greeting after 3 seconds
const helloNode: NodeAction = async (_state) => {
	const greeting = new AIMessage({ content: `👋 Hello there!` });

	await new Promise((res) => setTimeout(res, 3000));

	return { messages: [greeting] };
};

const stateGraph = new StateGraph(MessagesAnnotation);
export const workflow = stateGraph
	.addNode("weather", weatherNode)
	.addNode("hello", helloNode)
	.addEdge(START, "weather")
	.addEdge("weather", "hello")
	.addEdge("hello", END)
	.compile();