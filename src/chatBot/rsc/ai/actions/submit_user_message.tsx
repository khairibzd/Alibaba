"use server";
import prisma from "@/lib/db";
import { Embeddings } from "../embeddings";
import { createStreamableValue, getMutableAIState, streamUI } from "ai/rsc";
import { generateId, generateObject } from "ai";
import { google } from "@ai-sdk/google";
import {
  ChatBotMessage,
  ChatBotSpinnerMessage,
  ChatBotStreamMessage,
  ChatBotShowProductMessage,
} from "@/chatBot/ui";

export async function submitUserMessage(content: string) {
  const availableProductStore = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      Category: true,
    },
  });
  const embeddings = await Embeddings.create(
    process.env.GOOGLE_GENERATIVE_AI_API_KEY!
  );
  const aiState = getMutableAIState();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: generateId(),
        role: "user",
        content,
      },
    ],
  });
  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const result = await streamUI({
    system: `"You are a helpful assistant specialized in a clothing store. Your primary role is to assist customers with questions about products and help them find what they're looking for.

Messages inside [] means that it's a UI element or a user event. For example:
  - "[User selected a valid order]" means that the user has asked for a valir order.
    
- General Interaction: You can greet users, respond to common pleasantries, and ensure a friendly interaction. If a user asks a question unrelated to the store's products or services, politely inform them that you can only assist with clothing-related inquiries.

- The only products available in the store are the following: ${JSON.stringify(
      availableProductStore
    )}. If a customer asks about available products, you don't need to list them all. However, it would be good to explain what is generally sold, the possible categories, etc. The most important thing is to never mention or suggest a product/category that is not available. 

- Product Information: Always use the 'showClothesInformation' tool to provide detailed information about clothing items. Do not discuss specific product details without using this tool.
    
- Inadequate Information: If a user provides insufficient information about what they want to buy, start by asking for the most essential details, such as the type of clothing item they are looking for. If the user does not specify a color or size, you can proceed without them unless they are crucial for narrowing down options. Only ask for additional details like color or size if the user explicitly mentions they are important or if they want specific recommendations. Avoid asking for every parameter and prioritize the user’s preferences based on the provided information. Remember the user preferences and try not to ask again the same color and size questions.


- Store-Focused: Remind users that your expertise is specific to the clothing store, and gently steer the conversation back to relevant topics if it veers off-course."`,

    model: google("models/gemini-1.5-flash-latest"),
    initial: <ChatBotSpinnerMessage />,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <ChatBotStreamMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: generateId(),
              role: "assistant",
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
    tools: {

    }
  });
  

  return {
    id: generateId(),
    display: result.value,
  };
}
