class Laws {
    constructor(id, category_id, image_url, title, description, rules, warnings) {
        this.id = id;
        this.category_id = category_id;
        this.image_url = image_url;
        this.title = title;
        this.description = description;
        this.rules = rules;
        this.warnings = warnings;
    }
}
module.exports = Laws;
