
import React from "react";
import { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { fetchAnswer } from "@/services/data";
import { Spinner } from "@heroui/spinner";
import ReactMarkdown from "react-markdown";

export default function AIForm() {
  const [promptLoading, setPromptLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const getAnswer = async () => {
    setPromptLoading(true);
    try {
      const res = await fetchAnswer(question);

      setAnswer(res.answer);
      setPromptLoading(false);
    } catch (error) {
      console.log(error);
      setAnswer("Failed to get answer");
      setPromptLoading(false);
    }
  };

  return (
    <Card className="w-full p-6">
      <CardHeader className="flex flex-col items-start">
        <h2 className="text-xl font-bold">Ask about your sales data</h2>
        <h3 className="text-sm text-default-400">Powered by Google Gemini</h3>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
        <div className="flex flex-row gap-2">
          <Input
            isClearable
            className="pb-6 w-full"
            placeholder="Get insight from the sales representatives data"
            value={question}
            variant="bordered"
            onChange={(e) => setQuestion(e.target.value)}
            onClear={() => setQuestion("")}
          />
          <Button
            disabled={question == "" || promptLoading ? true : false}
            onPress={() => getAnswer()}
          >
            Send
          </Button>
        </div>
        <div>
          {promptLoading ? (
            <Spinner />
          ) : (
            <ReactMarkdown>{answer}</ReactMarkdown>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
