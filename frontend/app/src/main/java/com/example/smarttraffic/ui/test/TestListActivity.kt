package com.example.smarttraffic.ui.test

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.TestDto
import com.example.smarttraffic.network.QuizApiService
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.util.SessionManager
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của TestList.
 */
class TestListActivity : AppCompatActivity() {

    private lateinit var session: SessionManager
    private lateinit var adapter: TestAdapter

        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_test_list)

        session = SessionManager(this)
        
        findViewById<View>(R.id.btnBack).setOnClickListener {
            com.example.smarttraffic.util.NavigationHelper.navigateTo(this, com.example.smarttraffic.ui.home.HomeActivity::class.java, true)
        }

        val rvTests = findViewById<RecyclerView>(R.id.rvTests)
        rvTests.layoutManager = LinearLayoutManager(this)
        adapter = TestAdapter { test ->
            val intent = Intent(this, TestActivity::class.java)
            intent.putExtra("TEST_ID", test.id)
            intent.putExtra("LICENSE", session.learningGoal)
            startActivity(intent)
        }
        rvTests.adapter = adapter

        loadTests()

        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, R.id.navQuiz)
    }

    private fun loadTests() {
        val api = RetrofitClient.retrofit.create(QuizApiService::class.java)
        val license = session.learningGoal
        val userId = session.userId
        
        api.getTestList(license).enqueue(object : Callback<List<TestDto>> {
            override fun onResponse(call: Call<List<TestDto>>, response: Response<List<TestDto>>) {
                if (response.isSuccessful) {
                    val tests = response.body() ?: emptyList()
                    
                    api.getTestResultsByUser(userId).enqueue(object : Callback<List<com.example.smarttraffic.dto.TestResultDto>> {
                        override fun onResponse(call: Call<List<com.example.smarttraffic.dto.TestResultDto>>, res: Response<List<com.example.smarttraffic.dto.TestResultDto>>) {
                            if (res.isSuccessful) {
                                val results = res.body() ?: emptyList()
                                tests.forEach { test ->
                                    val userResult = results.filter { it.test_id == test.id }
                                    if (userResult.isNotEmpty()) {
                                        test.isCompleted = true
                                        val best = userResult.maxOf { it.correct }
                                        test.highSubScore = "$best/${test.total ?: 25}" // Assuming 25 if not provided
                                    }
                                }
                            }
                            adapter.submitList(tests)
                        }

                        override fun onFailure(call: Call<List<com.example.smarttraffic.dto.TestResultDto>>, t: Throwable) {
                            adapter.submitList(tests) // Show tests anyway
                        }
                    })
                } else {
                    Toast.makeText(this@TestListActivity, "Lỗi tải danh sách đề", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<List<TestDto>>, t: Throwable) {
                Toast.makeText(this@TestListActivity, "Lỗi kết nối", Toast.LENGTH_SHORT).show()
            }
        })
    }

    inner /**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của TestList.
 */
class TestAdapter(private val onClick: (TestDto) -> Unit) : RecyclerView.Adapter<TestAdapter.ViewHolder>() {
        private var list: List<TestDto> = emptyList()

        fun submitList(newList: List<TestDto>) {
            list = newList
            notifyDataSetChanged()
        }

            /**
     * Tạo và khởi tạo một ViewHolder mới đại diện cho giao diện phần tử danh sách.
     * @param parent Nhóm View cha chứa phần tử
     * @param viewType Kiểu giao diện phần tử
     * @return ViewHolder mới chứa view
     */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val view = LayoutInflater.from(parent.context).inflate(R.layout.item_test, parent, false)
            return ViewHolder(view)
        }

            /**
     * Kết nối dữ liệu cụ thể từ danh sách vào các thành phần View của ViewHolder tương ứng.
     * @param holder ViewHolder chứa các ánh xạ view cần cập nhật
     * @param position Vị trí hiện tại của phần tử dữ liệu
     */
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            val test = list[position]
            holder.tvName.text = "Đề số ${test.id}"
            
            if (test.isCompleted) {
                holder.tvStatus.text = "Đã làm - Điểm cao nhất: ${test.highSubScore}"
                holder.tvStatus.setTextColor(holder.itemView.context.getColor(R.color.success_green)) // Assuming success_green exists
            } else {
                holder.tvStatus.text = "Chưa thực hiện"
                holder.tvStatus.setTextColor(holder.itemView.context.getColor(R.color.text_secondary))
            }

            holder.itemView.setOnClickListener { onClick(test) }
        }

            /**
     * Trả về tổng số lượng phần tử có trong danh sách hiển thị.
     */
    override fun getItemCount() = list.size

        inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
            val tvName: TextView = view.findViewById(R.id.tvTestName)
            val tvStatus: TextView = view.findViewById(R.id.tvStatus)
        }
    }
}
