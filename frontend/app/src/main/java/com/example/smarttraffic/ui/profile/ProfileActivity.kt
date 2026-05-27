package com.example.smarttraffic.ui.profile

import android.app.AlertDialog
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.UserDto
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.network.UserApiService
import com.example.smarttraffic.ui.auth.LoginActivity
import com.example.smarttraffic.ui.progress.ProgressActivity
import com.example.smarttraffic.util.NavigationHelper
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của Profile.
 */
class ProfileActivity : AppCompatActivity() {

    private lateinit var tvProfileName: TextView
    private lateinit var tvProfileEmail: TextView
    private lateinit var tvProfileGoal: TextView
    private lateinit var ivProfileAvatar: ImageView

        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        tvProfileName = findViewById(R.id.tvProfileName)
        tvProfileEmail = findViewById(R.id.tvProfileEmail)
        tvProfileGoal = findViewById(R.id.tvProfileGoal)
        ivProfileAvatar = findViewById(R.id.ivProfileAvatar)

        findViewById<View>(R.id.btnBack)?.setOnClickListener {
            NavigationHelper.navigateTo(this, com.example.smarttraffic.ui.home.HomeActivity::class.java, true)
        }

        findViewById<View>(R.id.itemProgress)?.setOnClickListener {
            startActivity(Intent(this, ProgressActivity::class.java))
        }

        findViewById<View>(R.id.itemSetting)?.setOnClickListener {
            startActivity(Intent(this, EditProfileActivity::class.java))
        }

        findViewById<View>(R.id.itemLogout)?.setOnClickListener {
            showLogoutDialog()
        }

        loadUserProfile()

        NavigationHelper.setupBottomNav(this, R.id.navProfile)
    }

    private fun loadUserProfile() {
        val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
        val userId = sharedPref.getInt("USER_ID", -1)

        if (userId == -1) {
            tvProfileName.text = "Khách"
            tvProfileEmail.text = "Chưa đăng nhập"
            tvProfileGoal.text = "Mục tiêu: Chưa rõ"
            return
        }

        val apiService = RetrofitClient.retrofit.create(UserApiService::class.java)
        apiService.getUserById(userId).enqueue(object : Callback<UserDto> {
            override fun onResponse(call: Call<UserDto>, response: Response<UserDto>) {
                if (response.isSuccessful && response.body() != null) {
                    val user = response.body()!!

                    tvProfileName.text = user.full_name ?: "Người dùng SmartTraffic"
                    tvProfileEmail.text = user.email ?: user.phone ?: "Chưa có email/SĐT"
                    tvProfileGoal.text = "Mục tiêu: Bằng ${user.learning_goal ?: "Chưa chọn. Nhấn Cài đặt để cập nhật"}"

                    val avatarUrl = RetrofitClient.getFullImageUrl("images/user_avatars/" + (user.avatar_url ?: "default-male.png"))
                    Glide.with(this@ProfileActivity)
                        .load(avatarUrl)
                        .placeholder(R.drawable.ic_loading_placeholder)
                        .error(R.drawable.ic_loading_placeholder)
                        .circleCrop()
                        .into(ivProfileAvatar)
                } else {
                    Toast.makeText(this@ProfileActivity, "Không thể tải thông tin", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<UserDto>, t: Throwable) {
                Toast.makeText(this@ProfileActivity, "Lỗi mạng: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun showLogoutDialog() {
        AlertDialog.Builder(this)
            .setTitle("Đăng xuất?")
            .setMessage("Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng An toàn Giao thông?")
            .setPositiveButton("Đăng xuất") { _, _ ->
                val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
                sharedPref.edit().clear().apply()

                val intent = Intent(this, LoginActivity::class.java)
                intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                startActivity(intent)
                finish()
            }
            .setNegativeButton("Hủy", null)
            .show()
    }
}
