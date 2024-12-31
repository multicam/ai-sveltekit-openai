import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createChatCompletion } from '$lib/services/openai';
import type { Message } from '$lib/types/chat';

export const POST = (async ({ request }) => {
    try {
        const { messages } = await request.json();
        const response = await createChatCompletion(messages as Message[]);
        return json(response);
    } catch (error) {
        console.error('OpenAI API Error:', error);
        return json({ error: 'Failed to get response from OpenAI' }, { status: 500 });
    }
}) satisfies RequestHandler;
