<script lang="ts">
    import type { Message } from '$lib/types/chat';
    
    export let message: Message;
</script>

<div class="message {message.role}">
    <div class="content">
        {message.content}
    </div>
</div>

<style>
    .message {
        padding: 1rem;
        margin: 0.5rem 0;
        border-radius: 0.5rem;
    }

    .user {
        background-color: #e9ecef;
        margin-left: 2rem;
    }

    .assistant {
        background-color: #f8f9fa;
        margin-right: 2rem;
    }

    .content {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
</style>
