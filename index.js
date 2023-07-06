import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import {DataBase} from './sources/db.js'
import {MessagesHandler} from './sources/messages_handler.js'

dotenv.config()


const BOT_TOKEN = process.env.BOT_TOKEN;

const db = new DataBase();
const bot = new TelegramBot(BOT_TOKEN, {polling: true});
const tgMsgHandler = new MessagesHandler(bot, db)


bot.on('message', async (msg) => {
    // console.log(`message received: ${msg.photo}, ${msg.video}, ${msg.document}, ${msg.animation}`)
})

bot.on('text', async (msg) => {
    const chat_id = msg.chat.id;
    const text = msg.text;
    const from_user = {
        id: msg.from.id,
        username: msg.from.username,
    }

    if (!chat_id) {
        console.log('chat_id in msg is null');
        return;
    }

    if (text[0] === "/") {
        const arr = text.split(" ");
        const command = arr[0];

        if (command === '/start') {
            tgMsgHandler.handleStart(chat_id, from_user.username);
        }
    }



});


bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const sender = {
        id: callbackQuery.from.id,
        username: callbackQuery.from.username,
        action: callbackQuery.data,
        callback_id: callbackQuery.id,
    };
    const msg = callbackQuery.message;
    let opts = {
        caption: msg.text ? msg.text : msg.caption,
        chat_id: msg.chat.id,
        message_id: msg.message_id,
        text_type: `caption`,
    };

    if (sender.action === tgMsgHandler.callbackData.START) {
        tgMsgHandler.answerInlineStart(sender.id, sender.username)
    } else if (sender.action === tgMsgHandler.callbackData.ADD_KARMA) {
        const karma = 10;
        tgMsgHandler.answerInlineAddKarma(sender.id, karma)
    } else if (sender.action === tgMsgHandler.callbackData.GESAR_PART1) {
        tgMsgHandler.answerInlinePart1(sender.id)
    }

});