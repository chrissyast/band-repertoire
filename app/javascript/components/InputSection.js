import React from 'react'
import _ from 'lodash'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {sendLastFmQuery, lastFmThumbnail} from "../api/lastfm";
import {saveRepertoire} from "../api/internal"

class InputSection extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            selectedSongs: [],
            searchResults: [],
            unsavedChanges: {add: [], delete: []}
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
        const unsavedChanges = Object.assign({}, this.state.unsavedChanges);
        unsavedChanges.add = unsavedChanges.add.concat(value)
        this.setState({unsavedChanges : unsavedChanges })
        this.setState({selectedSongs: newNames})
        this.setState({name: ''})
        this.setState({searchResults: []})
    };

    delete = (index) => {
        const deleted = this.state.selectedSongs[index]
        const unsavedChanges = Object.assign({}, this.state.unsavedChanges);
        const songList = Object.assign([], this.state.selectedSongs)
        songList.splice(index, 1)
        if (this.state.unsavedChanges.add.includes(deleted)) {
            unsavedChanges.add.splice(unsavedChanges.add.indexOf(deleted),1)
        }
        else {
            unsavedChanges.delete = unsavedChanges.delete.concat(deleted);
        }
        this.setState({selectedSongs: songList})
        this.setState({unsavedChanges: unsavedChanges})
    }

    save = async () => {
        const saveOutcome = await saveRepertoire(this.state.unsavedChanges, this)
        if (saveOutcome.success) {
            this.setState({unsavedChanges : {add: [], delete: []}})
        }
    }

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
                <div>
                    <h1>
                       {song.name} - {song.artist} <img src={song.thumbnail}/>
                    </h1>
                    <button onClick={() => this.delete(index)}>delete</button>
                </div>
                ))}
            <button onClick={this.save}>
                Save changes
            </button>
            </div>

        )
    }
}

export default InputSection