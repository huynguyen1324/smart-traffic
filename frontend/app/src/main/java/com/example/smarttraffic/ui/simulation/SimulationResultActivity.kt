package com.example.smarttraffic.ui.simulation

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.google.android.material.button.MaterialButton

class SimulationResultActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_simulation_result)

        findViewById<MaterialButton>(R.id.btnNextScenario).setOnClickListener {
            startActivity(Intent(this, SimulationListActivity::class.java))
            finish()
        }
    }
}