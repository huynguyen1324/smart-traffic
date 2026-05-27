package com.example.smarttraffic.ui.simulation

import android.content.Intent
import android.os.Bundle
import android.widget.LinearLayout
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.util.NavigationHelper

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của SimulationList.
 */
class SimulationListActivity : AppCompatActivity() {
        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_simulation_list)

        findViewById<android.view.View>(R.id.btnBack)?.setOnClickListener {
            NavigationHelper.navigateTo(this, com.example.smarttraffic.ui.home.HomeActivity::class.java, true)
        }

        findViewById<LinearLayout>(R.id.itemTrafficLight).setOnClickListener {
            startActivity(Intent(this, SimulationDetailActivity::class.java))
        }

        findViewById<LinearLayout>(R.id.itemPedestrian).setOnClickListener {
            startActivity(Intent(this, SimulationDetailActivity::class.java))
        }

        NavigationHelper.setupBottomNav(this, -1)
    }
}
