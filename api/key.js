export default function handler(req, res) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  return res.status(200).json({
    key: geminiKey || '',
    openai: hasOpenAI,
  });
}
