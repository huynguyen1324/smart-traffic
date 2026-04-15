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
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.material.textfield.TextInputEditText
import java.text.Normalizer
import java.util.Locale

class MapActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private val hanoi = LatLng(21.0285, 105.8542)

    private val centers = listOf(
        Center("TT sát hạch Việt Thanh", LatLng(20.942, 106.013), "Văn Lâm, Hưng Yên"),
        Center("TT sát hạch Đông Đô", LatLng(20.986, 106.176), "Lâm Thao, Bắc Ninh"),
        Center("TT sát hạch Á Châu", LatLng(20.989, 105.964), "Văn Lâm, Hưng Yên"),
        Center("TT sát hạch Sóc Sơn", LatLng(21.234, 105.868), "Sóc Sơn, Hà Nội"),
        Center("TT sát hạch Hà An", LatLng(21.247, 105.751), "Xã Minh Trí, Sóc Sơn, Hà Nội")
    )

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
                val first = filterCenters(edtSearch.text?.toString().orEmpty()).firstOrNull()
                if (first != null) {
                    hideKeyboard()
                    showCenterDetails(first)
                }
                true
            } else false
        }

        val mapFragment = supportFragmentManager.findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
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

    /** Chuẩn hóa: bỏ dấu + đ→d để gõ không dấu vẫn khớp tên có dấu. */
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

    data class Center(val name: String, val pos: LatLng, val addr: String)

    private class MapSearchAdapter(
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

        override fun getItemCount(): Int = items.size

        inner class VH(itemView: View) : RecyclerView.ViewHolder(itemView) {
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
