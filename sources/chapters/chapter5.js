import { botUtils } from '../botUtils.js'
import { text } from "../consts/text.js"
import { pictures } from "../consts/media.js"
import { callbackData } from "../consts/callbackData.js"
import { getStoryButtons, getTestButtons } from "./utils.js"

export class Chapter5Handler {
    handleCallbackQuery(qry, params) {
        console.log(`Chapter5Handler.handleCallbackQuery:`, JSON.stringify(qry))
        if (qry.length >= 1) {
            switch (qry[0]) {
                case "1":
                    this.answerInlinePart1(qry.slice(1), params)
                    break
                case "2":
                    this.answerInlinePart2(qry.slice(1), params)
                    break
                case "3":
                    this.answerInlinePart3(qry.slice(1), params)
                    break
                case "test":
                    this.answerInlineTest(qry.slice(1), params)
                    break
            }
        }
    }

    answerInlinePart1(qry, params) {
        console.log(`Chapter5Handler.answerInlinePart1:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART4_TEST_0, `Назад`,
                    callbackData.GESAR_PART5_1_2, `Что сделал Гэсэр?`
                ),
                picture: pictures.PART5_1_PIC,
                text: text.PART5_1_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART5_1_1, `Назад`,
                    callbackData.GESAR_PART5_2_1, `Что было дальше?`
                ),
                picture: pictures.PART5_1_PIC,
                text: text.PART5_1_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart2(qry, params) {
        console.log(`Chapter5Handler.answerInlinePart2:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART5_1_2, `Назад`,
                    callbackData.GESAR_PART5_2_2, `Гэсэр добрался до сердца?`
                ),
                picture: pictures.PART5_2_PIC,
                text: text.PART5_2_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART5_2_1, `Назад`,
                    callbackData.GESAR_PART5_3_1, `Гэсэр наказал предателей?`
                ),
                picture: pictures.PART5_2_PIC,
                text: text.PART5_2_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart3(qry, params) {
        console.log(`Chapter5Handler.answerInlinePart3:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART5_2_2, `Назад`,
                        callbackData.GESAR_PART5_3_2, `Полезная вещица`
                    ),
                picture: pictures.PART5_3_PIC,
                text: text.PART5_3_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART5_3_1, `Назад`,
                        callbackData.GESAR_PART5_TEST_0, `Вот это приключения!`
                    ),
                picture: pictures.PART5_3_PIC,
                text: text.PART5_3_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlineTest(qry, params) {
        let answerData = {}

        if (qry[0] === "0") {
            answerData = this.getTest0Data(qry)
        } else if (qry[0] === "1") {
            answerData = this.getTest1Data(qry, params)
        } else if (qry[0] === "2") {
            answerData = this.getTest2Data(qry, params)
        } else if (qry[0] === "no") {
            botUtils.answerCallback(params.callbackId, text.TEST_QUERY_no)
            return
        }

        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    getTest0Data(query) {
        return {
            buttons: getStoryButtons(
                    callbackData.GESAR_PART5_3_2, `Назад`,
                    callbackData.GESAR_PART5_TEST_1, `Первый вопрос`
                ),
            picture: pictures.ARSALAN_FRONT,
            text: "_Мы и дошли до конца пятой ветви. Теперь вопросы!_",
        }
    }

    getTest1Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `Три километра`, callbackData.GESAR_PART5_TEST_no,
                    `40 верст`, callbackData.GESAR_PART5_TEST_1_yes,
                    `Четыре гектара`, callbackData.GESAR_PART5_TEST_no,
                    `Полтора акра`, callbackData.GESAR_PART5_TEST_no,
                ),
                text: "_Какого размера достигало страшное чудовище Орголи?_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons:[
                        [
                            {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART5_TEST_2},
                        ]
                    ],
                    text: "_Верно, чудовище Орголи достигало 40 верст!_",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }

    getTest2Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `Скинул в реку`, callbackData.GESAR_PART5_TEST_no,
                    `Оставил в лесу`, callbackData.GESAR_PART5_TEST_no,
                    `Сбросил в яму`, callbackData.GESAR_PART5_TEST_no,
                    `Порезал пальцы мечом`, callbackData.GESAR_PART5_TEST_2_yes,
                ),
                text: "_Как проучил Гэсэр предателя Хара-Зутана во время прогулки к Хану Уса-Лосону за искоренением 4-х коварств?_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons: getStoryButtons(
                        callbackData.GESAR_PART5_TEST_0, `Назад`,
                        callbackData.GESAR_PART6_1_1, `Ветвь 6`
                    ),
                    text: "Правильно! Вот и пятая Ветвь приключений Гэсэра позади.",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }

}