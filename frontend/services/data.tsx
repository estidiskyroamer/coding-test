import { AIResponse } from "@/interfaces/ai";
import { SalesData } from "@/interfaces/sales";

export const fetchData = async (): Promise<SalesData> => {
  const res = await fetch("http://localhost:8000/api/data", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  const data: SalesData = await res.json();

  return data;
};

export const fetchAnswer = async (question: string): Promise<AIResponse> => {
  const res = await fetch("http://localhost:8000/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch AI response");
  }

  const data: AIResponse = await res.json();

  return data;
};
