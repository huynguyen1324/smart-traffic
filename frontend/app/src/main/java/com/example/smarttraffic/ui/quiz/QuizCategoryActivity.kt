package com.example.smarttraffic.ui.quiz

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.LawCategoryDto
import com.example.smarttraffic.dto.SignCategoryDto
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.network.LawApiService
import com.example.smarttraffic.network.SignApiService
import com.example.smarttraffic.ui.adapter.LawCategoryAdapter
import com.example.smarttraffic.ui.adapter.SignCategoryAdapter
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của QuizCategory.
 */
class                   QuizCategoryActivity : AppCompatActivity() {

    private lateinit var rvCategories: RecyclerView
    private var type: String = "Law"
    private var license: String = "b2"

        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_quiz_category)

        type = intent.getStringExtra("type") ?: "Law"
        val title = if (type == "Law") "Quiz Luật giao thông" else "Quiz Biển báo đường bộ"
        findViewById<TextView>(R.id.tvTitle).text = title

        val sharedPref = getSharedPreferences("UserPrefs", MODE_PRIVATE)
        license = sharedPref.getString("LEARNING_GOAL", "b2")?.lowercase() ?: "b2"

        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }

        rvCategories = findViewById(R.id.rvCategories)
        rvCategories.layoutManager = LinearLayoutManager(this)

        if (type == "Law") {
            fetchLawCategories()
        } else {
            fetchSignCategories()
        }

        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, -1)
    }

    private fun fetchLawCategories() {
        val apiService = RetrofitClient.retrofit.create(LawApiService::class.java)
        apiService.getCategories().enqueue(object : Callback<List<LawCategoryDto>> {
            override fun onResponse(call: Call<List<LawCategoryDto>>, response: Response<List<LawCategoryDto>>) {
                if (response.isSuccessful && response.body() != null) {
                    val adapter = LawCategoryAdapter(response.body()!!) { category ->
                        openQuiz(category.id, "Law", category.name)
                    }
                    rvCategories.adapter = adapter
                }
            }
            override fun onFailure(call: Call<List<LawCategoryDto>>, t: Throwable) {
                Toast.makeText(this@QuizCategoryActivity, "Lỗi tải dữ liệu", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun fetchSignCategories() {
        val apiService = RetrofitClient.retrofit.create(SignApiService::class.java)
        apiService.getCategories().enqueue(object : Callback<List<SignCategoryDto>> {
            override fun onResponse(call: Call<List<SignCategoryDto>>, response: Response<List<SignCategoryDto>>) {
                if (response.isSuccessful && response.body() != null) {
                    val adapter = SignCategoryAdapter(response.body()!!) { category ->
                        openQuiz(category.id, "Sign", category.name)
                    }
                    rvCategories.adapter = adapter
                }
            }
            override fun onFailure(call: Call<List<SignCategoryDto>>, t: Throwable) {
                Toast.makeText(this@QuizCategoryActivity, "Lỗi tải dữ liệu", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun openQuiz(categoryId: Int, quizType: String, categoryName: String) {
        val intent = Intent(this, QuizCategoryListActivity::class.java)
        intent.putExtra("license", license)
        intent.putExtra("type", quizType)
        intent.putExtra("category_id", categoryId)
        intent.putExtra("category_name", categoryName)
        startActivity(intent)
    }
}
