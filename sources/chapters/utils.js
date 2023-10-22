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