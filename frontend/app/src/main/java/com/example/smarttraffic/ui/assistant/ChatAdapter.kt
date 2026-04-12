package com.example.smarttraffic.ui.assistant

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
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
            is SuggestionViewHolder -> holder.bind()
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
        private val btnSignAsk: MaterialButton = itemView.findViewById(R.id.btnSignAsk)
        private val btnTurnRight: MaterialButton = itemView.findViewById(R.id.btnTurnRight)

        fun bind() {
            btnSignAsk.setOnClickListener { onSuggestionClick("Giải thích ý nghĩa biển báo cấm") }
            btnTurnRight.setOnClickListener { onSuggestionClick("Thế nào là rẽ phải đúng luật?") }
        }
    }
}
