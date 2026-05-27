package com.example.smarttraffic.ui.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.SignDto

/**
 * Adapter RecyclerView quản lý danh sách hiển thị và liên kết dữ liệu cho giao diện Sign.
 */
class SignAdapter(
    private var signs: List<SignDto>,
    private val onItemClick: (SignDto) -> Unit
) : RecyclerView.Adapter<SignAdapter.SignViewHolder>() {

    private val imageUrlFullBase = com.example.smarttraffic.network.RetrofitClient.IMAGE_URL_BASE

    /**
 * Adapter RecyclerView quản lý danh sách hiển thị và liên kết dữ liệu cho giao diện Sign.
 */
class SignViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val imgSign: ImageView = view.findViewById(R.id.imgSign1)
        val tvName: TextView = view.findViewById(R.id.tvName1)
        val tvCode: TextView = view.findViewById(R.id.tvCode1)
    }

        /**
     * Tạo và khởi tạo một ViewHolder mới đại diện cho giao diện phần tử danh sách.
     * @param parent Nhóm View cha chứa phần tử
     * @param viewType Kiểu giao diện phần tử
     * @return ViewHolder mới chứa view
     */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SignViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_sign_grid, parent, false)
        return SignViewHolder(view)
    }

    override fun onBindViewHolder(holder: SignViewHolder, position: Int) {
        val sign = signs[position]
        holder.tvName.text = sign.title
        holder.tvCode.text = sign.sign_code
        
        val fullImageUrl = com.example.smarttraffic.network.RetrofitClient.getFullImageUrl(sign.image_url)
        
        Glide.with(holder.itemView.context)
            .load(fullImageUrl)
            .placeholder(R.drawable.ic_loading_placeholder)
            .error(R.drawable.ic_loading_placeholder)
            .into(holder.imgSign)
        
        holder.itemView.setOnClickListener { onItemClick(sign) }
    }

        /**
     * Trả về tổng số lượng phần tử có trong danh sách hiển thị.
     */
    override fun getItemCount() = signs.size

    fun updateData(newSigns: List<SignDto>) {
        this.signs = newSigns
        notifyDataSetChanged()
    }
}