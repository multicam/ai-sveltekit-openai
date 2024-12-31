<script lang="ts">
    import { writable } from 'svelte/store';
    import ChatMessage from '$lib/components/ChatMessage.svelte';
    import type { Message } from '$lib/types/chat';

    const messages = writable<Message[]>([]);
    const input = writable('');
    const isLoading = writable(false);

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const currentInput = $input;
        if (!currentInput.trim()) return;

        // Add user message
        $messages = [...$messages, { role: 'user', content: currentInput }];
        $input = '';
        $isLoading = true;

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: $messages
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            $messages = [...$messages, data];
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to get response. Please try again.');
        } finally {
            $isLoading = false;
        }
    }
</script>

<svelte:head>
	<title>AI Chat</title>
	<meta name="description" content="AI Chat with OpenAI" />
</svelte:head>

<div class="container">
    <h1>AI Chat</h1>
    
    <div class="chat-container">
        {#each $messages as message}
            <ChatMessage {message} />
        {/each}
        
        {#if $isLoading}
            <div class="loading">Loading...</div>
        {/if}
    </div>

    <form on:submit={handleSubmit} class="input-form">
        <input
            type="text"
            bind:value={$input}
            placeholder="Type your message..."
            disabled={$isLoading}
        />
        <button type="submit" disabled={$isLoading}>Send</button>
    </form>
</div>

<style>
    .container {
        margin: 0 auto;
        padding: 2rem;
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 2rem;
    }

    .chat-container {
        margin: 2rem 0;
        min-height: 300px;
        max-height: 600px;
        overflow-y: auto;
        padding: 1rem;
        border: 1px solid #eee;
        border-radius: 8px;
    }

    .loading {
        text-align: center;
        padding: 1rem;
        color: #666;
    }

    .input-form {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    input {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #0066cc;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
</style>
