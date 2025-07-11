import { StateGraph, START, END, MessagesAnnotation, Annotation } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { client } from "@/lib/services/qdrant";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { trimMessages } from "@langchain/core/messages";
import { HumanMessage, AIMessage, BaseMessage } from "@langchain/core/messages";

// Initialize OpenAI model and embeddings
const model = new ChatOpenAI({
	model: "gpt-4o-mini",
	temperature: 0
});

const embeddings = new OpenAIEmbeddings();

// Define enhanced state annotation
const WorkflowStateAnnotation = Annotation.Root({
	...MessagesAnnotation.spec,
	messageCount: Annotation<number>({
		reducer: (left: number, right: number) => right || left || 0,
		default: () => 0,
	}),
	needsSummarization: Annotation<boolean>({
		reducer: (left: boolean, right: boolean) => right !== undefined ? right : left,
		default: () => false,
	}),
	summary: Annotation<string>({
		reducer: (left?: string, right?: string) => right || left || "",
		default: () => "",
	}),
});

// Mock retriever tool for now (you'll need to implement Qdrant integration)
const retrieverTool = tool(
	async ({ query }) => {
		// This is a placeholder - you'll need to implement actual Qdrant search
		// For now, return a mock response
		return `Mock search results for: ${query}. This would normally search your Qdrant vector database.`;
	},
	{
		name: "search_documents",
		description: "Search and retrieve relevant documents from the knowledge base. Use this when you need to find information to answer user questions.",
		schema: z.object({
			query: z.string().describe("The search query to find relevant documents"),
		}),
	}
);

// Tool for document indexing
const indexDocumentTool = tool(
	async ({ content, metadata }) => {
		try {
			// This is a placeholder - you'll need to implement actual Qdrant indexing
			console.log("Indexing document:", content, metadata);
			return "Document successfully indexed to the knowledge base.";
		} catch (error) {
			return `Error indexing document: ${error}`;
		}
	},
	{
		name: "index_document",
		description: "Index a new document into the knowledge base for future retrieval.",
		schema: z.object({
			content: z.string().describe("The content of the document to index"),
			metadata: z.record(z.any()).optional().describe("Optional metadata for the document"),
		}),
	}
);

// Summarization function
async function summarizeConversation(messages: BaseMessage[]): Promise<string> {
	const summarizationPrompt = `
Please create a concise summary of the following conversation, capturing the key points, decisions, and context:

${messages.map(msg => `${msg.constructor.name}: ${msg.content}`).join('\n')}

Summary:`;

	const summaryResponse = await model.invoke([
		new HumanMessage(summarizationPrompt)
	]);

	return summaryResponse.content as string;
}

// Message count checker node
async function checkMessageCount(state: typeof WorkflowStateAnnotation.State) {
	const messageCount = state.messages.length;
	const needsSummarization = messageCount > 4;

	return {
		messageCount,
		needsSummarization,
	};
}

// Summarization node
async function performSummarization(state: typeof WorkflowStateAnnotation.State) {
	if (!state.needsSummarization) {
		return { needsSummarization: false };
	}

	// Get the messages to summarize (keep last 2, summarize the rest)
	const messagesToSummarize = state.messages.slice(0, -2);
	const messagesToKeep = state.messages.slice(-2);

	const summary = await summarizeConversation(messagesToSummarize);

	// Create a summary message to replace the old messages
	const summaryMessage = new AIMessage({
		content: `[Previous conversation summary: ${summary}]`,
		id: "conversation_summary",
	});

	return {
		messages: [summaryMessage, ...messagesToKeep],
		summary,
		needsSummarization: false,
		messageCount: messagesToKeep.length + 1, // +1 for summary message
	};
}

// Create the reAct agent with tools
const reactAgent = createReactAgent({
	llm: model,
	tools: [retrieverTool, indexDocumentTool],
	messageModifier: `You are a helpful AI assistant with access to a knowledge base through document search. 

Instructions:
1. When users ask questions, first search the knowledge base using the search_documents tool to find relevant information.
2. If you find relevant information, use it to provide accurate and detailed answers.
3. If no relevant information is found, provide the best answer you can based on your general knowledge, but mention that you couldn't find specific information in the knowledge base.
4. You can also help users index new documents into the knowledge base when requested.
5. Be conversational and helpful, and always strive to provide accurate information.`,
});

// Agent execution node
async function executeAgent(state: typeof WorkflowStateAnnotation.State) {
	const result = await reactAgent.invoke({ messages: state.messages });
	return {
		messages: result.messages,
	};
}

// Conditional routing function
function shouldSummarize(state: typeof WorkflowStateAnnotation.State): "summarize" | "agent" {
	return state.needsSummarization ? "summarize" : "agent";
}

// Build the workflow graph
const workflow = new StateGraph(WorkflowStateAnnotation)
	.addNode("checkMessages", checkMessageCount)
	.addNode("summarize", performSummarization)
	.addNode("agent", executeAgent)
	.addEdge(START, "checkMessages")
	.addConditionalEdges("checkMessages", shouldSummarize)
	.addEdge("summarize", "agent")
	.addEdge("agent", END);

// Compile and export the workflow
export const masterWorkflow = workflow.compile();

// Export individual components for testing
export {
	workflow,
	retrieverTool,
	indexDocumentTool,
	summarizeConversation,
	checkMessageCount,
	performSummarization,
	executeAgent,
};