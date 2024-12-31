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

<div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">AI Chat</h1>
    
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div class="space-y-4 mb-6 max-h-[600px] overflow-y-auto">
            {#each $messages as message}
                <ChatMessage {message} />
            {/each}
            
            {#if $isLoading}
                <div class="text-center text-gray-500">
                    <div class="animate-pulse">Thinking...</div>
                </div>
            {/if}
        </div>

        <form on:submit={handleSubmit} class="flex gap-4">
            <input
                type="text"
                bind:value={$input}
                placeholder="Type your message..."
                disabled={$isLoading}
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
            <button 
                type="submit" 
                disabled={$isLoading}
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                Send
            </button>
        </form>
    </div>
</div>
