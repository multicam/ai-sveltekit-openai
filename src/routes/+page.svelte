<script>
	import { writable } from 'svelte/store';

	const messages = writable([]);
	const input = writable('');
	const isLoading = writable(false);

	const {log} = console

	async function handleSubmit(event) {
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
			log(data);
			$messages = [...$messages, data];
		} catch (error) {
			console.error('Chat error:', error);
			$messages = [...$messages, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }];
		} finally {
			$isLoading = false;
		}

		// Scroll to bottom
		setTimeout(() => {
			const chatContainer = document.querySelector('.chat-container');
			if (chatContainer) {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}
		}, 0);
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
			<div class="message {message.role}">
				<div class="role">{message.role}</div>
				<div class="content">{message.content}</div>
			</div>
		{/each}
		{#if $isLoading}
			<div class="message assistant loading">
				<div class="typing-indicator">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		{/if}
	</div>

	<form on:submit={handleSubmit} class="input-form">
		<input 
			bind:value={$input}
			placeholder="Type your message..."
			class="message-input"
			disabled={$isLoading}
		/>
		<button type="submit" class="send-button" disabled={$isLoading}>
			{$isLoading ? 'Sending...' : 'Send'}
		</button>
	</form>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		text-align: center;
		color: #333;
		margin-bottom: 2rem;
	}

	.chat-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
		max-height: 600px;
		overflow-y: auto;
		padding: 1rem;
		border: 1px solid #eee;
		border-radius: 8px;
	}

	.message {
		padding: 1rem;
		border-radius: 8px;
		max-width: 80%;
	}

	.message.assistant {
		background-color: #f0f4f8;
		margin-right: auto;
	}

	.message.user {
		background-color: #e3f2fd;
		margin-left: auto;
	}

	.role {
		font-weight: bold;
		margin-bottom: 0.5rem;
		color: #666;
		text-transform: capitalize;
	}

	.content {
		white-space: pre-wrap;
		line-height: 1.5;
	}

	.input-form {
		display: flex;
		gap: 1rem;
	}

	.message-input {
		flex: 1;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
	}

	.message-input:disabled {
		background-color: #f5f5f5;
		cursor: not-allowed;
	}

	.send-button {
		padding: 0.75rem 1.5rem;
		background-color: #2196f3;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.2s;
	}

	.send-button:hover:not(:disabled) {
		background-color: #1976d2;
	}

	.send-button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}

	.loading {
		padding: 0.5rem 1rem;
	}

	.typing-indicator {
		display: flex;
		gap: 4px;
		padding: 8px;
		justify-content: center;
	}

	.typing-indicator span {
		width: 8px;
		height: 8px;
		background-color: #90a4ae;
		border-radius: 50%;
		animation: bounce 1.4s infinite ease-in-out;
	}

	.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
	.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

	@keyframes bounce {
		0%, 80%, 100% { transform: scale(0); }
		40% { transform: scale(1); }
	}
</style>
