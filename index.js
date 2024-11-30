#!/usr/bin/env node --env-file=D:\Coding\AI\gemini-llm-cli\.env

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
const chat = model.startChat({})

process.stdin.setEncoding("utf8")
process.stdout.write("Ask AI Gemini: ")

process.stdin.on("data", async (data) => {
    const system = "You will be provided mostly about terminal, command line and cli command prompt, list command or explain in concise way: " + data.trim()
    const res = await chat.sendMessageStream(system)
    for await (const msg of res.stream) {
        process.stdout.write(msg.candidates[0].content.parts[0].text)
    }
    process.stdout.write("Ask AI Gemini: ")
})

process.stdin.resume()
