package com.example.smarttraffic.ui.sign

import android.os.Bundle
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.SignDto
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.network.SignApiService
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của SignDetail.
 */
class SignDetailActivity : AppCompatActivity() {

    private lateinit var signApi: SignApiService

        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_detail)

        signApi = RetrofitClient.retrofit.create(SignApiService::class.java)
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

        signApi.getSignById(signId).enqueue(object : Callback<SignDto> {
            override fun onResponse(call: Call<SignDto>, response: Response<SignDto>) {
                if (response.isSuccessful) {
                    val sign = response.body()
                    if (sign != null) {
                        tvSignName.text = sign.title ?: ""
                        tvSignMeta.text = "${sign.category_name ?: "Biển báo"} - ${sign.sign_code ?: ""}"
                        tvSignDescription.text = sign.description ?: ""

                        Glide.with(this@SignDetailActivity)
                            .load(RetrofitClient.getFullImageUrl(sign.image_url))
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
    }
}