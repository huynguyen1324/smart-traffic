package com.example.smarttraffic.ui.splash

import android.animation.ValueAnimator
import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.view.animation.AccelerateDecelerateInterpolator
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.Guideline
import com.example.smarttraffic.R
import com.example.smarttraffic.ui.onboarding.Onboarding1Activity

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của Splash.
 */
class SplashActivity : AppCompatActivity() {

        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        preWarmScreens()

        val tvPercent = findViewById<TextView>(R.id.tvPercent)
        val guideProgress = findViewById<Guideline>(R.id.guideProgress)
        val logoCard = findViewById<android.view.View>(R.id.logoCard)

        startLogoPulse(logoCard)
        startRandomLoading(tvPercent, guideProgress)
    }

    private fun preWarmScreens() {
        Thread {
            val inflater = layoutInflater
            inflater.inflate(R.layout.activity_login, null)
            inflater.inflate(R.layout.activity_register, null)
        }.start()
    }

    private fun startLogoPulse(view: android.view.View) {
        view.animate()
            .scaleX(1.1f)
            .scaleY(1.1f)
            .setDuration(1000)
            .setInterpolator(AccelerateDecelerateInterpolator())
            .withEndAction {
                view.animate()
                    .scaleX(1.0f)
                    .scaleY(1.0f)
                    .setDuration(1000)
                    .withEndAction { startLogoPulse(view) } // Lặp lại
                    .start()
            }
            .start()
    }

    private fun startRandomLoading(tvPercent: TextView, guideProgress: Guideline) {
        var currentProgress = 0f
        val handler = Handler(Looper.getMainLooper())
        
        val runnable = object : Runnable {
            override fun run() {
                if (currentProgress < 1.0f) {
                    val increment = (5..15).random() / 100f
                    val nextProgress = (currentProgress + increment).coerceAtMost(1.0f)
                    
                    val animator = ValueAnimator.ofFloat(currentProgress, nextProgress)
                    animator.duration = (200..500).random().toLong() // Thời gian chạy mỗi đoạn cũng ngẫu nhiên
                    animator.addUpdateListener { animation ->
                        val value = animation.animatedValue as Float
                        
                        tvPercent.text = "${(value * 100).toInt()}%"
                        
                        val params = guideProgress.layoutParams as androidx.constraintlayout.widget.ConstraintLayout.LayoutParams
                        params.guidePercent = value
                        guideProgress.layoutParams = params
                    }
                    animator.start()
                    
                    currentProgress = nextProgress
                    
                    if (currentProgress < 1.0f) {
                        handler.postDelayed(this, (300..700).random().toLong())
                    } else {
                        handler.postDelayed({
                            navigateToOnboarding()
                        }, 500)
                    }
                }
            }
        }
        
        handler.postDelayed(runnable, 500) // Delay ban đầu một chút
    }

    private fun navigateToOnboarding() {
        startActivity(Intent(this, Onboarding1Activity::class.java))
        finish()
    }
}