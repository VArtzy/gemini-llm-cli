#!/usr/bin/env node

import { writeFileSync } from "fs"
import { GoogleGenerativeAI } from "@google/generative-ai"
import 'dotenv/config'

if (!process.env.API_KEY) {
    process.stdout.write("API_KEY is required, please provide: ")
    process.stdin.on("data", (data) => {
        writeFileSync(".env", `API_KEY=${data.toString()}`)
        process.stdout.write("API_KEY is saved to .env file, let's chatting with `chat`\n")
        process.exit()
    })
} else {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const chat = model.startChat({})

    const args = process.argv.slice(2).join(" ")

    async function ask(args) {
        const system = "You will be provided question mostly about programming, command line and terminal. List command or explain in concise way: " + args
        const res = await chat.sendMessageStream(system)
        for await (const msg of res.stream) {
            process.stdout.write(msg.candidates[0].content.parts[0].text)
        }
    }

    if (args) {
        await ask(args)
        process.exit()
    }

    process.stdin.setEncoding("utf8")
    process.stdout.write("Ask AI Gemini: ")

    process.stdin.on("data", async (data) => {
        await ask(data)
        process.stdout.write("Ask AI Gemini: ")
    })

    process.stdin.resume()
}
