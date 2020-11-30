import { search } from './mockData'

export const testMovieDetails = async (plotLength = 'short') => {
	const response = await fetch(`https://www.omdbapi.com/?apikey=d81f2995&i=tt0121765&plot=${plotLength}&r=json`)
	const results = await response.json()
	return results
}

export const getMoviesFromAPI = async (title, page = 1) => {
	title = title.replace(/\s/g, '+')
	const response = await fetch(`https://www.omdbapi.com/?apikey=d81f2995&s=${title}&page=${page}&type=movie&r=json`)
	const results = await response.json()
	return results
}

export const getSingleMovie = async(imdbID, plotLength = 'short') => {
	const response = await fetch(`https://www.omdbapi.com/?apikey=d81f2995&i=${imdbID}&plot=${plotLength}&r=json`)
	const results = await response.json()
	return results
}

export const getTestMovies = (title, plotLength = 'short') => {
	return search
}

