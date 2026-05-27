/**
 * @file LawCategories.js
 * @description Model định nghĩa cấu trúc thực thể dữ liệu của LawCategories.
 * @module Backend
 */

/**
 * Lớp LawCategories
 * Model định nghĩa cấu trúc thực thể dữ liệu của LawCategories.
 */
class LawCategories {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
module.exports = LawCategories;
