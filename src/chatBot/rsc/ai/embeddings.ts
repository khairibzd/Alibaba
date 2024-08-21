import { GoogleGenerativeAI } from "@google/generative-ai";

import { PrismaClient } from "@prisma/client";

export class Embeddings {
  gemini: GoogleGenerativeAI;
  db: PrismaClient;

  private constructor(db: PrismaClient, gemeni: GoogleGenerativeAI) {
    this.db = db;
    this.gemini = gemeni;
  }

  static async create(apiKey: string) {
    const gemini = new GoogleGenerativeAI(apiKey);

    const db = new PrismaClient();

    await db.$connect();

    return new Embeddings(db, gemini);
  }

  async generateEmbedding(value: string): Promise<number[]> {
    const model = this.gemini.getGenerativeModel({
      model: "text-embedding-004",
    });
    const result = await model.embedContent(value);
    return result.embedding.values;
  }

  async findRelevantContent(userQuery: string) {
    const userQueryEmbedded = await this.generateEmbedding(userQuery);

    // Fetch all embeddings from the database
    const allEmbeddings = await this.db.embeddings.findMany();

    // Calculate cosine similarity for each embedding
    const similarGuides = allEmbeddings
      .map((embeddingRecord: any) => {
        const similarity = this.calculateCosineSimilarity(
          userQueryEmbedded,
          embeddingRecord.embedding as number[]
        );
        return {
          document: embeddingRecord.document,
          metadata: embeddingRecord.metadata,
          similarity,
        };
      })
      .filter((result) => result.similarity > 0) // Filter out non-relevant results
      .sort((a, b) => b.similarity - a.similarity) // Sort by similarity descending
      .slice(0, 5); // Take the top 5 results

    return similarGuides;
  }

  private calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}
