import React from 'react';
// import '../components/style/chatBot.css'
const Chatbot = () => {
    return (
        <div className='botContainer'>
            <iframe
                title="chatbotPage"
                src="http://localhost/hoizty%20chat-bot/bot.php"
                width="100%"
                height="600px"

            />
        </div>
    );
};

export default Chatbot;

