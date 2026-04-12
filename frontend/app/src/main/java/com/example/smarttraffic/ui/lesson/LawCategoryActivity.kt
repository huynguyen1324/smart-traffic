package com.example.smarttraffic.ui.lesson

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.LawDto
import com.example.smarttraffic.network.LawApiService
import com.example.smarttraffic.network.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LawCategoryActivity : AppCompatActivity() {

    private lateinit var rvLaws: RecyclerView
    private var lawList: List<LawDto> = emptyList()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_law_category)

        val categoryId = intent.getIntExtra("category_id", -1)
        val categoryName = intent.getStringExtra("category_name") ?: "Điều luật"

        findViewById<TextView>(R.id.tvCategoryTitle).text = categoryName
        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }

        rvLaws = findViewById(R.id.rvLaws)
        rvLaws.layoutManager = LinearLayoutManager(this)

        if (categoryId == -1) {
            Toast.makeText(this, "Không tìm thấy chủ đề", Toast.LENGTH_SHORT).show()
            finish()
            return
        }

        loadLaws(categoryId)
        setupBottomNav()
    }

    private fun loadLaws(categoryId: Int) {
        val api = RetrofitClient.retrofit.create(LawApiService::class.java)
        api.getLawsByCategory(categoryId).enqueue(object : Callback<List<LawDto>> {
            override fun onResponse(call: Call<List<LawDto>>, response: Response<List<LawDto>>) {
                if (response.isSuccessful) {
                    lawList = response.body() ?: emptyList()
                    setupAdapter()
                    if (lawList.isEmpty()) {
                        Toast.makeText(this@LawCategoryActivity, "Chưa có điều luật cho chủ đề này", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(this@LawCategoryActivity, "Lỗi server: ${response.code()}", Toast.LENGTH_SHORT).show()
                }
            }
            override fun onFailure(call: Call<List<LawDto>>, t: Throwable) {
                Toast.makeText(this@LawCategoryActivity, "Lỗi kết nối", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun setupAdapter() {
        rvLaws.adapter = object : RecyclerView.Adapter<LawViewHolder>() {
            override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): LawViewHolder {
                val view = LayoutInflater.from(parent.context).inflate(R.layout.item_law, parent, false)
                return LawViewHolder(view)
            }

            override fun onBindViewHolder(holder: LawViewHolder, position: Int) {
                val law = lawList[position]
                holder.tvNumber.text = (position + 1).toString()
                holder.tvTitle.text = law.title ?: "Không có tiêu đề"
                holder.tvDescription.text = law.description?.take(100) ?: ""
                
                // Load Thumbnail
                if (!law.image_url.isNullOrBlank()) {
                    holder.cardThumb.visibility = View.VISIBLE
                    
                    Glide.with(this@LawCategoryActivity)
                        .load(RetrofitClient.IMAGE_URL_BASE + law.image_url)
                        .placeholder(R.drawable.ic_loading_placeholder)
                        .error(R.drawable.ic_loading_placeholder)
                        .centerCrop()
                        .into(holder.ivThumb)
                } else {
                    holder.cardThumb.visibility = View.GONE
                    holder.tvNumber.visibility = View.VISIBLE // Show number if no image
                }

                holder.itemView.setOnClickListener {
                    val intent = Intent(this@LawCategoryActivity, LawDetailActivity::class.java)
                    intent.putExtra("law_id", law.id)
                    intent.putExtra("category_name", law.category_name ?: "Bài học")
                    startActivity(intent)
                }
            }

            override fun getItemCount() = lawList.size
        }
    }

    inner class LawViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvNumber: TextView = view.findViewById(R.id.tvLawNumber)
        val tvTitle: TextView = view.findViewById(R.id.tvLawTitle)
        val tvDescription: TextView = view.findViewById(R.id.tvLawDescription)
        val ivThumb: ImageView = view.findViewById(R.id.ivLawThumb)
        val cardThumb: View = view.findViewById(R.id.cardThumb)
    }

    private fun setupBottomNav() {
        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, R.id.navLaw)
    }
}
