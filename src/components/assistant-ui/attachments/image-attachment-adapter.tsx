import { Attachment } from "./attachment.types";

export class VisionImageAdapter {
    accept = "image/jpeg,image/png,image/webp,image/gif";
  
    async add({ file }: { file: File }): Promise<Attachment> {
      // Validate file size (e.g., 20MB limit for most LLMs)
      const maxSize = 20 * 1024 * 1024; // 20MB
      if (file.size > maxSize) {
        throw new Error("Image size exceeds 20MB limit");
      }
  
      // Return pending attachment while processing
      return {
        id: crypto.randomUUID(),
        type: "image",
        name: file.name,
        content: [],
        source: "composer",
        contentType: file.type,
        file,
        status: { type: "running", progress: 0 },
      };
    }
  
    async send(attachment: Attachment): Promise<Attachment> {
      // Convert image to base64 data URL
      const base64 = await this.fileToBase64DataURL(attachment.file);
  
      // Return in assistant-ui format with image content
      return {
        id: attachment.id,
        source: attachment.source,
        file: attachment.file,
        contentType: attachment.contentType,
        type: "image",
        name: attachment.name,
        content: [
          {
            type: "image",
            image: base64, // data:image/jpeg;base64,... format
          },
        ],
        status: { type: "complete", progress: 100 },
      };
    }
  
    async remove(attachment: Attachment): Promise<void> {
      // Cleanup if needed (e.g., revoke object URLs if you created any)
    }
  
    private async fileToBase64DataURL(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          // FileReader result is already a data URL
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  }