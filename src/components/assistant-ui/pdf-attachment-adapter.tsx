import {
  AttachmentAdapter,
  PendingAttachment,
  CompleteAttachment,
} from "@assistant-ui/react";
import pdfToText from "react-pdftotext";

export class PDFAttachmentAdapter implements AttachmentAdapter {
  accept = "application/pdf";
  async add({ file }: { file: File }): Promise<PendingAttachment> {
    // Validate file size
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    if (file.size > maxSize) {
      throw new Error("PDF size exceeds 5MB limit");
    }
    return {
      id: crypto.randomUUID(),
      type: "document",
      name: file.name,
      file,
      contentType: "application/pdf",
      status: { type: "running", reason: "uploading", progress: 0 },
    };
  }
  async send(attachment: PendingAttachment): Promise<CompleteAttachment> {
    const text = await this.extractTextFromPDF(attachment.file);
    return {
      id: attachment.id,
      type: "document",
      name: attachment.name,
      content: [
        {
          type: "text",
          text: `[PDF Document: ${attachment.name}]\n Extracted text: ${text.substring(0, 50)}...`,
        },
      ],
      status: { type: "complete" },
      contentType: "application/pdf",
    };
  }
  async remove(attachment: PendingAttachment): Promise<void> {
    // No-op for now as we don't have a backend to notify
  }
  private async extractTextFromPDF(file: File): Promise<string> {
    try {
      const text = await pdfToText(file);
      return text;
    } catch (error) {
      console.error("Failed to extract text from PDF", error);
      throw new Error("Failed to extract text from PDF.");
    }
  }
}
