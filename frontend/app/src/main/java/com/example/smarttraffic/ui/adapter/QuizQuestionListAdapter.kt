package com.example.smarttraffic.ui.adapter

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.QuizQuestionDto

/**
 * Adapter RecyclerView quản lý danh sách hiển thị và liên kết dữ liệu cho giao diện QuizQuestionList.
 */
class QuizQuestionListAdapter(
    private val questions: List<QuizQuestionDto>,
    private var resultsMap: Map<Int, Int> = emptyMap(),
    private val onQuestionClick: (QuizQuestionDto, Int) -> Unit
) : RecyclerView.Adapter<QuizQuestionListAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvQuestionNumber: TextView = view.findViewById(R.id.tvQuestionNumber)
    }

    fun updateResults(newResults: Map<Int, Int>) {
        this.resultsMap = newResults
        notifyDataSetChanged()
    }

        /**
     * Tạo và khởi tạo một ViewHolder mới đại diện cho giao diện phần tử danh sách.
     * @param parent Nhóm View cha chứa phần tử
     * @param viewType Kiểu giao diện phần tử
     * @return ViewHolder mới chứa view
     */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_quiz_question_grid, parent, false)
        return ViewHolder(view)
    }

        /**
     * Kết nối dữ liệu cụ thể từ danh sách vào các thành phần View của ViewHolder tương ứng.
     * @param holder ViewHolder chứa các ánh xạ view cần cập nhật
     * @param position Vị trí hiện tại của phần tử dữ liệu
     */
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val question = questions[position]
        holder.tvQuestionNumber.text = (position + 1).toString()

        val status = resultsMap[question.id]

        when (status) {
            1 -> { // Đúng (Green)
                holder.tvQuestionNumber.setBackgroundResource(R.drawable.bg_question_item_correct)
                holder.tvQuestionNumber.setTextColor(Color.parseColor("#166534"))
            }
            0 -> { // Sai (Red) - Lưu ý: trong DB correct có thể là 0
                holder.tvQuestionNumber.setBackgroundResource(R.drawable.bg_question_item_wrong)
                holder.tvQuestionNumber.setTextColor(Color.parseColor("#991B1B"))
            }
            else -> { // Chưa làm (Grey)
                holder.tvQuestionNumber.setBackgroundResource(R.drawable.bg_question_item_normal)
                holder.tvQuestionNumber.setTextColor(Color.parseColor("#334155"))
            }
        }

        holder.itemView.setOnClickListener { onQuestionClick(question, position) }
    }

        /**
     * Trả về tổng số lượng phần tử có trong danh sách hiển thị.
     */
    override fun getItemCount() = questions.size
}
