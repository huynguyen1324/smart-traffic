package com.example.smarttraffic.ui.simulation

import android.content.Intent
import android.os.Bundle
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R

class SimulationDetailActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_simulation_detail)

        findViewById<LinearLayout>(R.id.optionA).setOnClickListener {
            startActivity(Intent(this, SimulationResultActivity::class.java))
        }
        findViewById<LinearLayout>(R.id.optionB).setOnClickListener {
            startActivity(Intent(this, SimulationResultActivity::class.java))
        }
        findViewById<LinearLayout>(R.id.optionC).setOnClickListener {
            startActivity(Intent(this, SimulationResultActivity::class.java))
        }
    }
}