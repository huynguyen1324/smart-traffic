package com.example.smarttraffic.ui.lesson

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.LawCategoryDto
import com.example.smarttraffic.repository.LawApiRepository
import com.example.smarttraffic.ui.adapter.LawCategoryAdapter
import com.example.smarttraffic.util.NavigationHelper

class LawListActivity : AppCompatActivity() {

    private val repository = LawApiRepository()
    private lateinit var adapter: LawCategoryAdapter
    private lateinit var rvLessons: RecyclerView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_law_list)

        findViewById<View>(R.id.btnBack)?.setOnClickListener {
            NavigationHelper.navigateTo(this, com.example.smarttraffic.ui.home.HomeActivity::class.java, true)
        }

        setupRecyclerView()
        loadCategories()
        
        // --- BOTTOM NAVIGATION ---
        NavigationHelper.setupBottomNav(this, R.id.navLaw)
    }

    private fun setupRecyclerView() {
        rvLessons = findViewById(R.id.rvLessons)

        adapter = LawCategoryAdapter(emptyList()) { category ->
            val intent = Intent(this, LawCategoryActivity::class.java).apply {
                putExtra("category_id", category.id)
                putExtra("category_name", category.name)
            }
            startActivity(intent)
        }

        rvLessons.layoutManager = LinearLayoutManager(this)
        rvLessons.adapter = adapter
        rvLessons.setHasFixedSize(true)
    }

    private fun loadCategories() {
        repository.getCategories().enqueue(object : retrofit2.Callback<List<LawCategoryDto>> {
            override fun onResponse(
                call: retrofit2.Call<List<LawCategoryDto>>,
                response: retrofit2.Response<List<LawCategoryDto>>
            ) {
                if (response.isSuccessful) {
                    val categories = response.body() ?: emptyList()
                    adapter.updateData(categories)
                } else {
                    Toast.makeText(this@LawListActivity, "Lỗi server", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: retrofit2.Call<List<LawCategoryDto>>, t: Throwable) {
                Toast.makeText(this@LawListActivity, "Lỗi kết nối mạng", Toast.LENGTH_SHORT).show()
            }
        })
    }
}