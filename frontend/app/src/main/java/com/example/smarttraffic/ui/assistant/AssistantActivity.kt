package com.example.smarttraffic.ui.assistant

import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.ImageView
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.smarttraffic.R
import com.example.smarttraffic.network.RetrofitClient
import com.google.android.material.button.MaterialButton
import okhttp3.MediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của Assistant.
 */
class AssistantActivity : AppCompatActivity() {

    private lateinit var recyclerViewChat: RecyclerView
    private lateinit var chatAdapter: ChatAdapter
    private val messages = mutableListOf<ChatMessage>()
    
    private var currentImageUri: Uri? = null
    private var cameraImageUri: Uri? = null
    
    private lateinit var previewContainer: View
    private lateinit var imgPreview: ImageView
    private lateinit var btnRemoveImage: ImageView

    private val pickImageLauncher = registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
        if (uri != null) {
            handleImageSelected(uri)
        }
    }

    private val captureImageLauncher = registerForActivityResult(ActivityResultContracts.TakePicture()) { success: Boolean ->
        if (success && cameraImageUri != null) {
            handleImageSelected(cameraImageUri!!)
        }
    }

    private val requestPermissionLauncher = registerForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted: Boolean ->
        if (isGranted) {
            openCamera()
        } else {
            android.widget.Toast.makeText(this, "Bạn cần cấp quyền Camera để chụp ảnh", android.widget.Toast.LENGTH_SHORT).show()
        }
    }

    private fun handleImageSelected(uri: Uri) {
        currentImageUri = uri
        previewContainer.visibility = View.VISIBLE
        Glide.with(this).load(uri).into(imgPreview)
    }

        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_assistant)

        previewContainer = findViewById(R.id.previewContainer)
        imgPreview = findViewById(R.id.imgPreview)
        btnRemoveImage = findViewById(R.id.btnRemoveImage)
        
        btnRemoveImage.setOnClickListener {
            currentImageUri = null
            previewContainer.visibility = View.GONE
        }

        findViewById<View>(R.id.btnAttach).setOnClickListener {
            showImagePickDialog()
        }

        findViewById<View>(R.id.btnBack).setOnClickListener {
            finish()
        }

        recyclerViewChat = findViewById(R.id.recyclerViewChat)
        chatAdapter = ChatAdapter(messages) { suggestion ->
            handleSendMessage(suggestion)
        }
        val layoutManager = LinearLayoutManager(this).apply {
            stackFromEnd = true
        }
        recyclerViewChat.layoutManager = layoutManager
        recyclerViewChat.adapter = chatAdapter

        messages.add(ChatMessage("Xin chào! Tôi là trợ lý AI của bạn. Tôi có thể giúp bạn tra cứu luật, biển báo, luyện thi và tìm địa điểm thi. Bạn muốn bắt đầu từ đâu?", isUser = false))
        messages.add(ChatMessage("", isUser = false, isSuggestion = true, suggestions = listOf(
            "Luật nồng độ cồn mới nhất",
            "Mẹo thi bằng lái xe A1",
            "Tra cứu biển báo cấm ô tô",
            "Tìm trung tâm sát hạch gần đây"
        )))
        chatAdapter.notifyItemRangeInserted(0, 2)

        val btnSend = findViewById<MaterialButton>(R.id.btnSend)
        val edtMessage = findViewById<EditText>(R.id.edtMessage)

        btnSend.setOnClickListener {
            val text = edtMessage.text.toString()
            if (text.isNotBlank() || currentImageUri != null) {
                handleSendMessage(text, currentImageUri)
                edtMessage.text.clear()
                currentImageUri = null
                previewContainer.visibility = View.GONE
            }
        }

        com.example.smarttraffic.util.NavigationHelper.setupBottomNav(this, -1)
    }

    private fun showImagePickDialog() {
        val options = arrayOf("Máy ảnh", "Thư viện ảnh")
        androidx.appcompat.app.AlertDialog.Builder(this)
            .setTitle("Chọn ảnh biển báo")
            .setItems(options) { _, which ->
                when (which) {
                    0 -> checkCameraPermissionAndOpen()
                    1 -> pickImageLauncher.launch("image/*")
                }
            }
            .show()
    }

    private fun checkCameraPermissionAndOpen() {
        if (androidx.core.content.ContextCompat.checkSelfPermission(this, android.Manifest.permission.CAMERA) == android.content.pm.PackageManager.PERMISSION_GRANTED) {
            openCamera()
        } else {
            requestPermissionLauncher.launch(android.Manifest.permission.CAMERA)
        }
    }

    private fun openCamera() {
        val photoFile = java.io.File(cacheDir, "temp_camera_image_${System.currentTimeMillis()}.jpg")
        cameraImageUri = androidx.core.content.FileProvider.getUriForFile(
            this,
            "${packageName}.fileprovider",
            photoFile
        )
        captureImageLauncher.launch(cameraImageUri)
    }

        /**
     * Xử lý gửi tin nhắn của người dùng đi kèm ảnh đính kèm (nếu có) lên trợ lý ảo AI.
     * Đồng thời quản lý lịch sử trò chuyện và cập nhật UI trạng thái "Đang xử lý...".
     * @param text Nội dung tin nhắn dạng chữ
     * @param imageUri Địa chỉ Uri dẫn đến file ảnh đính kèm
     */
    private fun handleSendMessage(text: String, imageUri: Uri? = null) {
        findViewById<MaterialButton>(R.id.btnSend).isEnabled = false
        hideKeyboard() // Hạ bàn phím ngay lập tức
        
        messages.add(ChatMessage(text, isUser = true, imageUri = imageUri))
        chatAdapter.notifyItemInserted(messages.size - 1)
        recyclerViewChat.scrollToPosition(messages.size - 1)

        messages.add(ChatMessage("Đang xử lý...", isUser = false))
        val typingPosition = messages.size - 1
        chatAdapter.notifyItemInserted(typingPosition)
        recyclerViewChat.scrollToPosition(typingPosition)

        val textBody = RequestBody.create(MediaType.parse("text/plain"), text)
        val userId = com.example.smarttraffic.util.SessionManager(this).userId
        val userIdBody = if (userId != -1) RequestBody.create(MediaType.parse("text/plain"), userId.toString()) else null
        
        val historyArray = org.json.JSONArray()
        val historyLimit = (messages.size - 2).coerceAtMost(5) // Trừ đi message mới và typing
        val startIndex = (messages.size - 2 - historyLimit).coerceAtLeast(0)
        
        for (i in startIndex until (messages.size - 2)) {
            val m = messages[i]
            if (m.text.isNotEmpty()) {
                val obj = org.json.JSONObject()
                obj.put("text", m.text)
                obj.put("isUser", m.isUser)
                historyArray.put(obj)
            }
        }
        val historyBody = RequestBody.create(MediaType.parse("application/json"), historyArray.toString())
        
        var imagePart: MultipartBody.Part? = null

        if (imageUri != null) {
            try {
                val mimeType = contentResolver.getType(imageUri) ?: "image/jpeg"
                val inputStream = contentResolver.openInputStream(imageUri)
                if (inputStream != null) {
                    val bytes = inputStream.readBytes()
                    val reqFile = RequestBody.create(MediaType.parse(mimeType), bytes)
                    imagePart = MultipartBody.Part.createFormData("image", "upload.jpg", reqFile)
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }

        RetrofitClient.chatbotApi.askChatbot(textBody, userIdBody, historyBody, imagePart).enqueue(object : Callback<ResponseBody> {
            override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                messages.removeAt(typingPosition)
                chatAdapter.notifyItemRemoved(typingPosition)

                if (response.isSuccessful && response.body() != null) {
                    try {
                        val responseBody = response.body()!!.string()
                        
                        val start = responseBody.indexOf("{")
                        val end = responseBody.lastIndexOf("}")
                        val jsonStr = if (start != -1 && end != -1) responseBody.substring(start, end + 1) else responseBody
                        
                        val jsonObj = org.json.JSONObject(jsonStr)
                        val replyRaw = jsonObj.optString("reply", "")
                        val reply = replyRaw.trim().ifEmpty {
                            jsonObj.optString("message", "").trim().ifEmpty {
                                "Không có phản hồi từ AI."
                            }
                        }
                        val command = jsonObj.optString("command", null)
                        val params = jsonObj.optJSONObject("params")

                        messages.add(ChatMessage(reply, isUser = false))
                        chatAdapter.notifyItemInserted(messages.size - 1)
                        recyclerViewChat.smoothScrollToPosition(messages.size - 1)

                        handleAICommand(command, params)

                    } catch (e: Exception) {
                        e.printStackTrace()
                        messages.add(ChatMessage("Lỗi xử lý phản hồi từ AI.", isUser = false))
                        chatAdapter.notifyItemInserted(messages.size - 1)
                    }
                } else {
                    val errorMsg = try {
                        val errorJson = org.json.JSONObject(response.errorBody()?.string() ?: "{}")
                        errorJson.optString("error", "Lỗi gửi tin nhắn (${response.code()})")
                    } catch (e: Exception) {
                        "Lỗi gửi tin nhắn (${response.code()})"
                    }
                    messages.add(ChatMessage(errorMsg, isUser = false))
                    chatAdapter.notifyItemInserted(messages.size - 1)
                }
                
                findViewById<MaterialButton>(R.id.btnSend).isEnabled = true
            }

            override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                findViewById<MaterialButton>(R.id.btnSend).isEnabled = true
                
                messages.removeAt(typingPosition)
                chatAdapter.notifyItemRemoved(typingPosition)
                messages.add(ChatMessage("Lỗi kết nối: ${t.message}", isUser = false))
                chatAdapter.notifyItemInserted(messages.size - 1)
            }
        })
    }

        /**
     * Nhận lệnh từ trợ lý thông minh để thực hiện điều hướng mở chức năng tương ứng của app.
     * Ví dụ lệnh: OPEN_LAWS, OPEN_SIGNS, OPEN_MAP, SEARCH_LAW,...
     * @param command Mã lệnh từ AI trả về
     * @param params Bộ tham số mở rộng như từ khóa tìm kiếm (keyword)
     */
    private fun handleAICommand(command: String?, params: org.json.JSONObject?) {
        val safeCommand = command?.trim()?.uppercase()
        
        if (safeCommand.isNullOrEmpty() || safeCommand == "NULL") return

        

        when (safeCommand) {
            "OPEN_LAWS" -> {
                startActivity(android.content.Intent(this, com.example.smarttraffic.ui.lesson.LawListActivity::class.java))
            }
            "OPEN_SIGNS" -> {
                startActivity(android.content.Intent(this, com.example.smarttraffic.ui.sign.SignListActivity::class.java))
            }
            "OPEN_QUIZ" -> {
                startActivity(android.content.Intent(this, com.example.smarttraffic.ui.quiz.QuizMenuActivity::class.java))
            }
            "OPEN_TESTS" -> {
                startActivity(android.content.Intent(this, com.example.smarttraffic.ui.test.TestListActivity::class.java))
            }
            "OPEN_PROGRESS" -> {
                startActivity(android.content.Intent(this, com.example.smarttraffic.ui.progress.ProgressActivity::class.java))
            }
            "OPEN_MAP" -> {
                android.widget.Toast.makeText(this, "Đang mở bản đồ...", android.widget.Toast.LENGTH_SHORT).show()
                recyclerViewChat.postDelayed({
                    startActivity(android.content.Intent(this, com.example.smarttraffic.ui.map.MapActivity::class.java))
                }, 300)
            }
            "OPEN_PROFILE" -> {
                recyclerViewChat.postDelayed({
                    startActivity(android.content.Intent(this, com.example.smarttraffic.ui.profile.ProfileActivity::class.java))
                }, 300)
            }
            "OPEN_SIMULATION" -> {
                recyclerViewChat.postDelayed({
                    startActivity(android.content.Intent(this, com.example.smarttraffic.ui.simulation.SimulationListActivity::class.java))
                }, 300)
            }
            "SEARCH_LAW" -> {
                val keyword = params?.optString("keyword") ?: ""
                android.widget.Toast.makeText(this, "Đang tìm luật: $keyword", android.widget.Toast.LENGTH_SHORT).show()
                recyclerViewChat.postDelayed({
                    startActivity(android.content.Intent(this, com.example.smarttraffic.ui.lesson.LawListActivity::class.java))
                }, 300)
            }
            "SEARCH_SIGN" -> {
                val keyword = params?.optString("keyword") ?: ""
                android.widget.Toast.makeText(this, "Đang tìm biển báo: $keyword", android.widget.Toast.LENGTH_SHORT).show()
                recyclerViewChat.postDelayed({
                    startActivity(android.content.Intent(this, com.example.smarttraffic.ui.sign.SignListActivity::class.java))
                }, 300)
            }
        }
    }

    private fun showError(errorMsg: String) {
        messages.add(ChatMessage("⚠️ $errorMsg", isUser = false))
        chatAdapter.notifyItemInserted(messages.size - 1)
        recyclerViewChat.scrollToPosition(messages.size - 1)
    }

    private fun hideKeyboard() {
        val imm = getSystemService(android.content.Context.INPUT_METHOD_SERVICE) as android.view.inputmethod.InputMethodManager
        val view = currentFocus ?: android.view.View(this)
        imm.hideSoftInputFromWindow(view.windowToken, 0)
    }
}