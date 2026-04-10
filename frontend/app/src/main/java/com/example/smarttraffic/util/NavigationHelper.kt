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
import com.example.smarttraffic.ui.sign.SignListActivity
import com.example.smarttraffic.ui.simulation.SimulationListActivity

object NavigationHelper {

    fun setupBottomNav(activity: Activity, currentId: Int) {
        val navHome = activity.findViewById<View>(R.id.navHome)
        val navLaw = activity.findViewById<View>(R.id.navLaw)
        val navSign = activity.findViewById<View>(R.id.navSign)
        val navSimulation = activity.findViewById<View>(R.id.navSimulation)
        val navProfile = activity.findViewById<View>(R.id.navProfile)

        navHome?.setOnClickListener {
            if (activity !is HomeActivity) {
                val intent = Intent(activity, HomeActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                activity.startActivity(intent)
                activity.finish()
            }
        }

        navLaw?.setOnClickListener {
            if (activity !is LawListActivity) {
                val intent = Intent(activity, LawListActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                activity.startActivity(intent)
                activity.finish()
            }
        }

        navSign?.setOnClickListener {
            if (activity !is SignListActivity) {
                val intent = Intent(activity, SignListActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                activity.startActivity(intent)
                activity.finish()
            }
        }

        navSimulation?.setOnClickListener {
            if (activity !is SimulationListActivity) {
                val intent = Intent(activity, SimulationListActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                activity.startActivity(intent)
                activity.finish()
            }
        }

        navProfile?.setOnClickListener {
            if (activity !is ProfileActivity) {
                val intent = Intent(activity, ProfileActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP
                activity.startActivity(intent)
                activity.finish()
            }
        }

        // Highlight active item
        val activeColor = activity.getColor(R.color.primary)
        when (currentId) {
            R.id.navHome -> setActive(activity, R.id.ivHome, R.id.tvHome, activeColor)
            R.id.navLaw -> setActive(activity, R.id.ivLaw, R.id.tvLaw, activeColor)
            R.id.navSign -> setActive(activity, R.id.ivSign, R.id.tvSign, activeColor)
            R.id.navSimulation -> setActive(activity, R.id.ivSimulation, R.id.tvSimulation, activeColor)
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
}
