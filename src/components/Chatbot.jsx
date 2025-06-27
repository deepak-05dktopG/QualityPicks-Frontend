import React, { useEffect } from 'react'
//for chatbot
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';


function Chatbot() {

    //for chatbot
    useEffect(() => {
        createChat({
            webhookUrl: 'http://localhost:5678/webhook/b7b6baea-1dd8-4839-a7da-711b3508f1e2/chat',
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
                'I’m Riya from QualityPicks 🛍️ Need help picking something awesome ? 😄'

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
