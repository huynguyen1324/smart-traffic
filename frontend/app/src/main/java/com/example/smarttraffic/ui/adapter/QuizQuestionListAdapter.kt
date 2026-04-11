package com.example.smarttraffic.ui.adapter

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.QuizQuestionDto

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

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_quiz_question_grid, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val question = questions[position]
        holder.tvQuestionNumber.text = (position + 1).toString()

        // Lấy trạng thái trực tiếp từ Map (0 = sai, 1 = đúng, null/khác = chưa làm)
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

    override fun getItemCount() = questions.size
}
