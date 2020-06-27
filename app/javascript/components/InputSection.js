import React from 'react'
import _ from 'lodash'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {sendLastFmQuery, lastFmThumbnail} from "../../api/lastfm";

class InputSection extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            selectedSongs: [],
            searchResults: []
        }
    }

    handleChange = async (event, value) => {
        if (event && event.type === "click") {return}
        if (value) {
            this.setState({ name: value });
            const self = this
            this.delayedLastFmQuery(value, self)
        }
    };

    fullName = (song) => {return (`${song.name} - ${song.artist}`)}

    delayedLastFmQuery = _.debounce(function (q, self) {
       sendLastFmQuery(q, self)
    }, 500);

    handleSubmit = async (event, value) => {
        if (!value) {return}
        event.preventDefault()
        value.thumbnail = await lastFmThumbnail(value)
        const newNames = this.state.selectedSongs.concat(value);
        this.setState({selectedSongs: newNames})
        this.setState({name: ''})
        this.setState({searchResults: []})
    };

    render() {
        return (
            <div>
                <Autocomplete
                    options={this.state.searchResults}
                    value={this.state.name}
                    getOptionLabel={option => {
                        return (typeof (option) == "string" ? option : this.fullName(option))
                    }}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                    onInputChange={this.handleChange}
                    onChange={this.handleSubmit}
                />
                {this.state.selectedSongs.map((song, index) => (

                    <h1>
                       {song.name} - {song.artist} <img src={song.thumbnail}/>
                    </h1>
                ))}
            </div>

        )
    }
}

export default InputSection