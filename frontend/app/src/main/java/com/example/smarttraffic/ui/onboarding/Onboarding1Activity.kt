package com.example.smarttraffic.ui.onboarding

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.auth.LoginActivity
import com.google.android.material.button.MaterialButton

class Onboarding1Activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_onboarding_1)

        findViewById<MaterialButton>(R.id.btnNext).setOnClickListener {
            startActivity(Intent(this, Onboarding2Activity::class.java))
        }

        findViewById<View>(R.id.tvSkip).setOnClickListener {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}