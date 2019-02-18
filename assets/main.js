// const tracksEl = document.querySelector('.tracks')

class TrackList {
  // Creating our Class
  constructor(domSelector, data) {
    // Getting a domelement
    this.container = document.querySelector(domSelector);
    // Store my data
    this.data = data;
    // Represents the currently displayed data
    this.viewData = data;
    // Show stuff
    this.render();
  }

  modViewData(newData) {
    this.viewData = newData;
    this.render();
  }

  template(music) {
    // Mapping over data and returning HTML String
    const musicList = music
      .map(
        track =>
        `
        <section class="row">
          <div class="trackArtwork"><img src="${track.artworkUrl100}" alt="${
            track.trackName
          }"></div>
          <div class="trackTitle"> ${track.trackName} </div>
          <div class="artistName">${track.artistName} </div>
          <div class="trackPrice">${track.trackPrice} </div>
        </section>
      `
      )
      .join("");
    return musicList;

    // For now we just assume that all data is there and that it is
    // from datatype string
    // TODO: create a template function
  }

  render() {
    // Out put will hold the complete view
    let output = "";

    // Setting up data for our view
    const header = "<h1>My Tracks</h1>";
    // template methode accepts data to view and returns html string
    const template = this.template(this.viewData);
    // Adding data in to our view !Order Matters!
    output += header;
    output += "<p>Data from iTunes</p>";
    output += template;
    // Assinging view in to innerHTML of our domElement form the constructor
    this.container.innerHTML = output;
  }
}

const myTrackList = new TrackList("#tracks", music);
sortByArtist = () => {
  const trackListByArtist = new TrackList("#tracks", music);
  music.sort((a, b) =>
    a.artistName > b.artistName ? 1 : a.artistName < b.artistName ? -1 : 0
  );
  return trackListByArtist;
}

sortByPrice = () => {
  const trackListByPrice = new TrackList("#tracks", music);
  music.sort((a, b) => a.trackPrice - b.trackPrice);
  return trackListByPrice;
}

filterByArtistName = () => {
  const artistNameInput = document.querySelector(".filterArtist").value;
  const filteredArtist = music.filter(
    selectedArtist => artistNameInput === selectedArtist.artistName
  );
  const filteredTrackListByArtistName = new TrackList("#tracks", filteredArtist);
  return filteredTrackListByArtistName;
};