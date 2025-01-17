<script lang="ts">
    import type { Message } from '$lib/types/chat';
    
    export let message: Message;

    $: isUser = message.role === 'user';
    $: messageClass = isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800';
</script>

<div class={`flex ${isUser ? 'justify-end' : 'justify-start'} p-4 my-2`}>
    <div class={`${messageClass} rounded-lg px-4 py-2 max-w-[80%] break-words`}>
        {message.content}
    </div>
</div>
