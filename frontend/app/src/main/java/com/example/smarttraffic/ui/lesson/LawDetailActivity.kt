package com.example.smarttraffic.ui.lesson

import android.os.Bundle
import android.view.View
import android.util.Log
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.LawDto
import com.example.smarttraffic.network.LawApiService
import com.example.smarttraffic.network.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import android.widget.ImageView

class LawDetailActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_law_detail)

        val lawId = intent.getIntExtra("law_id", -1)

        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }

        if (lawId == -1) {
            Toast.makeText(this, "Không tìm thấy điều luật", Toast.LENGTH_SHORT).show()
            finish()
            return
        }

        loadLaw(lawId)
    }

    private fun loadLaw(lawId: Int) {
        val api = RetrofitClient.retrofit.create(LawApiService::class.java)
        api.getLawById(lawId).enqueue(object : Callback<LawDto> {
            override fun onResponse(call: Call<LawDto>, response: Response<LawDto>) {
                if (response.isSuccessful && response.body() != null) {
                    bindData(response.body()!!)
                } else {
                    Toast.makeText(this@LawDetailActivity, "Không tải được dữ liệu", Toast.LENGTH_SHORT).show()
                }
            }
            override fun onFailure(call: Call<LawDto>, t: Throwable) {
                Toast.makeText(this@LawDetailActivity, "Lỗi kết nối", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun bindData(law: LawDto) {
        // Header title và subtitle
        findViewById<TextView>(R.id.tvLessonTitle).text = law.category_name ?: "Điều luật"
        findViewById<TextView>(R.id.tvSubTitle).text = law.title ?: "Không có tiêu đề"
        findViewById<TextView>(R.id.tvLawMeta).text = "Nhóm: ${law.category_name ?: "---"}"

        // Ảnh minh họa
        val ivLawImage = findViewById<ImageView>(R.id.ivLawImage)
        val cardLawImage = findViewById<View>(R.id.cardLawImage)
        if (!law.image_url.isNullOrBlank()) {
            cardLawImage.visibility = View.VISIBLE
            
            val fullImageUrl = RetrofitClient.getFullImageUrl(law.image_url)
            Log.d("LawDetailActivity", "Image URL: $fullImageUrl")

            Glide.with(this)
                .load(fullImageUrl)
                .diskCacheStrategy(com.bumptech.glide.load.engine.DiskCacheStrategy.NONE)
                .skipMemoryCache(true)
                .listener(object : com.bumptech.glide.request.RequestListener<android.graphics.drawable.Drawable> {
                    override fun onLoadFailed(
                        e: com.bumptech.glide.load.engine.GlideException?,
                        model: Any?,
                        target: com.bumptech.glide.request.target.Target<android.graphics.drawable.Drawable>?,
                        isFirstResource: Boolean
                    ): Boolean {
                        Log.e("LawDetailActivity", "Glide load failed for $fullImageUrl", e)
                        return false
                    }

                    override fun onResourceReady(
                        resource: android.graphics.drawable.Drawable?,
                        model: Any?,
                        target: com.bumptech.glide.request.target.Target<android.graphics.drawable.Drawable>?,
                        dataSource: com.bumptech.glide.load.DataSource?,
                        isFirstResource: Boolean
                    ): Boolean {
                        Log.d("LawDetailActivity", "Glide load success for $fullImageUrl")
                        return false
                    }
                })
                .placeholder(R.drawable.ic_loading_placeholder)
                .error(R.drawable.ic_loading_placeholder)
                .into(ivLawImage)
        } else {
            cardLawImage.visibility = View.GONE
        }

        // Mô tả
        val tvContent = findViewById<TextView>(R.id.tvContent)
        tvContent.text = if (!law.description.isNullOrBlank()) law.description.trim()
                        else "Chưa có mô tả."

        // Quy định
        val tvRules = findViewById<TextView>(R.id.tvRules)
        val tvRulesLabel = findViewById<TextView>(R.id.tvRulesLabel)
        val cardRules = findViewById<View>(R.id.cardRules)
        if (!law.rules.isNullOrBlank()) {
            tvRules.text = law.rules.trim()
            tvRulesLabel.visibility = View.VISIBLE
            cardRules.visibility = View.VISIBLE
        } else {
            tvRulesLabel.visibility = View.GONE
            cardRules.visibility = View.GONE
        }

        // Lưu ý / Cảnh báo
        val tvWarnings = findViewById<TextView>(R.id.tvWarnings)
        val tvWarningsLabel = findViewById<TextView>(R.id.tvWarningsLabel)
        val cardWarnings = findViewById<View>(R.id.cardWarnings)
        if (!law.warnings.isNullOrBlank()) {
            tvWarnings.text = law.warnings.trim()
            tvWarningsLabel.visibility = View.VISIBLE
            cardWarnings.visibility = View.VISIBLE
        } else {
            tvWarningsLabel.visibility = View.GONE
            cardWarnings.visibility = View.GONE
        }
    }
}