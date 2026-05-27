package com.example.smarttraffic.ui.map

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputMethodManager
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.smarttraffic.R
import com.example.smarttraffic.dto.DrivingTestCenterDto
import com.example.smarttraffic.network.MapApiService
import com.example.smarttraffic.network.RetrofitClient
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.material.textfield.TextInputEditText
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.text.Normalizer
import java.util.Locale

/**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của Map.
 */
class MapActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private val hanoi = LatLng(21.0285, 105.8542)

    private var centers = listOf<Center>()

    private lateinit var edtSearch: TextInputEditText
    private lateinit var recyclerSearch: RecyclerView
    private lateinit var tvSearchEmpty: TextView
    private val searchAdapter = MapSearchAdapter { center ->
        hideKeyboard()
        edtSearch.clearFocus()
        showCenterDetails(center)
        edtSearch.setText("")
        updateSearchUi("")
    }

        /**
     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).
     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_map)

        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }
        findViewById<View>(R.id.btnCloseDetails).setOnClickListener { findViewById<View>(R.id.bottomSheetDetails).visibility = View.GONE }

        edtSearch = findViewById(R.id.edtSearchMap)
        recyclerSearch = findViewById(R.id.recyclerSearchResults)
        tvSearchEmpty = findViewById(R.id.tvSearchEmpty)

        recyclerSearch.layoutManager = LinearLayoutManager(this)
        recyclerSearch.adapter = searchAdapter

        edtSearch.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
            override fun afterTextChanged(s: Editable?) {
                updateSearchUi(s?.toString().orEmpty())
            }
        })

        edtSearch.setOnEditorActionListener { _, actionId, _ ->
            if (actionId == EditorInfo.IME_ACTION_SEARCH) {
                val query = edtSearch.text?.toString().orEmpty()
                val first = filterCenters(query).firstOrNull()
                if (first != null) {
                    hideKeyboard()
                    showCenterDetails(first)
                }
                true
            } else false
        }

        loadCenters()

        val mapFragment = supportFragmentManager.findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    private fun loadCenters() {
        val mapApi = RetrofitClient.retrofit.create(MapApiService::class.java)
        mapApi.getDrivingTestCenters().enqueue(object : Callback<List<DrivingTestCenterDto>> {
            override fun onResponse(
                call: Call<List<DrivingTestCenterDto>>,
                response: Response<List<DrivingTestCenterDto>>
            ) {
                if (response.isSuccessful) {
                    val list = response.body()
                    if (list != null) {
                        centers = list.map { dto ->
                            Center(
                                id = dto.id,
                                name = dto.name,
                                pos = LatLng(dto.latitude, dto.longitude),
                                addr = dto.address
                            )
                        }
                        if (::mMap.isInitialized) {
                            runOnUiThread {
                                mMap.clear()
                                centers.forEach { center ->
                                    mMap.addMarker(
                                        MarkerOptions()
                                            .position(center.pos)
                                            .title(center.name)
                                            .snippet(center.addr)
                                    )
                                }
                            }
                        }
                    }
                }
            }

            override fun onFailure(call: Call<List<DrivingTestCenterDto>>, t: Throwable) {
                t.printStackTrace()
            }
        })
    }

    private fun updateSearchUi(query: String) {
        val q = query.trim()
        if (q.isEmpty()) {
            recyclerSearch.visibility = View.GONE
            tvSearchEmpty.visibility = View.GONE
            searchAdapter.submit(emptyList())
            return
        }
        val matched = filterCenters(q)
        searchAdapter.submit(matched)
        when {
            matched.isEmpty() -> {
                recyclerSearch.visibility = View.GONE
                tvSearchEmpty.visibility = View.VISIBLE
            }
            else -> {
                recyclerSearch.visibility = View.VISIBLE
                tvSearchEmpty.visibility = View.GONE
            }
        }
    }

    private fun normalizeForSearch(s: String): String {
        var t = s.trim().lowercase(Locale.getDefault())
        t = t.replace('đ', 'd')
        t = Normalizer.normalize(t, Normalizer.Form.NFD)
        t = t.replace(Regex("\\p{Mn}+"), "")
        return t
    }

    private fun filterCenters(query: String): List<Center> {
        val q = normalizeForSearch(query)
        if (q.isEmpty()) return emptyList()
        return centers.filter { c ->
            normalizeForSearch(c.name).contains(q) ||
                normalizeForSearch(c.addr).contains(q)
        }
    }

    private fun showCenterDetails(center: Center) {
        findViewById<View>(R.id.bottomSheetDetails).visibility = View.VISIBLE
        findViewById<TextView>(R.id.tvLocationName).text = center.name
        findViewById<TextView>(R.id.tvLocationAddress).text = center.addr
        findViewById<View>(R.id.btnDirection).setOnClickListener { navigate(center.pos) }
        if (::mMap.isInitialized) {
            mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(center.pos, 14f))
        }
    }

    private fun hideKeyboard() {
        val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
        val view = currentFocus ?: edtSearch
        imm.hideSoftInputFromWindow(view.windowToken, 0)
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        mMap.uiSettings.isZoomControlsEnabled = true
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(hanoi, 11f))

        centers.forEach { center ->
            mMap.addMarker(MarkerOptions().position(center.pos).title(center.name).snippet(center.addr))
        }

        mMap.setOnMarkerClickListener { marker ->
            val title = marker.title ?: return@setOnMarkerClickListener false
            val center = centers.find { it.name == title } ?: return@setOnMarkerClickListener false
            showCenterDetails(center)
            false
        }

        enableLocation()
    }

    private fun enableLocation() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            mMap.isMyLocationEnabled = true
        } else {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), 100)
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 100 && grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                mMap.isMyLocationEnabled = true
            }
        }
    }

    private fun navigate(pos: LatLng) {
        val uri = Uri.parse("google.navigation:q=${pos.latitude},${pos.longitude}")
        val intent = Intent(Intent.ACTION_VIEW, uri).setPackage("com.google.android.apps.maps")
        startActivity(if (intent.resolveActivity(packageManager) != null) intent else Intent(Intent.ACTION_VIEW, uri))
    }

    /**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của Map.
 */
data class Center(val id: Int, val name: String, val pos: LatLng, val addr: String)

    private /**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của Map.
 */
class MapSearchAdapter(
        private val onClick: (Center) -> Unit
    ) : RecyclerView.Adapter<MapSearchAdapter.VH>() {

        private var items = listOf<Center>()

        fun submit(list: List<Center>) {
            items = list
            notifyDataSetChanged()
        }

        override fun onCreateViewHolder(parent: android.view.ViewGroup, viewType: Int): VH {
            val v = LayoutInflater.from(parent.context).inflate(R.layout.item_map_search_result, parent, false)
            return VH(v)
        }

        override fun onBindViewHolder(holder: VH, position: Int) {
            holder.bind(items[position])
        }

            /**
     * Trả về tổng số lượng phần tử có trong danh sách hiển thị.
     */
    override fun getItemCount(): Int = items.size

        inner /**
 * Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của Map.
 */
class VH(itemView: View) : RecyclerView.ViewHolder(itemView) {
            private val tvName: TextView = itemView.findViewById(R.id.tvSearchName)
            private val tvAddr: TextView = itemView.findViewById(R.id.tvSearchAddress)

            init {
                itemView.setOnClickListener {
                    val pos = bindingAdapterPosition
                    if (pos != RecyclerView.NO_POSITION) onClick(items[pos])
                }
            }

            fun bind(c: Center) {
                tvName.text = c.name
                tvAddr.text = c.addr
            }
        }
    }
}
