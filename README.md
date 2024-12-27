# GEMINI on your Terminal

## Overview

GEMINI in command-line and coding assistant designed to keep you productive without ever leaving your terminal. With GEMINI, you can quickly find answers to technical questions or engage in interactive sessions to solve complex problems right from the command line.  

## Installation  

Follow these steps to set up GEMINI:  

```bash
npm i -g gemini-llm-cli
```

1. **Create a GEMINI API Key**  
   - Visit the [GEMINI API Key Page](https://aistudio.google.com/apikey) to generate your unique API key.  

2. **Run GEMINI**  
   - Start the program by typing the following command in your terminal:  
     ```bash  
     chat  
     ```  

3. **Configure Your API Key**  
   - On your first run, GEMINI will prompt you to enter your API key. Simply paste the key into the prompt, and you’re ready to go!  

## Usage  

### Quick Answers  

Get instant help with specific topics or commands by providing your query directly in the terminal:  
```bash  
chat tailwindcss border radius  
```  

### Interactive Chat Sessions  

Engage in a full conversation or problem-solving session by launching GEMINI without any additional arguments:  
```bash  
chat  
```  

### Tunning and custom system prompt
Open node_modules source file (use ```which chat``` to easier find) and open the main .env file, change the SYSTEM variable to your desired system prompt.

```bash
SYSTEM="You are helpfull command line assistant"
```

## Features  

- **Seamless Integration**: Access GEMINI directly from your terminal for maximum productivity.  
- **Quick Queries**: Instantly retrieve answers without disrupting your workflow.  
- **Interactive Sessions**: Solve complex problems or ask detailed questions in a chat format.  
- **Easy Setup**: Configure once, use effortlessly every time.  
