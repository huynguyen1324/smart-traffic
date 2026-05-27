/**
 * @file A1250Questions.js
 * @description Model định nghĩa cấu trúc thực thể dữ liệu của A1250Questions.
 * @module Backend
 */

/**
 * Lớp A1250Questions
 * Model định nghĩa cấu trúc thực thể dữ liệu của A1250Questions.
 */
class A1250Questions {
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
module.exports = A1250Questions;
