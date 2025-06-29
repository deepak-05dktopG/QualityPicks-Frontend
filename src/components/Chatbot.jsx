import React, { useEffect } from 'react'
//for chatbot
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';


function Chatbot() {

    //for chatbot
    useEffect(() => {
        createChat({
            webhookUrl: 'https://primary-production-f74d.up.railway.app/webhook/5d5c5d39-78e3-420e-87fe-b7024753d33c/chat',
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
