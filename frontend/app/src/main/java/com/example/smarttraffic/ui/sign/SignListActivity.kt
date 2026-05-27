package com.example.smarttraffic.ui.sign

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.widget.EditText
import android.widget.HorizontalScrollView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.SignCategoryDto
import com.example.smarttraffic.dto.SignDto
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.network.SignApiService
import com.example.smarttraffic.ui.adapter.SignAdapter
import com.example.smarttraffic.ui.home.HomeActivity
import com.example.smarttraffic.ui.profile.ProfileActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của SignList.
 */
class SignListActivity : AppCompatActivity() {

    private lateinit var rvSigns: RecyclerView
    private lateinit var signAdapter: SignAdapter
    private lateinit var tabContainer: LinearLayout

    private var allSigns: List<SignDto> = emptyList()
    private var filteredSigns: List<SignDto> = emptyList()
    private var selectedCategoryId: Int = -1  // -1 = all

        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_list)

        rvSigns = findViewById(R.id.rvSigns)
        tabContainer = findViewById(R.id.tabContainer)

        signAdapter = SignAdapter(emptyList()) { sign ->
            val intent = Intent(this, SignDetailActivity::class.java)
            intent.putExtra("sign_id", sign.id)
            startActivity(intent)
        }
        rvSigns.layoutManager = GridLayoutManager(this, 2)
        rvSigns.adapter = signAdapter

        val etSearch = findViewById<EditText>(R.id.etSearch)
        etSearch.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                filterSigns(s?.toString() ?: "")
            }
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

        loadCategories()
        loadAllSigns()

        findViewById<View>(R.id.btnBack).setOnClickListener {
            com.example.smarttraffic.util.NavigationHelper.navigateTo(this, com.example.smarttraffic.ui.home.HomeActivity::class.java, true)
        }

        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, R.id.navSign)
    }

    private fun loadCategories() {
        val api = RetrofitClient.retrofit.create(SignApiService::class.java)
        api.getCategories().enqueue(object : Callback<List<SignCategoryDto>> {
            override fun onResponse(call: Call<List<SignCategoryDto>>, response: Response<List<SignCategoryDto>>) {
                if (response.isSuccessful && response.body() != null) {
                    buildTabs(response.body()!!)
                }
            }
            override fun onFailure(call: Call<List<SignCategoryDto>>, t: Throwable) {
                Toast.makeText(this@SignListActivity, "Lỗi tải danh mục", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun buildTabs(categories: List<SignCategoryDto>) {
        tabContainer.removeAllViews()

        addTab("Tất cả", -1, true)
        categories.forEach { cat ->
            addTab(cat.name, cat.id, false)
        }
    }

    private fun addTab(title: String, categoryId: Int, isSelected: Boolean) {
        val tab = LayoutInflater.from(this).inflate(R.layout.item_tab_sign, tabContainer, false) as TextView
        tab.text = title
        setTabStyle(tab, isSelected)

        tab.setOnClickListener {
            for (i in 0 until tabContainer.childCount) {
                setTabStyle(tabContainer.getChildAt(i) as TextView, false)
            }
            setTabStyle(tab, true)
            selectedCategoryId = categoryId
            filterSigns(findViewById<EditText>(R.id.etSearch).text.toString())
        }
        tabContainer.addView(tab)
    }

    private fun setTabStyle(tab: TextView, selected: Boolean) {
        if (selected) {
            tab.setTextColor(ContextCompat.getColor(this, android.R.color.holo_blue_light))
            tab.setBackgroundResource(R.drawable.bg_tab_selected)
        } else {
            tab.setTextColor(Color.parseColor("#0F172A"))
            tab.setBackgroundResource(R.drawable.bg_tab_unselected)
        }
    }

    private fun loadAllSigns() {
        val api = RetrofitClient.retrofit.create(SignApiService::class.java)
        api.getAllSigns().enqueue(object : Callback<List<SignDto>> {
            override fun onResponse(call: Call<List<SignDto>>, response: Response<List<SignDto>>) {
                if (response.isSuccessful) {
                    allSigns = response.body() ?: emptyList()
                    filterSigns("")
                }
            }
            override fun onFailure(call: Call<List<SignDto>>, t: Throwable) {
                Toast.makeText(this@SignListActivity, "Lỗi tải biển báo", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun filterSigns(query: String) {
        val normalizedQuery = removeAccents(query.lowercase())
        filteredSigns = allSigns
            .let { list ->
                if (selectedCategoryId == -1) list
                else list.filter { it.category_id == selectedCategoryId }
            }
            .let { list ->
                if (query.isBlank()) list
                else list.filter {
                    val normalizedTitle = removeAccents(it.title?.lowercase() ?: "")
                    val normalizedCode = removeAccents(it.sign_code?.lowercase() ?: "")
                    normalizedTitle.contains(normalizedQuery) || normalizedCode.contains(normalizedQuery)
                }
            }
        signAdapter.updateData(filteredSigns)
    }

    private fun removeAccents(src: String): String {
        val nfdNormalizedString = java.text.Normalizer.normalize(src, java.text.Normalizer.Form.NFD)
        val pattern = java.util.regex.Pattern.compile("\\p{InCombiningDiacriticalMarks}+")
        return pattern.matcher(nfdNormalizedString).replaceAll("").replace('đ', 'd').replace('Đ', 'D')
    }
}