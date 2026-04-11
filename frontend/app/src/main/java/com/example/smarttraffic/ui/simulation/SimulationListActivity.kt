package com.example.smarttraffic.ui.simulation

import android.content.Intent
import android.os.Bundle
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R

class SimulationListActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_simulation_list)

        findViewById<android.view.View>(R.id.btnBack)?.setOnClickListener {
            com.example.smarttraffic.util.NavigationHelper.navigateTo(this, com.example.smarttraffic.ui.home.HomeActivity::class.java, true)
        }

        findViewById<LinearLayout>(R.id.itemTrafficLight).setOnClickListener {
            startActivity(Intent(this, SimulationDetailActivity::class.java))
        }

        findViewById<LinearLayout>(R.id.itemPedestrian).setOnClickListener {
            startActivity(Intent(this, SimulationDetailActivity::class.java))
        }

        // Standardized Bottom Nav
        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, R.id.navSimulation)
    }
}