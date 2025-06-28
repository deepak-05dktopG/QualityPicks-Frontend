import React, { useEffect } from 'react'
//for chatbot
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';


function Chatbot() {

    //for chatbot
    useEffect(() => {
        createChat({
            webhookUrl: 'https://n8n-nsao.onrender.com/webhook/a48a9d27-e6d2-406b-a485-cef086ea3ec2/chat',
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
