<script lang="ts">
    import type { Message } from '$lib/types/chat';
    
    export let message: Message;
</script>

<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
    <div class="{message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} rounded-lg px-4 py-2 max-w-[80%] break-words">
        {message.content}
    </div>
</div>

<style>
    .flex {
        padding: 1rem;
        margin: 0.5rem 0;
    }

    .rounded-lg {
        border-radius: 0.5rem;
    }

    .px-4 {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .py-2 {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }

    .max-w-\[80\%\] {
        max-width: 80%;
    }

    .break-words {
        word-wrap: break-word;
    }
</style>
