import React from 'react'
import { Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { totalSearchResults, getMoviesFromAPI, getTestMovies } from '../api'
import _ from 'lodash'
import { search } from '../mockData'
import Movie from '../components/Movie'

export default class SearchScreen extends React.Component {
	state = {
		movie: '',
		search: '',
		movies: [],
		currentPage: 1,
		page: 1,
		remainingItems: 0,
		movieIds: []
	}

	componentDidMount() {
		this.setState({
			remainingItems: this.props.screenProps.results
		})
	}

	getMovieDetails = async () => {
		if (this.props.screenProps.fullPlot) {
			const movie = await getMovies(this.state.search, 'full')
			this.setState({movie})
		} else {
			const movie = await getMovies(this.state.search)
			this.setState({movie})
		}
	}

	pressMovie = movie => {
		this.props.navigation.navigate('Details', {
			movie: movie
		})
	}

	getMoviesOnPage = async page => {
		return await await getMoviesFromAPI(this.state.search.trim(), page)
	}

	fetchMovies = async () => {
		this.setState({
			remainingItems: this.props.screenProps.results,
			page: 1,
		}, async () => {
			console.log(this.state)
			let movies = await this.getMoviesOnPage(this.state.page)
			while (this.state.remainingItems > 0) {
				let moviesToAdd = []
				
				if (movies.Error) return
				movies.Search.map(movie => {
					if (this.state.movieIds.indexOf(movie.imdbID) < 0) {
						moviesToAdd.push(movie)
						this.setState(prevState => ({
							moviesIds: prevState.movieIds.push(movie.imdbID),
						}))
					}
				})
				this.setState(prevState => ({
					movies: [...prevState.movies, ...moviesToAdd.slice(0, this.state.remainingItems)],
					remainingItems: prevState.remainingItems - 10,
					page: ++prevState.page
				}))

				movies = await this.getMoviesOnPage(this.state.page)
			}
		})
	}

	changeText = text => {
		this.setState(prevState => ({
			search: text,
			movies: [],
			moviesIds: [],
			movieIds: []
		}), () => this.fetchMovies())
		
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<TextInput style={styles.searchBar} 
						   placeholder="Search for movies"
						   placeholderTextColor="#e2e8f0"
						   onChangeText={_.debounce(this.changeText, 500)}
						   clearButtonMode="while-editing"
						   selectTextOnFocus={true}
						   />
				<View style={styles.searchContainer}>
					<FlatList data={this.state.movies}
							  renderItem={({item}) => <Movie data={item} handlePress={() => this.pressMovie(item)} />}
							  keyExtractor={item => item.imdbID}
							  style={{marginTop: 25}}
							  />
		      	</View>
		      	{ this.state.movies.length === 0 && (
		      		<Text style={{color: '#f7fafc', fontSize: 32}}>No Movies</Text>
	      		)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingVertical: 15,
		backgroundColor: '#2d3748'
	},
	searchBar: {
		width: '75%', 
		backgroundColor: '#1a202c', 
		paddingHorizontal: 25, 
		paddingVertical: 15,
		borderRadius: 10,
		color: '#f7fafc',
	},
	searchContainer: {
		paddingLeft: 25,
		width: '100%'
	}
})
