import OpenAI from 'openai';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY
});

export const POST = (async ({ request }) => {
    try {
        const { messages } = await request.json();
        
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages.map((message: any) => ({
                content: message.content,
                role: message.role,
            })),
        });

        console.log('completion:', completion);
        console.log('completion.data.choices[0].message:', completion.choices[0].message);
        return json(completion.choices[0].message);
    } catch (error) {
        console.error('OpenAI API Error:', error);
        return json({ error: 'Failed to get response from OpenAI' }, { status: 500 });
    }
}) satisfies RequestHandler;
