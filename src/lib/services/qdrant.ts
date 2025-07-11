import { env } from '@/env';
import {QdrantClient} from '@qdrant/js-client-rest';

export const client = new QdrantClient({
    url: env.QDRANT_URL,
    apiKey: env.QDRANT_API_KEY,
});