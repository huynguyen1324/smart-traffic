package com.example.smarttraffic.ui.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.SignCategoryDto

class SignCategoryAdapter(
    private var categories: List<SignCategoryDto>,
    private val onItemClick: (SignCategoryDto) -> Unit
) : RecyclerView.Adapter<SignCategoryAdapter.ViewHolder>() {

    fun updateData(newCategories: List<SignCategoryDto>) {
        categories = newCategories
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        // Dùng chung layout với LawCategory để tiết kiệm code và layout
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_law_category, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val category = categories[position]
        holder.tvNumber.text = (position + 1).toString()
        holder.tvTopicTitle.text = category.name
        holder.itemView.setOnClickListener { onItemClick(category) }
    }

    override fun getItemCount(): Int = categories.size

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvNumber: TextView = view.findViewById(R.id.tvNumber)
        val tvTopicTitle: TextView = view.findViewById(R.id.tvTopicTitle)
    }
}
