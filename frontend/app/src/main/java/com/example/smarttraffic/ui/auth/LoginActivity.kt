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

            btnLogin.isEnabled = false
            Toast.makeText(this, "Đang kết nối...", Toast.LENGTH_SHORT).show()

            RetrofitClient.retrofit.create(UserApiService::class.java)
                .getAllUsers()
                .enqueue(object : Callback<List<UserDto>> {
                    override fun onResponse(call: Call<List<UserDto>>, response: Response<List<UserDto>>) {
                        btnLogin.isEnabled = true
                        if (response.isSuccessful && response.body() != null) {
                            val matchedUser = response.body()!!.find {
                                (it.email == email || it.phone == email) && it.password == password
                            }
                            if (matchedUser != null) {
                                com.example.smarttraffic.util.SessionManager(this@LoginActivity).saveLogin(
                                    matchedUser.id ?: -1,
                                    matchedUser.full_name ?: "",
                                    matchedUser.learning_goal ?: "B2"
                                )
                                Toast.makeText(this@LoginActivity, "Đăng nhập thành công", Toast.LENGTH_SHORT).show()
                                startActivity(Intent(this@LoginActivity, HomeActivity::class.java))
                                finish()
                            } else {
                                Toast.makeText(this@LoginActivity, "Sai tài khoản hoặc mật khẩu", Toast.LENGTH_SHORT).show()
                            }
                        } else {
                            Toast.makeText(this@LoginActivity, "Lỗi từ server", Toast.LENGTH_SHORT).show()
                        }
                    }

                    override fun onFailure(call: Call<List<UserDto>>, t: Throwable) {
                        btnLogin.isEnabled = true
                        Log.e("LoginActivity", "Lỗi kết nối", t)
                        Toast.makeText(this@LoginActivity, "Lỗi mạng: ${t.message}", Toast.LENGTH_SHORT).show()
                    }
                })
        }

        tvRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }
}