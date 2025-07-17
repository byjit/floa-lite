export type Attachment = {
    id: string;
    type: "document" | "image";
    name: string;
    content: { type: "text" | "image"; text?: string; image?: string }[];
    file: File;
    source: "message" | "composer";
    contentType: string;
    status: { type: "running" | "complete"; reason?: string; progress: number };
  };
  