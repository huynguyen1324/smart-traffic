package com.example.smarttraffic.ui.assistant

data class ChatMessage(
    val text: String,
    val isUser: Boolean,
    val isSuggestion: Boolean = false,
    val suggestions: List<String>? = null,
    val imageUri: android.net.Uri? = null
)
