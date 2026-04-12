package com.example.smarttraffic.ui.map

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.example.smarttraffic.R
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions

class MapActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private val hanoi = LatLng(21.0285, 105.8542)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_map)

        // Nút bấm cơ bản
        findViewById<View>(R.id.btnBack).setOnClickListener { finish() }
        findViewById<View>(R.id.btnCloseDetails).setOnClickListener { findViewById<View>(R.id.bottomSheetDetails).visibility = View.GONE }

        val mapFragment = supportFragmentManager.findFragmentById(R.id.map) as SupportMapFragment
        mapFragment.getMapAsync(this)
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap
        mMap.uiSettings.isZoomControlsEnabled = true
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(hanoi, 11f))

        // Nạp các điểm sát hạch
        getTestCenters().forEach { center ->
            mMap.addMarker(MarkerOptions().position(center.pos).title(center.name).snippet(center.addr))
        }

        mMap.setOnMarkerClickListener { marker ->
            findViewById<View>(R.id.bottomSheetDetails).visibility = View.VISIBLE
            findViewById<TextView>(R.id.tvLocationName).text = marker.title
            findViewById<TextView>(R.id.tvLocationAddress).text = marker.snippet
            findViewById<View>(R.id.btnDirection).setOnClickListener { navigate(marker.position) }
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

    private fun getTestCenters() = listOf(
        Center("TT sát hạch Việt Thanh", LatLng(20.942, 106.013), "Văn Lâm, Hưng Yên"),
        Center("TT sát hạch Đông Đô", LatLng(20.986, 106.176), "Lâm Thao, Bắc Ninh"),
        Center("TT sát hạch Á Châu", LatLng(20.989, 105.964), "Văn Lâm, Hưng Yên"),
        Center("TT sát hạch Sóc Sơn", LatLng(21.234, 105.868), "Sóc Sơn, Hà Nội"),
        Center("TT sát hạch Hà An", LatLng(21.247, 105.751), "Xã Minh Trí, Sóc Sơn, Hà Nội")
    )

    data class Center(val name: String, val pos: LatLng, val addr: String)
}
