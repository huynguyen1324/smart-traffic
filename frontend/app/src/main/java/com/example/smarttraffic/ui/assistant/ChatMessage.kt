package com.example.smarttraffic.ui.assistant

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của ChatMessage.
 */
data class ChatMessage(
    val text: String,
    val isUser: Boolean,
    val isSuggestion: Boolean = false,
    val suggestions: List<String>? = null,
    val imageUri: android.net.Uri? = null
)
