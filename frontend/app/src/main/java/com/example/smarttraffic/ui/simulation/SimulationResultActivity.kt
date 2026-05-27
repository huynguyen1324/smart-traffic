package com.example.smarttraffic.ui.simulation

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.google.android.material.button.MaterialButton

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của SimulationResult.
 */
class SimulationResultActivity : AppCompatActivity() {
        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_simulation_result)

        findViewById<MaterialButton>(R.id.btnNextScenario).setOnClickListener {
            startActivity(Intent(this, SimulationListActivity::class.java))
            finish()
        }
    }
}
