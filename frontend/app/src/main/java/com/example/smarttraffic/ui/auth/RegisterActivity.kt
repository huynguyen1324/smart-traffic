package com.example.smarttraffic.ui.auth

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.UserDto
import com.example.smarttraffic.network.RegisterResponse
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.network.UserApiService
import com.example.smarttraffic.ui.profile.ProfileSetupActivity
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val btnRegister = findViewById<MaterialButton>(R.id.btnRegister)
        val edtName = findViewById<EditText>(R.id.edtName)
        val edtEmail = findViewById<EditText>(R.id.edtEmail)
        val edtPhone = findViewById<EditText>(R.id.edtPhone)
        val edtPassword = findViewById<EditText>(R.id.edtPassword)
        val edtConfirm = findViewById<EditText>(R.id.edtConfirm)
        val rgGender = findViewById<RadioGroup>(R.id.rgGender)
        
        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }
        findViewById<TextView>(R.id.tvLogin).setOnClickListener { finish() }

        btnRegister.setOnClickListener {
            val name = edtName.text.toString().trim()
            val email = edtEmail.text.toString().trim()
            val phone = edtPhone.text.toString().trim()
            val password = edtPassword.text.toString().trim()
            val confirm = edtConfirm.text.toString().trim()
            
            val gendle = if (findViewById<RadioButton>(R.id.rbMale).isChecked) "male" else "female"
            val defaultAvatar = if (gendle == "male") "default-male.png" else "default-female.png"

            if (name.isEmpty()) {
                Toast.makeText(this, "Vui lòng nhập họ tên", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            if (email.isEmpty() && phone.isEmpty()) {
                Toast.makeText(this, "Vui lòng nhập Email hoặc Số điện thoại", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            if (password.isEmpty() || confirm.isEmpty()) {
                Toast.makeText(this, "Vui lòng nhập mật khẩu", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            if (password != confirm) {
                Toast.makeText(this, "Mật khẩu xác nhận không khớp", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            btnRegister.isEnabled = false
            Toast.makeText(this, "Đang đăng ký...", Toast.LENGTH_SHORT).show()

            val newUser = UserDto(
                full_name = name, 
                email = if (email.isNotEmpty()) email else null, 
                phone = if (phone.isNotEmpty()) phone else null,
                password = password,
                gendle = gendle,
                avatar_url = defaultAvatar
            )
            val apiService = RetrofitClient.retrofit.create(UserApiService::class.java)

            apiService.registerUser(newUser).enqueue(object : Callback<RegisterResponse> {
                override fun onResponse(call: Call<RegisterResponse>, response: Response<RegisterResponse>) {
                    btnRegister.isEnabled = true
                    if (response.isSuccessful && response.body() != null) {
                        val userId = response.body()!!.id
                        Toast.makeText(this@RegisterActivity, "Đăng ký thành công!", Toast.LENGTH_SHORT).show()
                        
                        val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
                        sharedPref.edit()
                            .putInt("USER_ID", userId)
                            .putString("USER_NAME", name)
                            .putString("USER_AVATAR", defaultAvatar)
                            .apply()
                        
                        // Pass userId to profile setup screen
                        val intent = Intent(this@RegisterActivity, ProfileSetupActivity::class.java)
                        intent.putExtra("USER_ID", userId)
                        intent.putExtra("USER_NAME", name)
                        startActivity(intent)
                        finish()
                    } else {
                        Toast.makeText(this@RegisterActivity, "Tài khoản có thể đã tồn tại", Toast.LENGTH_SHORT).show()
                    }
                }
                override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                    btnRegister.isEnabled = true
                    Toast.makeText(this@RegisterActivity, "Lỗi mạng: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}