export async function Chat35Turbo(openai, text) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `${text}` }]
    });

    return response;
}

export async function Chat4(openai, text) {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: `${text}` }],
    });

    return response;
}

export async function Chat35TurboFunctions(openai, text, functions) {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: `${text}` }],
        functions: functions,
    });

    return response;
}