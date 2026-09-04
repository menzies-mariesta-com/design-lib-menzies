package com.mariesta.menzies.washui.demo.ui

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.mariesta.menzies.washui.demo.R

/**
 * In-app brand mark: same drawable as the adaptive launcher foreground
 * ([R.drawable.ic_pigment_mark] / favicon pigment wash).
 */
@Composable
fun WashAppLogo(
    modifier: Modifier = Modifier,
    size: Dp = 40.dp,
    contentDescription: String? = "Menzies Design",
) {
    Image(
        painter = painterResource(R.drawable.ic_pigment_mark),
        contentDescription = contentDescription,
        modifier = modifier.size(size),
        contentScale = ContentScale.Fit,
    )
}
