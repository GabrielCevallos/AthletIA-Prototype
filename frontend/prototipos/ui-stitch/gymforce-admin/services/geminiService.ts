import { GoogleGenAI } from "@google/genai";

// Usa una API key de prueba o la del entorno
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateExerciseDescription = async (name: string, muscle: string, equipment: string): Promise<string> => {
  try {
    if (!genAI) {
      console.warn("API Key de Gemini no configurada");
      return `Ejercicio efectivo para trabajar ${muscle}. Utiliza ${equipment} para realizar el movimiento de forma controlada, manteniendo una técnica adecuada en todo momento.`;
    }

    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `Escribe una descripción corta y atractiva (máximo 2-3 oraciones) para un ejercicio de gimnasio llamado "${name}". 
      Trabaja el grupo muscular de ${muscle} y utiliza ${equipment}. 
      Enfócate en los beneficios y la forma correcta de ejecución. Responde solo en español.`,
    });
    
    return response.text?.trim() || `Ejercicio efectivo para trabajar ${muscle}.`;
  } catch (error) {
    console.error("Error generando descripción con Gemini:", error);
    return `Ejercicio efectivo para trabajar ${muscle}. Utiliza ${equipment} para realizar el movimiento de forma controlada, manteniendo una técnica adecuada en todo momento.`;
  }
};
