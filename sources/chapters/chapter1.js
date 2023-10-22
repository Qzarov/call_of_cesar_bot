import { botUtils } from '../botUtils.js'
import { text } from "../consts/text.js"
import { pictures } from "../consts/media.js"
import { callbackData } from "../consts/callbackData.js"
import { getStoryButtons } from "./utils.js"
import { constButtons } from "../consts/buttons.js"

export class Chapter1Handler {
    handleCallbackQuery(qry, params) {
        console.log(`Chapter1Handler.handleCallbackQuery:`, JSON.stringify(qry))
        if (qry.length >= 1) {
            switch (qry[0]) {
                case "1":
                    console.log(`Chapter1Handler.handleCallbackQuery.answerInlinePart1`)
                    this.answerInlinePart1(qry.slice(1), params)
                    break
                case "2":
                    console.log(`Chapter1Handler.handleCallbackQuery.answerInlinePart2`)
                    this.answerInlinePart2(qry.slice(1), params)
                    break
                case "3":
                    console.log(`Chapter1Handler.handleCallbackQuery.answerInlinePart3`)
                    this.answerInlinePart3(qry.slice(1), params)
                    break
                case "test":
                    console.log(`Chapter1Handler.handleCallbackQuery.answerInlineTest`)
                    this.answerInlineTest(qry.slice(1), params)
                    break
            }
        }
    }

    answerInlinePart1(qry, params) {
        console.log(`Chapter1Handler.answerInlinePart1:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {
            buttons: getStoryButtons(callbackData.BACK_TO_QUEST_START, `Назад`, callbackData.GESAR_PART1_2_1, `Далее`),
            picture: pictures.PART1_1_PIC,
            text: text.PART1_1_TEXT,
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart2(qry, params) {
        console.log(`Chapter1Handler.answerInlinePart2:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(callbackData.GESAR_PART1_1, `Назад`, callbackData.GESAR_PART1_2_2, `Далее`),
                picture: pictures.PART1_2_PIC,
                text: text.PART1_2_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(callbackData.GESAR_PART1_2_1, `Назад`, callbackData.GESAR_PART1_3, `Что сделали небожители?`),
                picture: pictures.PART1_2_PIC,
                text: text.PART1_2_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart3(qry, params) {
        console.log(`Chapter1Handler.answerInlinePart3:`, JSON.stringify(qry), JSON.stringify(params))

        const answerData = {
            buttons: getStoryButtons(callbackData.GESAR_PART1_2_2, `Назад`, callbackData.GESAR_PART1_TEST_0, `Далее`),
            picture: pictures.PART1_3_PIC,
            text: text.PART1_3_TEXT,
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
            buttons: getStoryButtons(callbackData.GESAR_PART1_3, `Назад`, callbackData.GESAR_PART1_TEST_1, `Первый вопрос`),
            picture: pictures.ARSALAN_FRONT,
            text: "_Давай проверим твою внимательность. Ответь на два вопроса по Ветви 1._",
        }
    }

    getTest1Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: [
                    [
                        {text: `Крестьянином`, callback_data: callbackData.GESAR_PART1_TEST_no},
                        {text: `Волшебником`, callback_data: callbackData.GESAR_PART1_TEST_no},
                    ],
                    [
                        {text: `Богатырем`, callback_data: callbackData.GESAR_PART1_TEST_1_yes},
                        {text: `Князем`, callback_data: callbackData.GESAR_PART1_TEST_no},
                    ]
                ],
                text: "_Кем был главный герой, до того, как спустился на землю?_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons:[
                        [
                            {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART1_TEST_2},
                        ]
                    ],
                    text: "_Главный герой Гэсэр действительно был богатырем, который спустился на землю, чтобы спасти людей от злых сил._",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }

    getTest2Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: [
                    [
                        {text: `Хан-Хурмас`, callback_data: callbackData.GESAR_PART1_TEST_no},
                        {text: `Эсэгэ-Малан`, callback_data: callbackData.GESAR_PART1_TEST_2_yes},
                    ],
                    [
                        {text: `Бухэ-Бэлигтэ`, callback_data: callbackData.GESAR_PART1_TEST_no},
                        {text: `Атай-Улан`, callback_data: callbackData.GESAR_PART1_TEST_no},
                    ]
                ],
                text: "_Как звали верховного Тэнгрия, отца всех богов?_",
                picture: pictures.ARSALAN_FRONT,
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons:[
                        [
                            {text: `Навстречу приключениям! (Ветвь 2)`, callback_data: callbackData.GESAR_PART2_1_1},
                        ],
                        [
                            {text: `Видео-чтение о Ветви 1`, url: "https://www.youtube.com/watch?v=GtsAWH2FM0w"},
                        ],
                        [
                            {text: `Назад`, callback_data: callbackData.GESAR_PART1_TEST_0},
                            constButtons.main_menu_button
                        ],
                    ],
                    text: "_Отлично! Испытание по Ветви 1 пройдено, продолжай Путь Героя!_",
                    picture: pictures.ARSALAN_FRONT,
                }
            } else if (query[1] === "no") {}
        }
    }
    
}