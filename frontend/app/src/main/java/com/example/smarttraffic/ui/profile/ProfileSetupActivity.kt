package com.example.smarttraffic.ui.profile

import android.content.Intent
import android.os.Bundle
import android.widget.EditText
import android.widget.RadioButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.UserDto
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.network.UpdateResponse
import com.example.smarttraffic.network.UserApiService
import com.example.smarttraffic.ui.home.HomeActivity
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ProfileSetupActivity : AppCompatActivity() {
    private var userId: Int = -1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile_setup)

        userId = intent.getIntExtra("USER_ID", -1)
        val defaultName = intent.getStringExtra("USER_NAME") ?: ""

        val edtName = findViewById<EditText>(R.id.edtName)
        val radioA1 = findViewById<RadioButton>(R.id.radioA1)
        val radioB2 = findViewById<RadioButton>(R.id.radioB2)
        val btnDone = findViewById<MaterialButton>(R.id.btnDone)

        edtName.setText(defaultName)

        // Sau này có thể bắt sự kiện bấm vào Avatar (Ví dụ mở Gallery Intent) để ImagePicker
        // Tuy nhiên hiện tại Backend chưa có API Upload File ảnh nên mình để tạm biến Chuỗi
        
        btnDone.setOnClickListener {
            val updatedName = edtName.text.toString().trim()
            val learningGoal = when {
                radioA1.isChecked -> "A1"
                radioB2.isChecked -> "B2"
                else -> null
            }

            if (updatedName.isEmpty()) {
                Toast.makeText(this, "Vui lòng nhập tên hiển thị", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (learningGoal == null) {
                Toast.makeText(this, "Vui lòng chọn mục tiêu học tập", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            // Nếu user nhảy vào màn hình này trực tiếp không qua form đăng ký (ko có ID)
            if (userId == -1) {
                startActivity(Intent(this, HomeActivity::class.java))
                finish()
                return@setOnClickListener
            }

            btnDone.isEnabled = false
            Toast.makeText(this, "Đang lưu cấu hình...", Toast.LENGTH_SHORT).show()

            val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
            val currentAvatar = sharedPref.getString("USER_AVATAR", "default-male.png")

            // Gửi DTO với các trường muốn thay đổi, GSON sẽ bỏ qua những trường Null
            val updateDto = UserDto(
                full_name = updatedName,
                learning_goal = learningGoal,
                avatar_url = currentAvatar
            )

            val apiService = RetrofitClient.retrofit.create(UserApiService::class.java)
            apiService.updateUser(userId, updateDto).enqueue(object : Callback<UpdateResponse> {
                override fun onResponse(call: Call<UpdateResponse>, response: Response<UpdateResponse>) {
                    btnDone.isEnabled = true
                    if (response.isSuccessful) {
                        Toast.makeText(this@ProfileSetupActivity, "Hồ sơ đã được lưu thành công!", Toast.LENGTH_SHORT).show()
                        val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
                        sharedPref.edit()
                            .putString("USER_NAME", updatedName)
                            .putString("LEARNING_GOAL", learningGoal)
                            .apply()
                        
                        startActivity(Intent(this@ProfileSetupActivity, HomeActivity::class.java))
                        finish()
                    } else {
                        Toast.makeText(this@ProfileSetupActivity, "Lỗi từ máy chủ", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<UpdateResponse>, t: Throwable) {
                    btnDone.isEnabled = true
                    Toast.makeText(this@ProfileSetupActivity, "Lỗi mạng: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}