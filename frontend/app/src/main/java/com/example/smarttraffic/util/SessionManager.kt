package com.example.smarttraffic.util

import android.content.Context
import android.content.SharedPreferences

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

    fun logout() {
        prefs.edit().clear().apply()
    }

    fun saveLogin(id: Int, name: String, goal: String) {
        prefs.edit()
            .putInt("USER_ID", id)
            .putString("USER_NAME", name)
            .putString("LEARNING_GOAL", goal)
            .apply()
    }
}
