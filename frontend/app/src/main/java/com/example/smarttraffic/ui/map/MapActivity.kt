package com.example.smarttraffic.ui.map

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.home.HomeActivity
import com.example.smarttraffic.ui.lesson.LawListActivity
import com.example.smarttraffic.ui.profile.ProfileActivity

class MapActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_map)

        // Nút Back
        findViewById<View>(R.id.btnBack)?.setOnClickListener {
            finish()
        }

        // Bottom Navigation
        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, -1) // -1 or R.id.navMap if it existed
    }
}