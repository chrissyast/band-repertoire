import React from 'react'
import _ from 'lodash'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {sendLastFmQuery, lastFmThumbnail} from "../../api/lastfm";

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});

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

    handleSubmitRep = () => {
        console.log(this.state)
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

                    <h1>
                       {song.name} - {song.artist} <img src={song.thumbnail}/>
                    </h1>
                ))}
            <MyButton onClick={this.handleSubmitRep}>Styled Components</MyButton>
            </div>

        )
    }
}

export default InputSection