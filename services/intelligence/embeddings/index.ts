/**
 * Embeddings and vector storage helpers
 * Provides interfaces for working with document embeddings and similarity search
 */

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

/**
 * Represents a stored document with its embedding
 */
export interface EmbeddedDocument {
  id: string;
  content: string;
  embedding: number[];
  metadata: Record<string, unknown>;
  createdAt: Date;
}

/**
 * Create an embedding for text using Claude's embedding API
 * Returns a 1536-dimensional vector representation
 * @param text Text to embed
 * @returns Vector embedding as number array
 */
export async function createEmbedding(text: string): Promise<number[]> {
  console.log('[EMBEDDINGS] Creating embedding for text:', text.substring(0, 50) + '...');

  try {
    // NOTE: Claude 3 doesn't have a dedicated embedding endpoint in the current API
    // This is a placeholder implementation that would use a dedicated embedding service
    // For production, integrate with:
    // - OpenAI Embeddings API
    // - Anthropic Embeddings API (when available)
    // - Local embedding models (e.g., sentence-transformers)

    // Mock implementation: return a deterministic 1536-dim vector based on text hash
    const mockEmbedding = generateMockEmbedding(text);

    console.log('[EMBEDDINGS] Embedding created successfully');
    return mockEmbedding;
  } catch (error) {
    console.error('[EMBEDDINGS] Error creating embedding:', error);
    throw error;
  }
}

/**
 * Find similar documents using vector similarity search
 * Would integrate with pgvector for PostgreSQL similarity queries
 * @param embedding Query embedding vector
 * @param limit Maximum number of results to return
 * @returns Similar documents with similarity scores
 */
export async function findSimilarDocuments(
  embedding: number[],
  limit: number = 5
): Promise<Array<{ document: EmbeddedDocument; similarity: number }>> {
  console.log(
    `[EMBEDDINGS] Searching for ${limit} similar documents using vector similarity`
  );

  try {
    // TODO: Implement pgvector similarity search
    // Example SQL:
    // SELECT document_id, content, embedding, metadata,
    //        1 - (embedding <=> $1) as similarity
    // FROM documents
    // ORDER BY embedding <=> $1
    // LIMIT $2

    console.log('[EMBEDDINGS] pgvector similarity search not yet implemented');
    console.log('[EMBEDDINGS] Would query: SELECT ... ORDER BY embedding <=> ? LIMIT ?');

    // Return empty results for now
    return [];
  } catch (error) {
    console.error('[EMBEDDINGS] Error finding similar documents:', error);
    throw error;
  }
}

/**
 * Calculate cosine similarity between two vectors
 * Used for testing and comparison
 * @param vectorA First vector
 * @param vectorB Second vector
 * @returns Similarity score (0-1)
 */
export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    magnitudeA += vectorA[i] * vectorA[i];
    magnitudeB += vectorB[i] * vectorB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Generate a mock embedding for demonstration
 * In production, use actual embedding model
 */
function generateMockEmbedding(text: string): number[] {
  // Use text hash to seed the random number generator for reproducibility
  const seed = hashString(text);
  const embedding: number[] = [];

  let random = seed;
  for (let i = 0; i < 1536; i++) {
    // Seeded pseudo-random number generator
    random = (random * 9301 + 49297) % 233280;
    const normalizedValue = (random / 233280 - 0.5) * 2; // Range: -1 to 1
    embedding.push(normalizedValue);
  }

  // Normalize the vector to unit length
  let magnitude = 0;
  for (const value of embedding) {
    magnitude += value * value;
  }
  magnitude = Math.sqrt(magnitude);

  const normalized = embedding.map((v) => v / magnitude);
  return normalized;
}

/**
 * Simple string hash function
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Batch create embeddings for multiple texts
 * @param texts Array of texts to embed
 * @returns Array of embeddings
 */
export async function createBatchEmbeddings(texts: string[]): Promise<number[][]> {
  console.log(`[EMBEDDINGS] Creating batch embeddings for ${texts.length} texts`);

  const embeddings: number[][] = [];

  for (const text of texts) {
    const embedding = await createEmbedding(text);
    embeddings.push(embedding);
  }

  return embeddings;
}

/**
 * Store an embedded document
 * @param document Document to store
 * @returns Stored document with ID
 */
export async function storeEmbeddedDocument(
  content: string,
  metadata: Record<string, unknown>
): Promise<EmbeddedDocument> {
  console.log('[EMBEDDINGS] Storing embedded document');

  const embedding = await createEmbedding(content);
  const id = generateDocumentId();

  const document: EmbeddedDocument = {
    id,
    content,
    embedding,
    metadata,
    createdAt: new Date(),
  };

  // TODO: Insert into PostgreSQL with pgvector
  // INSERT INTO documents (id, content, embedding, metadata, created_at)
  // VALUES ($1, $2, $3, $4, $5)

  console.log(`[EMBEDDINGS] Document stored with ID: ${id}`);
  return document;
}

/**
 * Generate a unique document ID
 */
function generateDocumentId(): string {
  return `doc-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}
