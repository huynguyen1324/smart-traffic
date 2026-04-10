package com.example.smarttraffic.ui.sign

import android.content.res.ColorStateList
import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.SignCategoryDto

class SignCategoryAdapter(
    private var categories: List<SignCategoryDto>,
    private val onClick: (SignCategoryDto) -> Unit
) : RecyclerView.Adapter<SignCategoryAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvCategoryName: TextView = view.findViewById(R.id.tvCategoryName)
        val ivIcon: ImageView = view.findViewById(R.id.ivIcon)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_sign_category, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val category = categories[position]
        holder.tvCategoryName.text = "${position + 1}. ${category.name}"
        
        val (tintColor, bgTint) = when {
            category.name.lowercase().contains("cấm") -> "#EF4444" to "#FEE2E2"
            category.name.lowercase().contains("cảnh báo") || category.name.lowercase().contains("nguy hiểm") -> "#F59E0B" to "#FEF3C7"
            category.name.lowercase().contains("hiệu lệnh") -> "#3B82F6" to "#DBEAFE"
            category.name.lowercase().contains("chỉ dẫn") -> "#06B6D4" to "#CFFAFE"
            category.name.lowercase().contains("phụ") -> "#64748B" to "#F1F5F9"
            else -> "#22C1E8" to "#E0F2FE"
        }
        
        holder.ivIcon.imageTintList = ColorStateList.valueOf(Color.parseColor(tintColor))
        holder.ivIcon.backgroundTintList = ColorStateList.valueOf(Color.parseColor(bgTint))

        holder.itemView.setOnClickListener { onClick(category) }
    }

    override fun getItemCount() = categories.size

    fun updateData(newCategories: List<SignCategoryDto>) {
        categories = newCategories
        notifyDataSetChanged()
    }
}
