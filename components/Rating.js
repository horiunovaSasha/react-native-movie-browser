import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const GREEN = '#48bb78'
const YELLOW = '#ecc94b'
const RED = '#f56565'

const ratingColor = rating => {
	let ratingParsed = parseFloat(rating)
	if (rating.substring(rating.length, rating.length - 3) === '/10') ratingParsed *= 10
	if (ratingParsed >= 75) return GREEN
	if (ratingParsed >= 50) return YELLOW
	return RED
}

export default props => (
	<View style={styles.rating}>
		<Text style={[styles.number, {color: ratingColor(props.rating.Value)}]}>{props.rating.Value}</Text>
		<Text style={[styles.source, {color: '#e2e8f0'}]}>{props.rating.Source}</Text>
	</View>
)

const styles = StyleSheet.create({
	number: {
		fontSize: 28,
		fontWeight: 'bold'
	},
	rating: {
		width: '33%',
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	source: {
		fontSize: 12,
		fontWeight: 'normal',
		textAlign: 'center'
	}
})
