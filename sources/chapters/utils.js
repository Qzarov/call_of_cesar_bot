import { constButtons } from "../consts/buttons.js"

export function getStoryButtons(prev_step, prev_step_text, next_step, next_step_text) {
    return [
        [
            {text: next_step_text, callback_data: next_step},
        ],
        [
            {text: prev_step_text, callback_data: prev_step},
            constButtons.main_menu_button
        ]
    ]
}

export function getTestButtons(text1, callback1, text2, callback2, text3, callback3, text4, callback4) {
    return [
        [
            { text: text1, callback_data: callback1 },
            { text: text2, callback_data: callback2 },
        ],
        [
            { text: text3, callback_data: callback3 },
            { text: text4, callback_data: callback4 },
        ]
    ]
}