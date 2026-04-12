class TestResults {
    constructor(data) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.test_id = data.test_id;
        this.license = data.license;
        this.total = data.total;
        this.correct = data.correct;
        this.wrong = data.wrong;
        this.unanswered = data.unanswered;
        this.created_at = data.created_at;
    }
}
module.exports = TestResults;
