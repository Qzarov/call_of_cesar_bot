import TelegramBot from 'node-telegram-bot-api';
import fs from "fs";
import dotenv from 'dotenv';
dotenv.config()


export class BotUtils {
    constructor(bot) {
        this.bot = bot
    }

    sendPhoto(chatId, photo_path, buttons, caption) {
        const photo = fs.createReadStream(photo_path)
        this.bot.sendPhoto(chatId, photo, {
            caption: caption,
            parse_mode: `Markdown`,
            reply_markup: {
                inline_keyboard: buttons
            }
        }).then(r => r)
    }

    deleteAndSendPhoto(chatId, messageId, photo_path, buttons, caption) {
        this.bot.deleteMessage(chatId, messageId).then(r => r)

        const photo = fs.createReadStream(photo_path)
        this.bot.sendPhoto(chatId, photo, {
            caption: caption,
            parse_mode: `Markdown`,
            reply_markup: {
                inline_keyboard: buttons
            }
        }).then(r => r)
    }

    deleteAndSendAudio(chatId, messageId, audio_path, buttons, caption) {
        this.bot.deleteMessage(chatId, messageId).then(r => r)

        const audio = fs.createReadStream(audio_path)
        this.bot.sendAudio(chatId, audio, {
            caption: caption,
            parse_mode: `Markdown`,
            reply_markup: {
                inline_keyboard: buttons
            }
        }).then(r => r)
    }

    editReplyMarkupOnly(chatId, messageId, buttons) {
        const reply_markup = {
            inline_keyboard: buttons
        }
        const message_id_spec = {
            chat_id: chatId,
            message_id: messageId
        }
        this.bot.editMessageReplyMarkup(reply_markup, message_id_spec).then(r => r)
    }

    editReplyMarkupAndCaption(chatId, messageId, buttons, caption) {
        const reply_markup = {
            inline_keyboard: buttons
        }
        const message_id_spec = {
            parse_mode: `Markdown`,
            chat_id: chatId,
            message_id: messageId
        }

        this.bot.editMessageReplyMarkup(reply_markup, message_id_spec).then(r => r)
        this.bot.editMessageCaption(caption, message_id_spec).then(r => r)
    }

    answerCallback(callbackId, message) {
        this.bot.answerCallbackQuery(callbackId, {text: message}).then(r => r)
    }
}

const token = process.env.BOT_TOKEN
export const bot = new TelegramBot(token, {polling: true});
export const botUtils = new BotUtils(bot)