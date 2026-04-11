class Users {
    constructor(id, full_name, email, phone, password, avatar_url, gendle, learning_goal) {
        this.id = id;
        this.full_name = full_name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.avatar_url = avatar_url;
        this.gendle = gendle;
        this.learning_goal = learning_goal;
    }
}
module.exports = Users;
