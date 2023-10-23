import { botUtils } from '../botUtils.js'
import { text } from "../consts/text.js"
import { pictures } from "../consts/media.js"
import { callbackData } from "../consts/callbackData.js"
import { getStoryButtons, getTestButtons } from "./utils.js"

export class Chapter8Handler {
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
                case "4":
                    this.answerInlinePart4(qry.slice(1), params)
                    break
                case "test":
                    this.answerInlineTest(qry.slice(1), params)
                    break
            }
        }
    }

    answerInlinePart1(qry, params) {
        console.log(`Chapter8Handler.answerInlinePart1:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART7_TEST_0, `Назад`, 
                        callbackData.GESAR_PART8_1_2, `Что они задумали?`
                    ),
                picture: pictures.PART8_1_PIC,
                text: text.PART8_1_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART8_1_1, `Назад`, 
                        callbackData.GESAR_PART8_2_1, `Сомнительно, что это сработает`
                    ),
                picture: pictures.PART8_1_PIC,
                text: text.PART8_1_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart2(qry, params) {
        console.log(`Chapter8Handler.answerInlinePart2:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART8_1_2, `Назад`,
                    callbackData.GESAR_PART8_2_2, `Жестоко...`
                ),
                picture: pictures.PART8_2_PIC,
                text: text.PART8_2_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART8_2_1, `Назад`,
                    callbackData.GESAR_PART8_2_3, `Каких преград?`
                ),
                picture: pictures.PART8_2_PIC,
                text: text.PART8_2_2_TEXT
            }
        } else if (qry[0] === "3") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART8_2_2, `Назад`,
                    callbackData.GESAR_PART8_3_1, `Кто же так?`
                ),
                picture: pictures.PART8_2_PIC,
                text: text.PART8_2_3_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart3(qry, params) {
        console.log(`Chapter8Handler.answerInlinePart3:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART8_2_3, `Назад`,
                        callbackData.GESAR_PART8_3_2, `#спасемгэсэра`
                    ),
                picture: pictures.PART8_3_PIC,
                text: text.PART8_3_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART8_3_1, `Назад`,
                        callbackData.GESAR_PART8_4_1, `Тоже хочу такой можжевельник`
                    ),
                picture: pictures.PART8_3_PIC,
                text: text.PART8_3_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart4(qry, params) {
        console.log(`Chapter8Handler.answerInlinePart3:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART8_3_2, `Назад`,
                        callbackData.GESAR_PART8_4_2, `Надежный план`
                    ),
                picture: pictures.PART8_4_PIC,
                text: text.PART8_4_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART8_4_1, `Назад`,
                        callbackData.GESAR_PART8_TEST_0, `Ура!`
                    ),
                picture: pictures.PART8_4_PIC,
                text: text.PART8_4_2_TEXT
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
                    callbackData.GESAR_PART8_4_2, `Назад`, 
                    callbackData.GESAR_PART8_TEST_1, `Первый вопрос`
                ),
            picture: pictures.ARSALAN_FRONT,
            text: "_На этом восьмая ветвь подходит к концу._",
        }
    }

    getTest1Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `Две сестры, в младшую`, callbackData.GESAR_PART8_TEST_no,
                    `Три сестры, в старшую`, callbackData.GESAR_PART8_TEST_1_yes,
                    `Две сестры, в старшую`, callbackData.GESAR_PART8_TEST_no,
                    `Три сестры, в младшую`, callbackData.GESAR_PART8_TEST_no,
                ),
                text: "_Сколько сестер было у черта Лобсоголдоя и в какую из них превращалась Алма-Мэргэн для спасения Гэсэра?_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons:[
                        [
                            {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART8_TEST_2},
                        ]
                    ],
                    text: "_У черта Лобсоголдоя было три сестры и Алма-Мэргэн превращалась в старшую_",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }

    getTest2Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `Обессилели от долгой дороги`, callbackData.GESAR_PART8_TEST_no,
                    `Поняли, что не пришло время. `, callbackData.GESAR_PART8_TEST_no,
                    `Прочитали в Книге Судеб`, callbackData.GESAR_PART8_TEST_2_yes,
                    `Стали болеть в пути`, callbackData.GESAR_PART8_TEST_no,
                ),
                text: "_Почему Заса-Мэргэн с войском баторов не смог вызволить Гэсэра из плена Лобсоголдоя? _",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons: getStoryButtons(
                        callbackData.GESAR_PART8_TEST_0, `Назад`,
                        callbackData.QUEST_END, `Конец?`
                    ),
                    text: "_Вы прошли испытание по Ветви 8!_",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }
}