import React, {useRef, useCallback} from 'react'
import _ from 'lodash'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class InputSection extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            selectedSongs: [],
            searchResults: []
        }
    }

    handleChange = (event, value) => {
        console.log("process.env.REACT_APP_LAST_FM_API_KEY within handle change")
        console.log(process.env.REACT_APP_LAST_FM_API_KEY)
        console.log(this.foo)
        if (event && event.type === "click") {return}
        if (value){
            this.setState({ name: value });
            this.delayedLastFmQuery(value)
        }
    };

    sendLastFmQuery = query => {
        console.log("process.env.LAST_FM_API_KEY")
        console.log(process.env.REACT_APP_LAST_FM_API_KEY)
        fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`)
            .then(res => res.json())
            .then(res => {
                this.handleLastFmResult(res)
            })
            .catch(err => console.log(err))
    };

    fullName = (song) => {return (`${song.name} - ${song.artist}`)}

    handleLastFmResult = (response) => {
        const tracks = response.results.trackmatches.track.map(tm => {
            return {"name": tm.name, "artist": tm.artist, "mbid" : tm.mbid}
        })
        this.setState({searchResults: tracks})
    }

    lastFmThumbnail = (song) => { return(
        fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&mbid=${song.mbid}&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`)
            .then(res => res.json())
            .then(res => {
                const img = res.track.album.image.find(i => i.size == "medium")
                return img["#text"]
            })
            .catch(err => console.log(err))
      //  return `https://lastfm.freetls.fastly.net/i/u/64s/d4df5bf6ddc9809e08a277527af6d80d.png`
    )}

    delayedLastFmQuery = _.debounce(q => this.sendLastFmQuery(q), 500);

    filter(q) {
        const results = this.state.foo.filter(f => this.fullName(f).toLowerCase().indexOf((q).toLowerCase()) != -1)
        this.setState({searchResults: results})
    }

    handleSubmit = async (event, value) => {
        console.log("process.env.REACT_APP_LAST_FM_API_KEY within handle submit")
        console.log(process.env.REACT_APP_LAST_FM_API_KEY)
        if (!value) {return}
        event.preventDefault()
        debugger;
        value.thumbnail = await this.lastFmThumbnail(value)
        var newNames = this.state.selectedSongs.concat(value)
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