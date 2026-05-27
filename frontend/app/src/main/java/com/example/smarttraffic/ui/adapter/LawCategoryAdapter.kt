package com.example.smarttraffic.ui.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.LawCategoryDto

/**
 * Adapter RecyclerView quản lý danh sách hiển thị và liên kết dữ liệu cho giao diện LawCategory.
 */
class LawCategoryAdapter(
    private var categories: List<LawCategoryDto>,
    private val onItemClick: (LawCategoryDto) -> Unit
) : RecyclerView.Adapter<LawCategoryAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvNumber: TextView = view.findViewById(R.id.tvNumber)
        val tvTitle: TextView = view.findViewById(R.id.tvTopicTitle)
    }

        /**
     * Tạo và khởi tạo một ViewHolder mới đại diện cho giao diện phần tử danh sách.
     * @param parent Nhóm View cha chứa phần tử
     * @param viewType Kiểu giao diện phần tử
     * @return ViewHolder mới chứa view
     */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_law_category, parent, false)
        return ViewHolder(view)
    }

        /**
     * Kết nối dữ liệu cụ thể từ danh sách vào các thành phần View của ViewHolder tương ứng.
     * @param holder ViewHolder chứa các ánh xạ view cần cập nhật
     * @param position Vị trí hiện tại của phần tử dữ liệu
     */
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val category = categories[position]
        holder.tvNumber.text = (position + 1).toString()
        holder.tvTitle.text = category.name

        holder.itemView.setOnClickListener {
            onItemClick(category)
        }
    }

        /**
     * Trả về tổng số lượng phần tử có trong danh sách hiển thị.
     */
    override fun getItemCount(): Int = categories.size

    fun updateData(newCategories: List<LawCategoryDto>) {
        categories = newCategories
        notifyDataSetChanged()
    }
}