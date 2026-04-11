package com.example.smarttraffic.ui.quiz

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.QuizQuestionDto
import com.example.smarttraffic.network.QuizApiService
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.ui.adapter.QuizQuestionListAdapter
import com.example.smarttraffic.util.NavigationHelper
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class QuizCategoryListActivity : AppCompatActivity() {

    private lateinit var rvQuestions: RecyclerView
    private lateinit var tvTitle: TextView
    private lateinit var tvTotal: TextView
    private lateinit var tvCorrect: TextView
    private lateinit var tvWrong: TextView

    private var license: String = "b2"
    private var type: String = "Law"
    private var categoryId: Int = -1
    private var categoryName: String = ""
    
    // Lưu trữ kết quả (ID câu hỏi -> 0: Sai, 1: Đúng)
    private var resultsMap = mutableMapOf<Int, Int>()
    private var allQuestions = listOf<QuizQuestionDto>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_quiz_category_list)

        license = intent.getStringExtra("license") ?: "b2"
        type = intent.getStringExtra("type") ?: "Law"
        categoryId = intent.getIntExtra("category_id", -1)
        categoryName = intent.getStringExtra("category_name") ?: "Danh sách"

        bindViews()
        tvTitle.text = categoryName

        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }

        rvQuestions.layoutManager = GridLayoutManager(this, 5)
        
        loadQuestions()
        NavigationHelper.setupBottomNav(this, -1)
    }

    override fun onResume() {
        super.onResume()
        // Mỗi khi quay lại màn hình này, tự động tải lại kết quả từ DB
        syncProgressFromBackend()
    }

    private fun bindViews() {
        rvQuestions = findViewById(R.id.rvQuestions)
        tvTitle = findViewById(R.id.tvTitle)
        tvTotal = findViewById(R.id.tvTotal)
        tvCorrect = findViewById(R.id.tvCorrect)
        tvWrong = findViewById(R.id.tvWrong)
    }

    private fun loadQuestions() {
        val api = RetrofitClient.retrofit.create(QuizApiService::class.java)
        val call = if (categoryId != -1) {
            api.getQuestionsByTypeAndCategory(license, type, categoryId)
        } else {
            api.getQuestionsByType(license, type)
        }

        call.enqueue(object : Callback<List<QuizQuestionDto>> {
            override fun onResponse(call: Call<List<QuizQuestionDto>>, response: Response<List<QuizQuestionDto>>) {
                if (response.isSuccessful && response.body() != null) {
                    allQuestions = response.body()!!
                    setupRecyclerView()
                    updateStatistics()
                }
            }
            override fun onFailure(call: Call<List<QuizQuestionDto>>, t: Throwable) {
                Toast.makeText(this@QuizCategoryListActivity, "Lỗi kết nối: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun syncProgressFromBackend() {
        val userId = getSharedPreferences("UserPrefs", MODE_PRIVATE).getInt("USER_ID", -1)
        if (userId == -1) return

        val api = RetrofitClient.retrofit.create(QuizApiService::class.java)
        api.getQuizDetails(userId).enqueue(object : Callback<List<com.example.smarttraffic.dto.QuizDetailResponse>> {
            override fun onResponse(
                call: Call<List<com.example.smarttraffic.dto.QuizDetailResponse>>,
                response: Response<List<com.example.smarttraffic.dto.QuizDetailResponse>>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    val details = response.body()!!
                    resultsMap.clear()
                    details.forEach {
                        resultsMap[it.question_id] = it.correct
                    }
                    
                    // Cập nhật adapter nếu đã tồn tại
                    (rvQuestions.adapter as? QuizQuestionListAdapter)?.updateResults(resultsMap)
                    updateStatistics()
                }
            }
            override fun onFailure(call: Call<List<com.example.smarttraffic.dto.QuizDetailResponse>>, t: Throwable) {}
        })
    }

    private fun setupRecyclerView() {
        val adapter = QuizQuestionListAdapter(allQuestions, resultsMap) { question, position ->
            val intent = Intent(this, QuizActivity::class.java)
            intent.putExtra("license", license)
            intent.putExtra("type", type)
            intent.putExtra("category_id", categoryId)
            intent.putExtra("category_name", categoryName)
            intent.putExtra("start_index", position)
            startActivity(intent)
        }
        rvQuestions.adapter = adapter
    }

    private fun updateStatistics() {
        tvTotal.text = allQuestions.size.toString()
        var correct = 0
        var wrong = 0
        
        allQuestions.forEach { question ->
            val status = resultsMap[question.id]
            if (status == 1) correct++
            else if (status == 0) wrong++
        }
        
        tvCorrect.text = correct.toString()
        tvWrong.text = wrong.toString()
    }
}
