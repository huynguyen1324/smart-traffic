/**
 * @file B2600Questions.js
 * @description Model định nghĩa cấu trúc thực thể dữ liệu của B2600Questions.
 * @module Backend
 */

/**
 * Lớp B2600Questions
 * Model định nghĩa cấu trúc thực thể dữ liệu của B2600Questions.
 */
class B2600Questions {
    constructor(id, type, type_category_id, test_number, image_url, description_text, option_a, option_b, option_c, option_d, correct_option, explanation) {
        this.id = id;
        this.type = type;
        this.type_category_id = type_category_id;
        this.test_number = test_number;
        this.image_url = image_url;
        this.description_text = description_text;
        this.option_a = option_a;
        this.option_b = option_b;
        this.option_c = option_c;
        this.option_d = option_d;
        this.correct_option = correct_option;
        this.explanation = explanation;
    }
}
module.exports = B2600Questions;
