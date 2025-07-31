import React, { useEffect } from 'react'
//for chatbot
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';


function Chatbot() {

    //for chatbot
    useEffect(() => {
        createChat({
            webhookUrl: 'https://ddc-n8n.onrender.com/webhook/1241af5a-57d2-4114-97a6-8b932f0a13c4/chat',
            webhookConfig: {
                method: 'POST',
                headers: {}
            },
            target: '#n8n-chat',
            mode: 'window',
            chatInputKey: 'chatInput',
            chatSessionKey: 'sessionId',
            loadPreviousSession: true,
            metadata: {},
            showWelcomeScreen: false,
            defaultLanguage: 'en',
            initialMessages: [
                'Hi there! 👋',
            ],
            i18n: {
                en: {
                    title: 'Hi there! 👋',
                    subtitle: "Start a chat. We're here to help you 24/7.",
                    footer: '',
                    getStarted: 'New Conversation',
                    inputPlaceholder: 'Type your question..',
                },
            },
        });
    }, []);



    return (
        <div>
        </div>
    )
}

export default Chatbot
