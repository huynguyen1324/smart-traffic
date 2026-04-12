package com.example.smarttraffic.util

import android.app.Activity
import android.content.Intent
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.home.HomeActivity
import com.example.smarttraffic.ui.lesson.LawListActivity
import com.example.smarttraffic.ui.profile.ProfileActivity
import com.example.smarttraffic.ui.quiz.QuizMenuActivity
import com.example.smarttraffic.ui.sign.SignListActivity

object NavigationHelper {

    fun setupBottomNav(activity: Activity, currentId: Int) {
        val navHome = activity.findViewById<View>(R.id.navHome)
        val navLaw = activity.findViewById<View>(R.id.navLaw)
        val navSign = activity.findViewById<View>(R.id.navSign)
        val navQuiz = activity.findViewById<View>(R.id.navQuiz)
        val navProfile = activity.findViewById<View>(R.id.navProfile)

        navHome?.setOnClickListener {
            if (activity !is HomeActivity) {
                navigateTo(activity, HomeActivity::class.java, true)
            }
        }

        navLaw?.setOnClickListener {
            if (activity !is LawListActivity) {
                navigateTo(activity, LawListActivity::class.java, true)
            }
        }

        navSign?.setOnClickListener {
            if (activity !is SignListActivity) {
                navigateTo(activity, SignListActivity::class.java, true)
            }
        }

        navQuiz?.setOnClickListener {
            if (activity !is QuizMenuActivity) {
                navigateTo(activity, QuizMenuActivity::class.java, true)
            }
        }

        navProfile?.setOnClickListener {
            if (activity !is ProfileActivity) {
                navigateTo(activity, ProfileActivity::class.java, true)
            }
        }

        // Highlight active item
        val activeColor = activity.getColor(R.color.primary)
        when (currentId) {
            R.id.navHome -> setActive(activity, R.id.ivHome, R.id.tvHome, activeColor)
            R.id.navLaw -> setActive(activity, R.id.ivLaw, R.id.tvLaw, activeColor)
            R.id.navSign -> setActive(activity, R.id.ivSign, R.id.tvSign, activeColor)
            R.id.navQuiz -> setActive(activity, R.id.ivQuiz, R.id.tvQuiz, activeColor)
            R.id.navProfile -> setActive(activity, R.id.ivProfile, R.id.tvProfile, activeColor)
        }
    }

    private fun setActive(activity: Activity, iconId: Int, textId: Int, color: Int) {
        activity.findViewById<ImageView>(iconId)?.setColorFilter(color)
        activity.findViewById<TextView>(textId)?.let {
            it.setTextColor(color)
            it.typeface = android.graphics.Typeface.DEFAULT_BOLD
        }
    }

    fun navigateTo(activity: Activity, destination: Class<*>, clearTop: Boolean = false) {
        val intent = Intent(activity, destination)
        if (clearTop) {
            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
        }
        activity.startActivity(intent)
    }
}
