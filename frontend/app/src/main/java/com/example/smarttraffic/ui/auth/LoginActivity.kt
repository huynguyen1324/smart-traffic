package com.example.smarttraffic.ui.auth

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.UserDto
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.network.UserApiService
import com.example.smarttraffic.ui.home.HomeActivity
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val btnLogin = findViewById<MaterialButton>(R.id.btnLogin)
        val tvRegister = findViewById<TextView>(R.id.tvRegister)
        val edtEmail = findViewById<EditText>(R.id.edtEmail)
        val edtPassword = findViewById<EditText>(R.id.edtPassword)

        btnLogin.setOnClickListener {
            val email = edtEmail.text.toString().trim()
            val password = edtPassword.text.toString().trim()

            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Vui lòng nhập đầy đủ Email và Mật khẩu", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            Log.d("LoginActivity", "Bắt đầu đăng nhập với: $email")
            btnLogin.isEnabled = false
            Toast.makeText(this, "Đang kết nối...", Toast.LENGTH_SHORT).show()

            val apiService = RetrofitClient.retrofit.create(UserApiService::class.java)
            val loginRequest = com.example.smarttraffic.network.LoginRequest(email, password)

            apiService.loginUser(loginRequest).enqueue(object : Callback<UserDto> {
                override fun onResponse(call: Call<UserDto>, response: Response<UserDto>) {
                    Log.d("LoginActivity", "Phản hồi từ server: ${response.code()}")
                    btnLogin.isEnabled = true
                    if (response.isSuccessful && response.body() != null) {
                        val user = response.body()!!
                        Log.d("LoginActivity", "Đăng nhập thành công cho người dùng: ${user.full_name}")
                        com.example.smarttraffic.util.SessionManager(this@LoginActivity).saveLogin(
                            user.id ?: -1,
                            user.full_name ?: "",
                            user.learning_goal ?: "B2"
                        )
                        Toast.makeText(this@LoginActivity, "Đăng nhập thành công", Toast.LENGTH_SHORT).show()
                        startActivity(Intent(this@LoginActivity, HomeActivity::class.java))
                        finish()
                    } else if (response.code() == 401) {
                        Log.w("LoginActivity", "Sai tài khoản hoặc mật khẩu")
                        Toast.makeText(this@LoginActivity, "Sai tài khoản hoặc mật khẩu", Toast.LENGTH_SHORT).show()
                    } else {
                        Log.e("LoginActivity", "Lỗi server: ${response.code()} - ${response.message()}")
                        Toast.makeText(this@LoginActivity, "Lỗi từ máy chủ: ${response.code()}", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<UserDto>, t: Throwable) {
                    btnLogin.isEnabled = true
                    Log.e("LoginActivity", "Lỗi kết nối nghiêm trọng", t)
                    Toast.makeText(this@LoginActivity, "Lỗi mạng: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }

        tvRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }
}