package com.example.smarttraffic.ui.sign

import android.content.res.ColorStateList
import android.graphics.Color
import android.os.Bundle
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.FavoriteDto
import com.example.smarttraffic.dto.FavoriteResponse
import com.example.smarttraffic.dto.SignDto
import com.example.smarttraffic.network.FavoriteApiService
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.repository.SignApiRepository
import com.google.android.material.button.MaterialButton
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SignDetailActivity : AppCompatActivity() {

    private lateinit var repository: SignApiRepository
    private var isFavorite = false
    private var currentFavoriteId: Int? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_detail)

        repository = SignApiRepository()
        findViewById<android.view.View>(R.id.btnBack).setOnClickListener { finish() }

        val signId = intent.getIntExtra("sign_id", -1)
        if (signId == -1) {
            Toast.makeText(this, "Sign ID không hợp lệ", Toast.LENGTH_SHORT).show()
            finish()
            return
        }

        val imgSign = findViewById<ImageView>(R.id.imgSign)
        val tvSignName = findViewById<TextView>(R.id.tvSignName)
        val tvSignMeta = findViewById<TextView>(R.id.tvSignMeta)
        val tvSignDescription = findViewById<TextView>(R.id.tvSignDescription)
        val btnFavorite = findViewById<MaterialButton>(R.id.btnFavorite)

        val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
        val userId = sharedPref.getInt("USER_ID", -1)

        btnFavorite.setOnClickListener {
            if (userId == -1) {
                Toast.makeText(this, "Vui lòng đăng nhập để lưu yêu thích", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val favApi = RetrofitClient.retrofit.create(FavoriteApiService::class.java)

            if (!isFavorite) {
                // Thêm vào yêu thích
                val favDto = FavoriteDto(user_id = userId, type = "Sign", type_id = signId)
                favApi.addFavorite(favDto).enqueue(object : Callback<FavoriteResponse> {
                    override fun onResponse(call: Call<FavoriteResponse>, response: Response<FavoriteResponse>) {
                        if (response.isSuccessful && response.body() != null) {
                            isFavorite = true
                            currentFavoriteId = response.body()!!.id
                            updateFavoriteUI(btnFavorite)
                            Toast.makeText(this@SignDetailActivity, "Đã thêm vào yêu thích", Toast.LENGTH_SHORT).show()
                        }
                    }
                    override fun onFailure(call: Call<FavoriteResponse>, t: Throwable) {
                        Toast.makeText(this@SignDetailActivity, "Lỗi kết nối server", Toast.LENGTH_SHORT).show()
                    }
                })
            } else {
                // Huỷ yêu thích
                currentFavoriteId?.let { favId ->
                    favApi.removeFavorite(favId).enqueue(object : Callback<Void> {
                        override fun onResponse(call: Call<Void>, response: Response<Void>) {
                            if (response.isSuccessful) {
                                isFavorite = false
                                currentFavoriteId = null
                                updateFavoriteUI(btnFavorite)
                                Toast.makeText(this@SignDetailActivity, "Đã bỏ yêu thích", Toast.LENGTH_SHORT).show()
                            }
                        }
                        override fun onFailure(call: Call<Void>, t: Throwable) {
                            Toast.makeText(this@SignDetailActivity, "Lỗi kết nối khi xoá", Toast.LENGTH_SHORT).show()
                        }
                    })
                }
            }
        }

        // Load Dữ liệu Sign
        repository.getSignById(signId).enqueue(object : Callback<SignDto> {
            override fun onResponse(call: Call<SignDto>, response: Response<SignDto>) {
                if (response.isSuccessful) {
                    val sign = response.body()
                    if (sign != null) {
                        tvSignName.text = sign.title ?: ""
                        tvSignMeta.text = "${sign.category_name ?: "Biển báo"} - ${sign.sign_code ?: ""}"
                        tvSignDescription.text = sign.description ?: ""

                        Glide.with(this@SignDetailActivity)
                            .load(RetrofitClient.IMAGE_URL_BASE + (sign.image_url ?: ""))
                            .placeholder(R.drawable.ic_loading_placeholder)
                            .error(R.drawable.ic_loading_placeholder)
                            .into(imgSign)
                    }
                }
            }
            override fun onFailure(call: Call<SignDto>, t: Throwable) {
                Toast.makeText(this@SignDetailActivity, "Lỗi tải dữ liệu", Toast.LENGTH_SHORT).show()
            }
        })
        
        checkFavoriteStatus(userId, signId, btnFavorite)
    }

    private fun updateFavoriteUI(btn: MaterialButton) {
        if (isFavorite) {
            btn.text = "Đã yêu thích"
            btn.setIconResource(android.R.drawable.btn_star_big_on)
            btn.setIconTintResource(android.R.color.holo_orange_dark)
            btn.setTextColor(Color.parseColor("#F59E0B"))
            btn.strokeColor = ColorStateList.valueOf(Color.parseColor("#F59E0B"))
            btn.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#FFFBEB"))
        } else {
            btn.text = "Thêm vào yêu thích"
            btn.setIconResource(android.R.drawable.btn_star_big_off)
            btn.setIconTintResource(android.R.color.darker_gray)
            btn.setTextColor(Color.parseColor("#334155"))
            btn.strokeColor = ColorStateList.valueOf(Color.parseColor("#CBD5E1"))
            btn.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#F8FAFC"))
        }
    }

    private fun checkFavoriteStatus(userId: Int, signId: Int, btn: MaterialButton) {
        if (userId == -1) return
        val favApi = RetrofitClient.retrofit.create(FavoriteApiService::class.java)
        favApi.getAllFavorites().enqueue(object : Callback<List<FavoriteDto>> {
            override fun onResponse(call: Call<List<FavoriteDto>>, response: Response<List<FavoriteDto>>) {
                if (response.isSuccessful && response.body() != null) {
                    val list = response.body()!!
                    val found = list.find { it.user_id == userId && it.type == "Sign" && it.type_id == signId }
                    if (found != null) {
                        isFavorite = true
                        currentFavoriteId = found.id
                        updateFavoriteUI(btn)
                    }
                }
            }
            override fun onFailure(call: Call<List<FavoriteDto>>, t: Throwable) {}
        })
    }
}