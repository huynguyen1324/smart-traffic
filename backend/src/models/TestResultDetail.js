class TestResultDetail {
    constructor(id, test_result_id, question_id, chosen_option, correct) {
        this.id = id;
        this.test_result_id = test_result_id;
        this.question_id = question_id;
        this.chosen_option = chosen_option;
        this.correct = correct;
    }
}
module.exports = TestResultDetail;
