// const tracksEl = document.querySelector('.tracks')

// const tracksEl = document.querySelector('.tracks')

class TrackList {
  // Creating our Class
  constructor(domSelector, search) {
    // Getting a domelement
    this.container = document.querySelector(domSelector)
    // Search
    this.search = search
    // Data source
    this.url = `https://dci-fbw12-search-itunes.now.sh/?term=`
    this.media = "music"
    // Search Tracks
    this.searchTracks()
  }


  modViewData(newData) {
    this.viewData = newData
    this.render()
  }

  template(music) {
    // Mapping over data and returning HTML String
    // For now we just assume that all data is there and that it is
    // from datatype string
    // TODO: create a template function
    return music
      .map(track => {
        return `
        <div class="row tableContent">
          <div><img src="${track.artworkUrl100}"</img></div>
          <div>${track.trackName}</div>
          <div>${track.artistName}</div>
          <div>${track.trackPrice}</div>
          <div>
            <i class="fas fa-play" id="${track.trackId}"></i>
            <i class="fas fa-pause" id="${track.trackId}"></i>
          </div>
        </div>
    `
      })
      .join("")
  }

  updateData(data) {
    // Store my data
    this.data = data
    // Represents the currently displayed data
    this.viewData = data
    this.render()
  }

  // Search
  searchTracks() {
    const searchUrl = `${this.url}${this.search}&media=${this.media}`
    fetch(searchUrl)
      .then(response => {
        return response.json()
      }).then((data) => {
        this.data = data.results
        this.modViewData(data.results)
      })
      .catch(function (err) {
        console.log("Something went wrong!", err)
      })
  }

  // Filter
  filterTracks(search) {
    const newData = this.data.filter(track => track.artistName.toLowerCase().includes(search.toLowerCase()) || track.trackName.toLowerCase().includes(search.toLowerCase()))
    this.modViewData(newData)
  }

  sortByPriceLowestFirst = () => {
    myTrackList.viewData.sort((a, b) => a.trackPrice - b.trackPrice);
    myTrackList.render()
  }

  sortByPriceHighestFirst = () => {
    myTrackList.viewData.sort((a, b) => b.trackPrice - a.trackPrice);
    myTrackList.render()
  }

  sortByTrackTitleAToZ = () => {
    myTrackList.viewData.sort((a, b) => a.trackName > b.trackName ? 1 : a.trackName < b.trackName ? -1 : 0);
    myTrackList.render()
  }

  sortByTrackTitleZToA = () => {
    myTrackList.viewData.sort((a, b) => b.trackName > a.trackName ? 1 : b.trackName < a.trackName ? -1 : 0);
    myTrackList.render()
  }

  sortByArtistNameAToZ = () => {
    myTrackList.viewData.sort((a, b) => a.artistName > b.artistName ? 1 : a.artistName < b.artistName ? -1 : 0);
    myTrackList.render()
  }

  sortByArtistNameZToA = () => {
    myTrackList.viewData.sort((a, b) => b.artistName > a.artistName ? 1 : b.artistName < a.artistName ? -1 : 0);
    myTrackList.render()
  }

  addEventListeners() {

    // Search
    document.querySelector("#musicSearch").onkeyup =
      event => {
        console.log(`Searching: ${event.target.value}`)
        this.search = (event.target.value !== "" ? event.target.value : this.search)
        this.searchTracks()
      }

    document.querySelector("#listFilter").onkeyup =
      event => {
        console.log(`Filtering: ${event.target.value}`)
        this.filterTracks(event.target.value)
      }

    // Sort 
    document.querySelector("#sortByTitleAToZ").addEventListener("click", () => this.sortByTrackTitleAToZ())
    document.querySelector("#sortByTitleZToA").addEventListener("click", () => this.sortByTrackTitleZToA())
    document.querySelector("#sortByArtistNameAToZ").addEventListener("click", () => this.sortByArtistNameAToZ())
    document.querySelector("#sortByArtistNameZToA").addEventListener("click", () => this.sortByArtistNameZToA())
    document.querySelector("#sortByPriceLowestFirst").addEventListener("click", () => this.sortByPriceLowestFirst())
    document.querySelector("#sortByPriceHighestFirst").addEventListener("click", () => this.sortByPriceHighestFirst())

    // Create event listeners for any play-button
    let playLinks = document.querySelectorAll(".fa-play")
    let data = this.data
    playLinks.forEach(
      function (link) {
        link.addEventListener("click", function (event) {
          console.log(`Playing ${event.target.id}`)
          // Retrieve the data for the selected track
          let myTrack = data.filter(track => track.trackId == event.target.id)
          // Create an audio player for the selected track
          document.querySelector("#play").innerHTML = `<audio id="player_${event.target.id}" src="${myTrack[0].previewUrl} "></audio>`
          document.querySelector(`#player_${event.target.id}`).play()
        })
      })


    // Create event listeners for any pause button   
    let pauseLinks = document.querySelectorAll(".fa-pause")
    pauseLinks.forEach(
      link => {
        link.addEventListener("click", () => {
          //Select and stop the running audio player
          let sounds = document.querySelector("audio")
          sounds.pause()
          console.log("Stop music!")
        })
      })
  }

  render() {
    // Out put will hold the complete view
    let output = ""
    // Setting up data for our view
    const header = `<h1><i class="fas fa-headphones-alt"></i> The sound of ${this.search} </h1>`
    const template = this.template(this.viewData);
    const musicListLegend = ` 
    <div class="row tableHead">
      <div></div>
      <div>
        Track Title 
        <i class="fas fa-caret-down" id="sortByTitleAToZ"></i>
        <i class="fas fa-caret-up" id="sortByTitleZToA"></i>
      </div>
      <div>
        Artist Name:
        <i class="fas fa-caret-down" id="sortByArtistNameAToZ" ></i>
        <i class="fas fa-caret-up" id="sortByArtistNameZToA" ></i>
      </div>
      <div>
        Price:
        <i class="fas fa-caret-down" id="sortByPriceLowestFirst"></i>
        <i class="fas fa-caret-up" id="sortByPriceHighestFirst"></i>
      </div>
      <div>Preview</div>
    </div>`
    // Adding data in to our view !Order Matters!
    output += header
    output += "<p>Data from iTunes</p>"
    output += musicListLegend
    output += template
    // Assinging view in to innerHTML of our domElement form the constructor
    this.container.innerHTML = output
    // Add EventLiseners
    this.addEventListeners()
  }
}

const myTrackList = new TrackList("#tracks", "Silence")