package com.mariesta.menzies.washui.demo

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.mariesta.menzies.washui.WashProvider
import com.mariesta.menzies.washui.demo.ui.DemoApp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            WashProvider(followSystemMode = true) {
                DemoApp()
            }
        }
    }
}
