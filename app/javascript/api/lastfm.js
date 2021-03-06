   export function sendLastFmQuery (query, self) {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`)
            .then(res => res.json())
            .then(res => {
               return handleLastFmResult(res, self)
            })
            .catch(err => console.log(err))
   }

   export function  lastFmThumbnail (song) { return (
        fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&mbid=${song.mbid}&api_key=${process.env.REACT_APP_LAST_FM_API_KEY}&format=json`)
            .then(res => res.json())
            .then(res => {
                const img = res.track.album.image.find(i => i.size == "medium")
                return img["#text"]
            })
            .catch(err => console.log(err))
    )}


    export function handleLastFmResult (response, self) {
        if (!response.error)
        {
            const tracks = response.results.trackmatches.track.map(tm => {
                return {"name": tm.name, "artist": tm.artist, "mbid" : tm.mbid}
            })
            self.setState({searchResults: tracks})
        }
    }