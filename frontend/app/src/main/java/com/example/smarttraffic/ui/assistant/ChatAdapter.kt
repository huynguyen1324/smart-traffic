package com.example.smarttraffic.ui.assistant

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import android.widget.LinearLayout
import android.view.Gravity
import android.graphics.Color
import android.content.res.ColorStateList
import com.example.smarttraffic.R
import com.google.android.material.button.MaterialButton

class ChatAdapter(
    private val messages: List<ChatMessage>,
    private val onSuggestionClick: (String) -> Unit
) : RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    companion object {
        private const val VIEW_TYPE_USER = 1
        private const val VIEW_TYPE_BOT = 2
        private const val VIEW_TYPE_SUGGESTION = 3
    }

    override fun getItemViewType(position: Int): Int {
        val message = messages[position]
        return when {
            message.isSuggestion -> VIEW_TYPE_SUGGESTION
            message.isUser -> VIEW_TYPE_USER
            else -> VIEW_TYPE_BOT
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return when (viewType) {
            VIEW_TYPE_USER -> {
                val view = LayoutInflater.from(parent.context).inflate(R.layout.item_chat_user, parent, false)
                UserViewHolder(view)
            }
            VIEW_TYPE_SUGGESTION -> {
                val view = LayoutInflater.from(parent.context).inflate(R.layout.item_chat_suggestions, parent, false)
                SuggestionViewHolder(view)
            }
            else -> {
                val view = LayoutInflater.from(parent.context).inflate(R.layout.item_chat_bot, parent, false)
                BotViewHolder(view)
            }
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val message = messages[position]
        when (holder) {
            is UserViewHolder -> holder.bind(message)
            is BotViewHolder -> holder.bind(message)
            is SuggestionViewHolder -> holder.bind(message)
        }
    }

    override fun getItemCount(): Int = messages.size

    inner class UserViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvUserMsg: TextView = itemView.findViewById(R.id.tvUserMsg)
        private val imgUserAttachment: android.widget.ImageView = itemView.findViewById(R.id.imgUserAttachment)
        
        fun bind(message: ChatMessage) {
            tvUserMsg.text = message.text
            if (message.text.isBlank()) {
                tvUserMsg.visibility = View.GONE
            } else {
                tvUserMsg.visibility = View.VISIBLE
            }

            if (message.imageUri != null) {
                imgUserAttachment.visibility = View.VISIBLE
                com.bumptech.glide.Glide.with(itemView.context)
                    .load(message.imageUri)
                    .into(imgUserAttachment)
            } else {
                imgUserAttachment.visibility = View.GONE
            }
        }
    }

    inner class BotViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val tvBotMsg: TextView = itemView.findViewById(R.id.tvBotMsg)
        fun bind(message: ChatMessage) {
            tvBotMsg.text = message.text
        }
    }

    inner class SuggestionViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val container: ViewGroup = itemView.findViewById(R.id.suggestionsContainer)

        fun bind(message: ChatMessage) {
            container.removeAllViews()
            
            val suggestionList = message.suggestions ?: listOf(
                "Giải thích ý nghĩa biển báo cấm",
                "Thế nào là rẽ phải đúng luật?"
            )

            for (text in suggestionList) {
                val button = MaterialButton(itemView.context, null, com.google.android.material.R.attr.materialButtonOutlinedStyle)
                val params = LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    (52 * itemView.context.resources.displayMetrics.density).toInt()
                )
                params.setMargins(0, 0, 0, (8 * itemView.context.resources.displayMetrics.density).toInt())
                button.layoutParams = params
                button.text = text
                button.isAllCaps = false
                button.cornerRadius = (16 * itemView.context.resources.displayMetrics.density).toInt()
                button.setPadding((16 * itemView.context.resources.displayMetrics.density).toInt(), 0, 0, 0)
                button.gravity = Gravity.START or Gravity.CENTER_VERTICAL
                button.setTextColor(Color.parseColor("#0369A1"))
                button.strokeColor = ColorStateList.valueOf(Color.parseColor("#22C1E8"))
                button.strokeWidth = (1.5 * itemView.context.resources.displayMetrics.density).toInt()
                button.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#F0F9FF"))
                
                button.setOnClickListener { onSuggestionClick(text) }
                container.addView(button)
            }
        }
    }
}
