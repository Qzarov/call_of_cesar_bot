import { botUtils } from '../botUtils.js'
import { text } from "../consts/text.js"
import { pictures } from "../consts/media.js"
import { callbackData } from "../consts/callbackData.js"
import { getStoryButtons, getTestButtons } from "./utils.js"

export class Chapter7Handler {
    handleCallbackQuery(qry, params) {
        console.log(`Chapter7Handler.handleCallbackQuery:`, JSON.stringify(qry))
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
        console.log(`Chapter7Handler.answerInlinePart1:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART6_TEST_0, `Назад`, 
                        callbackData.GESAR_PART7_1_2, `Так ему и надо`
                    ),
                picture: pictures.PART7_1_PIC,
                text: text.PART7_1_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART7_1_1, `Назад`, 
                        callbackData.GESAR_PART7_1_3, `Что они сделали?`
                    ),
                picture: pictures.PART7_1_PIC,
                text: text.PART7_1_2_TEXT
            }
        } else if (qry[0] === "3") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART7_1_2, `Назад`, 
                        callbackData.GESAR_PART7_2_1, `Ужасно!`
                    ),
                picture: pictures.PART7_1_PIC,
                text: text.PART7_1_3_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart2(qry, params) {
        console.log(`Chapter7Handler.answerInlinePart2:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART7_1_2, `Назад`,
                    callbackData.GESAR_PART7_2_2, `Вот это любовь...`
                ),
                picture: pictures.PART7_2_PIC,
                text: text.PART7_2_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                    callbackData.GESAR_PART7_2_1, `Назад`,
                    callbackData.GESAR_PART7_3_1, `Гэсэр отомстит?`
                ),
                picture: pictures.PART7_2_PIC,
                text: text.PART7_2_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart3(qry, params) {
        console.log(`Chapter7Handler.answerInlinePart3:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART7_2_2, `Назад`,
                        callbackData.GESAR_PART7_3_2, `Что он задумал?`
                    ),
                picture: pictures.PART7_3_PIC,
                text: text.PART7_3_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART7_3_1, `Назад`,
                        callbackData.GESAR_PART7_4_1, `Хитро придумала!`
                    ),
                picture: pictures.PART7_3_PIC,
                text: text.PART7_3_2_TEXT
            }
        }
        botUtils.deleteAndSendPhoto(params.chatId, params.messageId, answerData.picture, answerData.buttons, answerData.text)
    }

    answerInlinePart4(qry, params) {
        console.log(`Chapter7Handler.answerInlinePart3:`, JSON.stringify(qry), JSON.stringify(params))
        let answerData = {}

        if (qry[0] === "1") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART7_3_2, `Назад`,
                        callbackData.GESAR_PART7_4_2, `Теперь можно победить демона`
                    ),
                picture: pictures.PART7_4_PIC,
                text: text.PART7_4_1_TEXT
            }
        } else if (qry[0] === "2") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART7_4_1, `Назад`,
                        callbackData.GESAR_PART7_4_3, `Она коварная...`
                    ),
                picture: pictures.PART7_4_PIC,
                text: text.PART7_4_2_TEXT
            }
        } else if (qry[0] === "3") {
            answerData = {
                buttons: getStoryButtons(
                        callbackData.GESAR_PART7_4_2, `Назад`,
                        callbackData.GESAR_PART7_TEST_0, `Ура!`
                    ),
                picture: pictures.PART7_4_PIC,
                text: text.PART7_4_3_TEXT
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
                    callbackData.GESAR_PART7_4_1, `Назад`, 
                    callbackData.GESAR_PART7_TEST_1, `Первый вопрос`
                ),
            picture: pictures.ARSALAN_FRONT,
            text: "_На этом седьмая ветвь подходит к концу, теперь - вопросы!_",
        }
    }

    getTest1Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `Друзья Гэсэра `, callbackData.GESAR_PART7_TEST_no,
                    `Жители лесной страны`, callbackData.GESAR_PART7_TEST_no,
                    `Злобные бесы`, callbackData.GESAR_PART7_TEST_1_yes,
                    `Нищие бродяги`, callbackData.GESAR_PART7_TEST_no,
                ),
                text: "_Кто такие шалмасы?_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons:[
                        [
                            {text: `Следующий вопрос`, callback_data: callbackData.GESAR_PART7_TEST_2},
                        ]
                    ],
                    text: "_Верно! Шалмасы - очень злобные бесы._",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }

    getTest2Data(query, params) {
        if (query.length === 1) {
            return {
                buttons: getTestButtons(
                    `Навестил Саргал-Ноёна`, callbackData.GESAR_PART7_TEST_no,
                    `Проведал баторов`, callbackData.GESAR_PART7_TEST_no,
                    `Устроил пир`, callbackData.GESAR_PART7_TEST_no,
                    `Приказал готовить коня`, callbackData.GESAR_PART7_TEST_2_yes,
                ),
                text: "_Что первым делом сделал Абай Гэсэр, когда оправился от тяжелой болезни?_",
                picture: pictures.ARSALAN_FRONT
            }
        } else if (query.length === 2) {
            if (query[1] === "yes") {
                botUtils.answerCallback(params.callbackId, text.TEST_QUERY_yes)
                return {
                    buttons: getStoryButtons(
                        callbackData.GESAR_PART7_TEST_0, `Назад`,
                        callbackData.GESAR_PART8_1_1, `Продолжить приключения! (Ветвь 3)`
                    ),
                    text: "_Вы прошли испытание по Ветви 7, скоро новое приключение!_",
                    picture: pictures.ARSALAN_FRONT
                }
            } else if (query[1] === "no") {}
        } 
    }
}