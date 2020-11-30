import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { testMovieDetails, getSingleMovie } from '../api'
import Rating from '../components/Rating'

export default class MovieDetailsScreen extends React.Component {
	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: navigation.getParam('movie').Title,
			headerTintColor: '#555'
		}
	}

	componentDidMount() {
		this.setState({
			movie: this.props.navigation.getParam('movie'),
		}, () => this.getMovieInfo())
	}

	getMovieInfo = async () => {
		const plotLength = this.props.screenProps.fullPlot ? 'full' : 'short'

		const movie = await getSingleMovie(this.state.movie.imdbID, plotLength)
		this.setState(() => {
			return {
				movie: movie,
				fresh: movie.Ratings.length > 1 && parseInt(movie.Ratings[1].Value) >= 75
			}
		}, () => console.log(this.state))
			
	}

	state = {
		movie: '',
	}

	render() {
		return (
			<ScrollView style={styles.container} contentContainer={{alignItems: 'center', justifyContent: 'flex-start'}}>
				<Image style={styles.poster}
			           source={ this.state.movie.Poster === 'N/A' ? require('../assets/no_poster.png') : { uri: this.state.movie.Poster}}
			           />
	           	<View style={styles.infoContainer}>
					<ScrollView>
						<View style={styles.header}>
							{ this.state.fresh && (
								<Image source={require('../assets/rt_fresh.png')} 
									   style={{width: 50, height: 50, marginRight: 15}}/>
							)}	
							<Text style={[styles.title, this.state.fresh ? styles.freshTitle : '']}>{this.state.movie.Title}</Text>
						</View>
						<Text style={styles.plot}>{this.state.movie.Plot}</Text>
					</ScrollView>
					<View style={styles.ratingsContainer}>
		           		{ this.state.movie.Ratings && (this.state.movie.Ratings.map((rating, index) => (
		           			<Rating rating={rating} key={index} />
	           			)))}
           			</View>
	           	</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		paddingBottom: 15
	},
	infoContainer: {
		paddingHorizontal: 25
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginBottom: 15,
		width: '95%'
	},
	title: {
		flexDirection: 'row',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'left',
		marginRight: 20,
		color: '#555',
	},
	freshTitle: {
		textAlign: 'left'
	},
	plot: {
		marginBottom: 15,
		color: '#555'
	},
	poster: {
		height: 500,
		marginBottom: 15,
		width: '100%',
	},
	ratingsContainer: {
		flex: 1,
		flexDirection: 'row'
	}
})
