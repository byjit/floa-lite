import pdfToText from "react-pdftotext";
import { Attachment } from "./attachment.types";

const ACCEPTED_CONTENT_TYPES = ["application/pdf"];

async function addAttachment({ file }: { file: File }): Promise<Attachment> {
    // Validate file size
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    if (file.size > maxSize) {
      throw new Error("PDF size exceeds 5MB limit");
    }
    return {
      id: crypto.randomUUID(),
      type: "document",
      name: file.name,
      content: [],
      file,
      contentType: "application/pdf",
      status: { type: "running", reason: "uploading", progress: 0 },
      source: "composer",
    };
  }

async function send(attachment: Attachment): Promise<Attachment> {
  const text = await extractTextFromPDF(attachment.file);
  return {
    id: attachment.id,
    type: "document",
    name: attachment.name,
    file: attachment.file,
    content: [
      {
        type: "text",
        text: `[PDF Document: ${attachment.name}]\n Extracted text: ${text.substring(0, 50)}...`,
      },
    ],
    status: { type: "complete", progress: 100 },
    contentType: "application/pdf",
    source: attachment.source,
  };
}

async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const text = await pdfToText(file);
    return text;
  } catch (error) {
    console.error("Failed to extract text from PDF", error);
    throw new Error("Failed to extract text from PDF.");
  }
}