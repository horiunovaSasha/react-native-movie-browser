import React from 'react'
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import { options } from '../options'

export default class SettingsScreen extends React.Component {
	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => (
			<Ionicons name="ios-options"
					  		size={25}
					  		color={tintColor}
					  		/>
		)
	}

	state = {
		fullPlot: null,
		results: ''
	}

	componentDidMount() {
		this.setState({
			fullPlot: this.props.screenProps.fullPlot,
			results: this.props.screenProps.results
		})
	}

	handlePlotSetttingChange = () => {
		this.setState(prevState => ({
			fullPlot: !prevState.fullPlot				
		}), () => {
			this.props.screenProps.fullPlot = this.state.fullPlot		
		})
	}

	handleResultsSettingChange = text => {
		if (text == '') return 
		this.setState({
			results: parseInt(text)
		}, () => {
			this.props.screenProps.results = this.state.results
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.option}>
					<Text style={styles.text}>Show Full Movie Plot</Text>
					<Switch value={this.state.fullPlot}
							onValueChange={() => this.handlePlotSetttingChange()}
							trackColor={{false: '#1a202c', true: '#805ad5'}}
							thumbColor="#FFF"
							/>
				</View>
				<View style={styles.option}>
					<Text style={styles.text}>Amount of results to display</Text>
					<TextInput defaultValue={this.state.results.toString()}
							   selectTextOnFocus={true}
							   keyboardType="number-pad"
						       style={styles.resultsSettingInput}
							   onChangeText={this.handleResultsSettingChange}
							   background="'#f7fafc'"
							   />
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#2d3748'
	}, 
	option: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '75%',
		marginBottom: 15,
		borderRadius: 15
	},
	resultsSettingInput: {
		width: 100,
		textAlign: 'right',
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#1a202c',
		color: '#f7fafc',
	},
	text: {
		color: '#f7fafc',
	}
})
