import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { textGray, white, darkGray, gray, green } from '../utils/colors'

export default function TouchButton({
	children,
	onPress,
	btnStyle = {},
	txtStyle = {},
	disabled = false
}) {
	const disabledButton = disabled ? styles.btnDisabled : {}
	const disabledButtonText = disabled ? styles.btnTextDisabled : {}
	return (
		<View style={styles.btnContainer}>
			<TouchableOpacity
				style={[styles.btn, btnStyle, disabledButton]}
				onPress={onPress}
				disabled={disabled}
			>
				<Text
					style={[
						styles.btnText,
						txtStyle,
						disabledButtonText
					]}
				>
					{children}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	btnContainer: {
		color: white,
		alignItems: 'center',
		marginBottom: 20
	},
	btn: {
		width: 200,
		height: 50,
		backgroundColor: 'red',
		borderRadius: 5,
		justifyContent: `center`,
		alignItems: `center`,
		borderWidth: 1,
		borderColor: darkGray,

	},
	btnDisabled: {
		backgroundColor: gray,
		borderColor: darkGray
	},
	btnText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	btnTextDisabled: {
		// color: darkGray
	}
})
