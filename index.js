const BaleBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '2006942615:2xwO8Ldhbm5UfSNFKMRIX89Duj6vITHg9AGtAJm7'; // your bale bot token

const options = {
    baseApiUrl: 'https://tapi.bale.ai',
};

const bot = new BaleBot(token, options);

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const msg_id = msg.message_id;
    await bot.sendMessage(chatId, 'سلام این ربات توسط\n@Devehsan\nطراحی و توسعه داده شده است برای جشنواره خوارزمی نویسنده ربات:\nاحسان فضلی', {
        reply_to_message_id: msg_id
    });
});

bot.on('message', async (msg) => {
    if (msg.text.toString().toLowerCase().indexOf('/start') === 0) {
        return;
    }

    const chatId = msg.chat.id;
    const userText = msg.text;
    const msg_id = msg.message_id;

    const please = await bot.sendMessage(chatId, 'لطفا کمی صبر کنید...', {
        reply_to_message_id: msg_id
    });

    try {
        const response = await axios.get(`https://req.wiki-api.ir/apis-2/ChatGPT4?q=${userText}`)


    if (response.status === 200) {
        const replyText = response.data.results;
        await bot.editMessageText(replyText, {
            chat_id: chatId,
            message_id: please.message_id
        });
    } else {

        throw new Error('متاسفانه خطایی رخ داده است.');
    }
} catch (error) {
    await bot.editMessageText('متاسفانه خطایی رخ داده است.', {
        chat_id: chatId,
        message_id: please.message_id
    });
}
});

bot.startPolling();
