import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

const truncateMovieTitle = title => {
	if (title.length > 30) return `${title.substring(0, 30)}...`

	return title
}

export default props => (
	<View style={styles.container}>
		<TouchableOpacity style={styles.container}
						  onPress={() => props.handlePress(props.data)}>
			<Image style={styles.poster}
		           source={ props.data.Poster == 'N/A' ? require('../assets/no_poster.png') : {uri: props.data.Poster }}
		           />
		    <View style={styles.movieTitle}>
				<Text style={styles.movieTitleText}>{truncateMovieTitle(props.data.Title)}</Text>
				<Text style={styles.movieTitleYear}>{props.data.Year}</Text>
		    </View>
		</TouchableOpacity>
	</View>
)

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginBottom: 15
	},
	poster: {
		width: 55,
		height: 55,
		marginRight: 15
	},
	movieTitle: {
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	movieTitleText: {
		fontWeight: 'bold',
		fontSize: 16,
		marginRight: 5,
		color: '#f7fafc'
	},
	movieTitleYear: {
		fontSize: 16,
		color: '#e2e8f0'
	}
})
