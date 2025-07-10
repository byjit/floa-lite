import { StateGraph, START, END, MessagesAnnotation } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({ model: "gpt-4o-mini" });
// Streams a response from OpenAI
async function callModel(state: typeof MessagesAnnotation.State) {
	const response = await model.invoke(state.messages);
	return { messages: [response] };
}

const stateGraph = new StateGraph(MessagesAnnotation);
export const workflow = stateGraph
	.addNode("assistant", callModel)
	.addEdge(START, "assistant")
	.addEdge("assistant", END)
	.compile();