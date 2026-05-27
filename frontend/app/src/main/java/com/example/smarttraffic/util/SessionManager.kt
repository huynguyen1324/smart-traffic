package com.example.smarttraffic.util

import android.content.Context
import android.content.SharedPreferences

/**
 * Lớp tiện ích (Utility) cung cấp các phương thức dùng chung như SessionManager.
 */
class SessionManager(context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences("UserPrefs", Context.MODE_PRIVATE)

    var userId: Int
        get() = prefs.getInt("USER_ID", -1)
        set(value) = prefs.edit().putInt("USER_ID", value).apply()

    var userName: String
        get() = prefs.getString("USER_NAME", "") ?: ""
        set(value) = prefs.edit().putString("USER_NAME", value).apply()

    var learningGoal: String
        get() = prefs.getString("LEARNING_GOAL", "b2")?.lowercase() ?: "b2"
        set(value) = prefs.edit().putString("LEARNING_GOAL", value).apply()

    var userAvatar: String
        get() = prefs.getString("USER_AVATAR", "default-male.png") ?: "default-male.png"
        set(value) = prefs.edit().putString("USER_AVATAR", value).apply()

    val isLoggedIn: Boolean
        get() = userId != -1

        /**
     * Thực hiện đăng xuất tài khoản, xóa toàn bộ thông tin phiên làm việc khỏi bộ nhớ.
     */
    fun logout() {
        prefs.edit().clear().apply()
    }

        /**
     * Lưu trữ phiên đăng nhập của người dùng vào SharedPreferences cục bộ của thiết bị.
     * @param id Mã định danh người dùng
     * @param name Tên đầy đủ hiển thị
     * @param goal Mục tiêu bằng lái (a1 hoặc b2)
     */
    fun saveLogin(id: Int, name: String, goal: String) {
        prefs.edit()
            .putInt("USER_ID", id)
            .putString("USER_NAME", name)
            .putString("LEARNING_GOAL", goal)
            .apply()
    }
}
