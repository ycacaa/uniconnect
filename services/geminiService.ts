import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCampusResponse = async (prompt: string): Promise<string> => {
  if (!apiKey) {
    return "Maaf, kunci API belum dikonfigurasi. Hubungi administrator.";
  }

  try {
    const model = "gemini-2.5-flash";
    const systemInstruction = `Anda adalah 'UniConnect AI', asisten virtual cerdas untuk mahasiswa.
    Tugas anda adalah membantu mahasiswa dengan masalah sehari-hari seperti:
    - Mencari kos murah
    - Tips hemat uang saku
    - Cara belajar efektif
    - Rekomendasi makanan di sekitar kampus
    
    Jawab dengan gaya bahasa yang santai, ramah, dan khas anak muda Indonesia (menggunakan istilah seperti 'kak', 'guys', 'bestie' jika cocok).
    Jaga jawaban tetap ringkas (maksimal 3 paragraf).`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Maaf, saya sedang tidak bisa berpikir sekarang.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Terjadi kesalahan saat menghubungi server AI. Coba lagi nanti ya!";
  }
};