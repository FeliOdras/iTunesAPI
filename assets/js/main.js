// const tracksEl = document.querySelector('.tracks')

// const tracksEl = document.querySelector('.tracks')

class TrackList {
  // Creating our Class
  constructor(domSelector) {
    // Getting a domelement
    this.container = document.querySelector(domSelector)
    // Store my data
    this.data = null
    // Represents the currently displayed data
    this.viewData = null

    // Show stuff
    this.render()
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
        <div class="row">
          <div><img src="${track.artworkUrl60}"</img></div>
          <div>${track.trackName}</div>
          <div>${track.artistName}</div>
          <div>${track.trackPrice}</div>
          <div><audio controls src="${track.previewUrl}" ></audio></div>
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

  defaultTemplate() {
    return `
    <div class="defaultOutput">Search to see tracklist</div>
    `
  }

  sortPricing() {
    // TODO: Create a Methode to sort by pricing
  }

  render() {
    // Out put will hold the complete view
    let output = ""

    // Setting up data for our view
    const header = "<h1>My Tracks</h1>"
    // template methode accepts data to view and returns html string
    const template = this.viewData ?
      this.template(this.viewData) :
      this.defaultTemplate()
    const musicListLegend = ` <div class="row tableHead"><div></div>
      <div>Track Title<button onclick="sortByTrackTitleAToZ()" class="sortByTitle">&darr;</button>
        <button onclick="sortByTrackTitleZToA()" class="sortByArtist">&uarr;</button></div>
      <div>Artist Name:
        <button onclick="sortByArtistNameAToZ()" class="sortByTitle">&darr;</button>
        <button onclick="sortByArtistNameZToA()" class="sortByArtist">&uarr;</button></div>
      <div>Price:
        <button onclick="sortByPriceLowestFirst()" class="sortByArtist">&darr;</button>
        <button onclick="sortByPriceHighestFirst()" class="sortByArtist">&uarr;</button></div>
        <div>Preview</div>
        </div>`
    // Adding data in to our view !Order Matters!
    output += header
    output += "<p>Data from iTunes</p>"
    output += musicListLegend
    output += template
    // Assinging view in to innerHTML of our domElement form the constructor
    this.container.innerHTML = output
  }
}

const myTrackList = new TrackList("#tracks")

// input changes
defineSearch = () => {
  var search = document.getElementById('musicSearch').value;
  console.log(search)
  const url = `https://dci-fbw12-search-itunes.now.sh/?term=${search}`
  const xhr = new XMLHttpRequest()
  xhr.open("GET", url, true)
  xhr.responseType = "json"
  xhr.onload = function () {
    var jsonResponse = xhr.response
    console.log(jsonResponse.results)
    myTrackList.updateData(jsonResponse.results)
    myTrackList.data = jsonResponse.results
    myTrackList.viewData = jsonResponse.results
    myTrackList.render()
  }
  xhr.send(null)

  // do something with jsonResponse
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