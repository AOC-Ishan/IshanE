
import { GoogleGenAI, Type } from "@google/genai";
import type { Level, CourseTopic, IELTSModule, MCQQuestion } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLesson = async (level: Level, topic: CourseTopic): Promise<string> => {
  const prompt = `
    You are an expert English language teacher. Generate a comprehensive and engaging lesson for an English learner at the "${level}" level.
    The topic is "${topic.title}: ${topic.description}".

    The lesson should be structured clearly and formatted using Markdown. Include the following sections:
    1.  **Introduction**: Briefly introduce the topic and why it's important.
    2.  **Explanation**: Provide a clear explanation of the grammar point or vocabulary. Use simple language appropriate for the learner's level.
    3.  **Examples**: Give at least 3-5 clear example sentences.
    4.  **Practice Exercise**: Create a short, simple exercise (e.g., fill in the blanks, create a sentence) to help the learner practice.
    5.  **Conclusion**: Briefly summarize the key points.

    Use Markdown for formatting:
    - Use '##' for main section headings.
    - Use '**' for bold text to highlight key terms.
    - Use '*' for bullet points.
  `;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating lesson:", error);
    return "Sorry, I couldn't generate the lesson at this moment. Please try again later.";
  }
};

export const generateMCQ = async (level: Level, topic: CourseTopic): Promise<MCQQuestion[]> => {
    const prompt = `
    Based on the English language topic "${topic.title}" for a "${level}" level learner, create a multiple-choice quiz with 5 questions.
    Each question should test understanding of the core concepts of the topic.
    For each question, provide 4 options, where only one is correct.
    Return the data in a clear JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING }
            },
            required: ['question', 'options', 'correctAnswer']
          }
        }
      }
    });
    
    const jsonText = response.text.trim();
    // Gemini can sometimes wrap the JSON in markdown backticks
    const cleanedJson = jsonText.replace(/^```json\s*|```$/g, '');
    return JSON.parse(cleanedJson);
  } catch (error) {
    console.error("Error generating MCQ:", error);
    return [];
  }
};


export const generateIELTSPrep = async (module: IELTSModule, topic: string): Promise<string> => {
  const prompt = `
    You are a senior IELTS examiner. Provide expert preparation material for the **IELTS ${module}** test.
    The specific topic is "${topic}".

    Your response should be comprehensive, practical, and formatted in Markdown. Include the following:
    1.  **Module Overview**: Briefly explain the format and objective of the ${module} test.
    2.  **Key Strategies**: Provide 3-5 actionable tips and strategies specific to this module and topic.
    3.  **Topic-Specific Vocabulary**: List 5-7 advanced vocabulary words or phrases related to "${topic}" with simple definitions.
    4.  **Practice Task**: Create a realistic IELTS-style practice task based on the module and topic.
    5.  **Model Answer/Example**: Provide a high-scoring model answer or example for the practice task.

    Use Markdown for clear formatting.
  `;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating IELTS prep:", error);
    return "Sorry, I couldn't generate the IELTS material right now. Please try again.";
  }
};