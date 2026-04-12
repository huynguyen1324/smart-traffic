package com.example.smarttraffic.ui.profile

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.ImageView
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.UserDto
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.network.UpdateResponse
import com.example.smarttraffic.network.UserApiService
import com.example.smarttraffic.ui.auth.LoginActivity
import com.example.smarttraffic.ui.home.HomeActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class EditProfileActivity : AppCompatActivity() {

    private lateinit var edtName: EditText
    private lateinit var edtEmail: EditText
    private lateinit var edtPhone: EditText
    private lateinit var rgGender: RadioGroup
    private lateinit var rgGoal: RadioGroup
    private lateinit var ivAvatar: ImageView
    private var userId: Int = -1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit_profile)

        val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
        userId = sharedPref.getInt("USER_ID", -1)

        if (userId == -1) {
            finish()
            return
        }

        initViews()
        loadCurrentData()
    }

    private fun initViews() {
        edtName = findViewById(R.id.edtEditName)
        edtEmail = findViewById(R.id.edtEditEmail)
        edtPhone = findViewById(R.id.edtEditPhone)
        rgGender = findViewById(R.id.rgGender)
        rgGoal = findViewById(R.id.rgGoal)
        ivAvatar = findViewById(R.id.ivEditAvatar)

        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }

        findViewById<View>(R.id.btnSaveProfile).setOnClickListener {
            saveChanges()
        }

        findViewById<View>(R.id.btnDeleteInside).setOnClickListener {
            showDeleteConfirmation()
        }
    }

    private fun loadCurrentData() {
        val apiService = RetrofitClient.retrofit.create(UserApiService::class.java)
        apiService.getUserById(userId).enqueue(object : Callback<UserDto> {
            override fun onResponse(call: Call<UserDto>, response: Response<UserDto>) {
                if (response.isSuccessful && response.body() != null) {
                    val user = response.body()!!
                    edtName.setText(user.full_name)
                    edtEmail.setText(user.email)
                    edtPhone.setText(user.phone)

                    // Gender radio
                    when (user.gender?.lowercase()) {
                        "nam" -> findViewById<RadioButton>(R.id.rbMale).isChecked = true
                        "nữ" -> findViewById<RadioButton>(R.id.rbFemale).isChecked = true
                        else -> findViewById<RadioButton>(R.id.rbOther).isChecked = true
                    }

                    // Goal radio
                    when (user.learning_goal?.uppercase()) {
                        "A1" -> findViewById<RadioButton>(R.id.rbA1).isChecked = true
                        "B2" -> findViewById<RadioButton>(R.id.rbB2).isChecked = true
                    }

                    // Avatar
                    val avatarUrl = RetrofitClient.IMAGE_URL_BASE + "user_avatars/" + (user.avatar_url ?: "default-male.png")
                    Glide.with(this@EditProfileActivity)
                        .load(avatarUrl)
                        .circleCrop()
                        .into(ivAvatar)
                }
            }
            override fun onFailure(call: Call<UserDto>, t: Throwable) {
                Toast.makeText(this@EditProfileActivity, "Lỗi tải dữ liệu", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun saveChanges() {
        val name = edtName.text.toString().trim()
        val email = edtEmail.text.toString().trim()
        val phone = edtPhone.text.toString().trim()
        
        val gender = when (rgGender.checkedRadioButtonId) {
            R.id.rbMale -> "Nam"
            R.id.rbFemale -> "Nữ"
            else -> "Khác"
        }
        
        val goal = when (rgGoal.checkedRadioButtonId) {
            R.id.rbA1 -> "A1"
            R.id.rbB2 -> "B2"
            else -> "B2"
        }

        if (name.isEmpty()) {
            Toast.makeText(this, "Vui lòng nhập tên", Toast.LENGTH_SHORT).show()
            return
        }

        val updateDto = UserDto(
            full_name = name,
            email = email,
            phone = phone,
            gender = gender,
            learning_goal = goal
        )

        val apiService = RetrofitClient.retrofit.create(UserApiService::class.java)
        apiService.updateUser(userId, updateDto).enqueue(object : Callback<UpdateResponse> {
            override fun onResponse(call: Call<UpdateResponse>, response: Response<UpdateResponse>) {
                if (response.isSuccessful) {
                    Toast.makeText(this@EditProfileActivity, "Đã cập nhật thông tin cá nhân", Toast.LENGTH_SHORT).show()
                    
                    // Update Local Storage
                    val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
                    sharedPref.edit()
                        .putString("USER_NAME", name)
                        .putString("LEARNING_GOAL", goal) // Thường dùng cho logic app
                        .apply()
                    
                    finish()
                } else {
                    Toast.makeText(this@EditProfileActivity, "Lỗi cập nhật từ máy chủ", Toast.LENGTH_SHORT).show()
                }
            }
            override fun onFailure(call: Call<UpdateResponse>, t: Throwable) {
                Toast.makeText(this@EditProfileActivity, "Lỗi mạng", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun showDeleteConfirmation() {
        AlertDialog.Builder(this)
            .setTitle("Xác nhận xoá tài khoản")
            .setMessage("Mọi thông tin về tài khoản và hành trình học tập của bạn sẽ biến mất vĩnh viễn. Bạn chắc chắn chứ?")
            .setPositiveButton("Xoá tài khoản") { _, _ ->
                val apiService = RetrofitClient.retrofit.create(UserApiService::class.java)
                apiService.deleteUser(userId).enqueue(object : Callback<UpdateResponse> {
                    override fun onResponse(call: Call<UpdateResponse>, response: Response<UpdateResponse>) {
                        if (response.isSuccessful) {
                            Toast.makeText(this@EditProfileActivity, "Đã xoá tài khoản thành công", Toast.LENGTH_LONG).show()
                            
                            val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
                            sharedPref.edit().clear().apply()
                            
                            val intent = Intent(this@EditProfileActivity, LoginActivity::class.java)
                            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                            startActivity(intent)
                            finish()
                        }
                    }
                    override fun onFailure(call: Call<UpdateResponse>, t: Throwable) {
                        Toast.makeText(this@EditProfileActivity, "Lỗi mạng khi xoá", Toast.LENGTH_SHORT).show()
                    }
                })
            }
            .setNegativeButton("Hủy", null)
            .setIcon(android.R.drawable.ic_dialog_alert)
            .show()
    }
}
