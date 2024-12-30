#!/usr/bin/env node

import { appendFileSync } from "fs"
import { GoogleGenerativeAI } from "@google/generative-ai"
import 'dotenv/config'

if (!process.env.API_KEY) {
    process.stdout.write("API_KEY is required, please provide: ")
    process.stdin.on("data", (data) => {
        appendFileSync(".env", `API_KEY=${data.toString()}`)
        process.stdout.write("API_KEY is saved to .env file, let's chatting with `chat`\n")
        process.exit()
    })
} else {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const chat = model.startChat({})

    const args = process.argv.slice(2).join(" ")
    const chatHistory = []

    async function ask(args) {
        chatHistory.push('user: ' + args)
        const system = process.env.SYSTEM + chatHistory.join('\n\n')
        const res = await chat.sendMessageStream(system)
        let assist = ''
        for await (let msg of res.stream) {
            msg = msg.candidates[0].content.parts[0].text
            process.stdout.write(msg)
            assist += msg
        }
        chatHistory.push('system: ' + assist)
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
